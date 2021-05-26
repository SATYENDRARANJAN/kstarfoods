import json
import math

from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view, permission_classes
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import viewsets, status
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from django.forms.models import model_to_dict
from shop.constants import INITIATED,PAID,FAIL

from payment.models import Transaction
from payment.views import Razorpay
from shop.models import Products, DeliveryInfo, Cart, DeliveryAddress, OrderProduct, \
    create_orderproduct_id, Tags, PopularProducts
from shop.serializers import ProductSerializer, DeliveryInfoSerializer, CartSerializer, DeliveryAddressSerializer, \
    TagSerializer, OnlyTagSerializer, PopularProductSerializer
from users.models import UserAddress


class ProductViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]
    def list(self,request):
        queryset = Products.objects.all()
        serializer = ProductSerializer(queryset,many=True)
        return Response(data={'products':serializer.data},status=status.HTTP_201_CREATED)

    def list_by_tag(self,request,tag):
        queryset = Products.objects.all().filter(taglist__tag_name__in=[tag])
        serializer = ProductSerializer(queryset,many=True)
        return Response(data={'products':serializer.data},status=status.HTTP_201_CREATED)

    def create(self,request):
        pass

    def popular_products(self,request):
        queryset1= PopularProducts.objects.all().values_list('products_id',flat=True)
        queryset2=Products.objects.filter(product_id__in=queryset1)
        serializer = ProductSerializer(queryset2,many=True)
        return Response(data={'products':serializer.data},status=status.HTTP_201_CREATED)

    def retrieve(self,request,pk=None):
        queryset = Products.objects.all()
        product = get_object_or_404(queryset,product_slug=pk)
        serializer = ProductSerializer(product)
        return Response(serializer.data)

    def update(self,request,pk=None):
        pass

    def partial_update(self,request,pk=None):
        pass

    def destroy(self,request,pk=None):
        pass



class DeliveryInfoViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def list(self,request):
        queryset = DeliveryInfo.objects.all()
        serializer = DeliveryInfoSerializer(queryset,many=True)
        return Response(data={'data':serializer.data},status=status.HTTP_200_OK)

    def create(self,request):
        # initials = models.CharField(max_length=10, choices=INITIALS_CHOICES)
        # name = models.CharField(max_length=200, blank=True, null=True)
        # street = models.CharField(max_length=300)
        # landmark = models.CharField(max_length=300)
        # address_type = models.CharField(max_length=100, choices=ADDRESS_TYPE, blank=True, null=True)
        # recipient_phone = PhoneNumberField(unique=True)
        # recipient_alternate_phone = PhoneNumberField(unique=True, null=True, blank=True)
        # recipient_email = models.EmailField(null=True, blank=True)

        initials = request.data.get('initials')
        name = request.data.get('name')
        street = request.data.get('street')
        landmark = request.data.get('landmark')
        address_type = request.data.get('address_type')
        recipient_phone = request.data.get('recipient_phone')
        recipient_alternate_phone = request.data.get('recipient_alternate_phone')
        recipient_email = request.data.get('recipient_email')
        obj = DeliveryInfo.objects.create(initials=initials,name=name,street =street,landmark=landmark,address_type=address_type,
                                                      recipient_phone=recipient_phone,recipient_alternate_phone=recipient_alternate_phone,
                                                      recipient_email=recipient_email)
        # delivery_info = DeliveryInfoSerializer(obj)
        # delivery_info.save()
        return Response(status= status.HTTP_201_CREATED)



    def retrieve(self,request,pk):
        queryset = DeliveryInfo.objects.all().filter(pk=pk)
        serializer = DeliveryInfoSerializer(queryset[0])
        return Response(serializer.data)


    def update(self,request,pk=None):
        pass

    def partial_update(self,request,pk=None):
        pass

    def destroy(self,request,pk=None):
        pass


class DeliveryAddressViewSet(viewsets.ViewSet):
    permission_classes=[IsAuthenticated]

    def list(self,request):
        pass

    def create(self,request):
        firstname = request.data.get('firstname')
        lastname = request.data.get('lastname')
        street_1 = request.data.get('street_1')
        street_2 = request.data.get('street_2')
        city = request.data.get('city')
        state = request.data.get('state')
        pincode = request.data.get('pincode')
        phone = request.data.get('phone')
        message= request.data.get('message')
        orderproduct_id = request.data.get('order_id')
        obj=None
        try:
            obj=DeliveryAddress.objects.get(order_id=orderproduct_id)
            if obj is not None:
                obj.orderproduct_id=orderproduct_id
                obj.first_name_recipient=firstname
                obj.last_name_recipient=lastname
                obj.street_1=street_1
                obj.street_2=street_2
                obj.city=city
                obj.state=state
                obj.pincode=pincode
                obj.phone_no_recipient=phone
                obj.special_message=message
                obj.save(update_fields=['order_id','first_name_recipient','last_name_recipient','street_1','street_2','city','state','pincode','phone_no_recipient','special_message'])
        except:
            obj = DeliveryAddress.objects.create(orderproduct_id=orderproduct_id,first_name_recipient=firstname,last_name_recipient=lastname, street_1=street_1,street_2=street_2,city=city,
                                          state=state,
                                          pincode=pincode,
                                          phone_no_recipient=phone,
                                          special_message=message)

        serializer = DeliveryAddressSerializer(obj)
        # save address
        # create transaction record
        amount=0
        total_price=0
        for order in OrderProduct.objects.filter(orderproduct_id=orderproduct_id):
            price = Products.objects.filter(product_id=order.product_id)[0].price
            total_price += (price * order.quantity)
        amount=math.ceil(total_price*1.18)
        tr=Transaction.objects.create(orderproduct_id=orderproduct_id,amount=math.ceil(total_price*1.18),tax=amount-total_price)
        # pass transaction id to the RP  -- create RPorder
        # get options  using RP order id , amount , etc . -- PASS IT TO CLIENT
        print(tr.transaction_id)
        rp_order=Razorpay().create_order(amount*100,tr.transaction_id,None)
        tr.rp_order = rp_order['id']
        tr.save()
        options= Razorpay().get_options(amount*100,rp_order['id'])

        # On Client : Open the RP page

        return Response(data=options,status=status.HTTP_201_CREATED)

    def retrieve(self,request,pk):
        pass

    def update(self,request,pk=None):
        pass

    def partial_update(self,request,pk=None):
        pass

    def destroy(self,request,pk=None):
        pass


@api_view(['POST'])
@permission_classes([IsAuthenticated,])
def addToCart(request):
    user = request.user
    # if already added quantity increase
    # if not added created
    # if removed or quantity =0 : remove from cart
    product_list = request.data['product_list']

    for product_id,quantity in product_list.items():
        cart = Cart.objects.filter(user=user,product_id = Products.objects.filter(product_id=product_id)[0])
        if len(cart)==0:
            # Products.objects.create(product_id=Products.objects.filter(product_id=product_id)[0].product_id,quantity=quantity)
            Cart.objects.create(product_id=product_id,user=user,quantity=quantity,is_added=True)
        elif len(cart)==1:
            cart[0].quantity=quantity
            cart[0].save()
        else:
            return Response(data={"error":"More than one cart ."},status=status.HTTP_200_OK)
    return Response(data={"products_added":product_list},status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def removeFromCart(request):
    user=request.user
    product_id = request.data['product_id']
    Cart.objects.filter(user=user,product_id=product_id).delete()
    cart_products = Cart.objects.filter(user=user)
    serializer = CartSerializer(cart_products, many=True)
    return Response(data= serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def clearCart(request):
    user=request.user
    product_id = request.data['product_id']
    Cart.objects.filter(user=user).delete()
    return Response(status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getCartDetails(request):
    user = request.user
    cart_products =Cart.objects.filter(user=user)
    serializer = CartSerializer(cart_products,many=True)
    return Response(data=serializer.data,status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createOrder(request):
    product_list = request.data
    user=request.user
    order=None
    orderproduct_id= create_orderproduct_id()
    for product_id,quantity in product_list.items():
        # update Cart Products
        # product_id=int(product_id)
        cart = Cart.objects.filter(user=user,product_id = Products.objects.filter(product_id=product_id)[0])
        if len(cart)==0:
            # Products.objects.create(product_id=Products.objects.filter(product_id=product_id)[0].product_id,quantity=quantity)
            Cart.objects.create(product_id=product_id,user=user,quantity=quantity,is_added=True)
        elif len(cart)==1:
            cart[0].quantity=quantity
            cart[0].save()
        # Create an order with all checked out products
        OrderProduct.objects.create(user=request.user,product_id=product_id,quantity=quantity,orderproduct_id=orderproduct_id)
    return Response(data={'order_id':orderproduct_id},status=status.HTTP_200_OK)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def placeOrder(request):
    rp_order_id= request.data.get('rporder_id')
    user= request.user
    # fetch the transaction from rp_order
    # fetch the order from transaction  -- mark status as paid --- remove the products for this user from cart
    tr = Transaction.objects.filter(rp_order=rp_order_id)[0]
    tr.status =PAID
    tr.save()
    return Response(status=status.HTTP_200_OK)

    # tr.order.


@api_view(["GET"])
@permission_classes([AllowAny])
def getTagsAndProducts(request):
    queryset = Tags.objects.all()
    serializer= TagSerializer(queryset,many=True)
    # # for query in queryset:
    # itemlist=[]
    # for item in serializer.data:
    #     product_queryset=Products.objects.filter(taglist__tag_name=item['tag_name'])
    #     product_serializer = ProductSerializer(product_queryset,many=True)
    #     item['product']=product_serializer.data
    #     itemlist.append(item)
    # print(itemlist)
    # return Response(data=itemlist,status=status.HTTP_200_OK)
    return Response(data=serializer.data,status=status.HTTP_200_OK)


@api_view(["GET"])
@permission_classes([AllowAny])
def getTags(request):
    queryset = Tags.objects.all()
    serializer = OnlyTagSerializer(queryset,many=True)
    return Response(data=serializer.data,status=status.HTTP_200_OK)



