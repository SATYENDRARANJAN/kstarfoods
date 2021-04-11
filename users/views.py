import pyotp
from django.contrib.auth.models import update_last_login
from django.shortcuts import render
from rest_framework import status, viewsets
from rest_framework.decorators import api_view, permission_classes, action

# Create your views here.
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from users.models import User, UserAddress, PhoneOTP
from users.serializers import UserSerializer
from rest_framework_jwt.settings import api_settings


JWT_PAYLOAD_HANDLER = api_settings.JWT_PAYLOAD_HANDLER
JWT_ENCODE_HANDLER = api_settings.JWT_ENCODE_HANDLER

@api_view(['GET'])
def checkuser(request):
    user = User.objects.all();
    customers = User.customers.all()
    sellers = User.sellers.all()
    return Response(status=status.HTTP_200_OK)


class UserViewSet(viewsets.ViewSet):
    """
        During dispatch, the following attributes are available on the ViewSet.

        basename - the base to use for the URL names that are created.
        action - the name of the current action (e.g., list, create).
        detail - boolean indicating if the current action is configured for a list or detail view.
        suffix - the display suffix for the viewset type - mirrors the detail attribute.
        name - the display name for the viewset. This argument is mutually exclusive to suffix.
        description - the display description for the individual view of a viewset.
       A simple ViewSet for listing or retrieving users.
    """
    def list(self,request):
        queryset = User.objects.all()
        serializer = UserSerializer(queryset , many=True)
        return Response(data=serializer.data,status=status.HTTP_200_OK)

    def create(self,request):
        #  create_user(self,email,phone=None,password=None,is_active=False, is_admin=False,is_staff=False):
        user = User.objects.create_user(email =request.data.get('email'),phone=request.data.get('phone'),is_active =True,is_admin=False)
        serializer = UserSerializer(user)
        return Response(data={'user':serializer.data},status=status.HTTP_201_CREATED)

    def retrieve(self,request,pk=None):
        queryset = User.objects.all()
        user = get_object_or_404(queryset,pk=pk)
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def update(self,request , pk=None):
        user = User.objects.get(email =request.get('email'))
        user.email=request.get('updated_email',None)
        user.save(update_fields=['email'])
        return Response(status=status.HTTP_200_OK)

    def partial_update(self,request,pk =None):
        pass

    def destroy(self,request,pk=None):
        pass

    # def get_permissions(self):
    #     if self.action=='list':
    #         permission_classes = ['IsAuthenticated']
    #     else:
    #         permission_classes = ['IsAdmin']
    #     return [permission() for permission in permission_classes]


# Bind UserViewSet into two different views
#   user_list = UserViewSet.as_view({'get':'list'})
#   user_detail = UserViewSet.as_view({'get':'retrieve'})


# The decorator allows you to override any viewset-level configuration such as permission_classes, serializer_class, filter_backends...:
# @action decorator
# detail argument = True or False for single or entire list
# DefaultRouter will configure detail actions to contain 'pk' in their url patterns

    @action(detail=True,methods=['post'],permission_classes=['IsAdminOrIsSelf'])
    def set_password(self,request,pk=None):
        pass



    # Extra action example
    # @action(detail=True,methods=['post'])
    # def set_password(self,request,pk=None):
    #     user= self.get_object()
    #     serializer = PasswordSerializer(data=request.data)
    #     if serializer.is_valid():
    #         user.set_password(request.data['password'])
    #         user.save()
    #         return Response({'status':'password set'})
    #     else:
    #         return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False)
    def recent_users(self,request):
        recent_users = User.objects.all().order_by('-last_login')
        page = self.paginate_queryset(recent_users)
        if page is not None:
            serializer = self.get_serializer(page,many=True)
            return self.get_paginated_response(serializer.data)


@api_view(['POST'])
@permission_classes([AllowAny,])
def login(request):
    # create user using phone or get user obj
    # generate otp - save in our db for that user
    # send otp to client
    # NEXT STEP /verify
    print(request.data)
    phone= request.data.get('phone',None)
    user = User.objects.filter(phone=phone)
    if len(user)==0:
        user= User.objects.create_user(phone=phone)
    elif len(user)==1:
        try:
            user = User.objects.get(phone=phone)
        except User.DoesNotExist:
            return Response(error='user Does not exist',status=status.HTTP_400_BAD_REQUEST)
    else :
        return Response(error='More than 1 user in db',status=status.HTTP_400_BAD_REQUEST)

    #generate otp
    totp = pyotp.TOTP(pyotp.random_base32())
    gen_otp=totp.now()

    #Phone-OTP
    phOtp,created= PhoneOTP.objects.get_or_create(user=user)
    phOtp.otp= gen_otp
    print(gen_otp)
    phOtp.save()

    api_key = '4e2d126e-9a75-11eb-80ea-0200cd936042'
    #send otp to client
    import requests
    url = f'http://2factor.in/API/V1/{api_key}/SMS/{phone}/{gen_otp}'
    print(url)

    payload = ""
    headers = {'content-type': 'application/x-www-form-urlencoded'}
    response = requests.request("GET", url, data=payload, headers=headers)
    print(response.text)
    return Response(data={'user_id':user.id},status=status.HTTP_201_CREATED)



@api_view(['POST'])
@permission_classes([AllowAny,])
def verify(request):
    user_id = request.data.get('user_id',None)
    otp = request.data.get('otp',None)
    phone=User.objects.get(id=user_id).phone
    if not phone:
        return Response(error={'error':"Phone not present"},status=status.HTTP_400_BAD_REQUEST)
    user = User.objects.filter(phone=phone)
    phOtp =None
    if len(user)==0:
        user = User.objects.create_user(phone=phone)
    elif len(user)==1:
        user = User.objects.get(phone=phone)
    else:
        return Response(error='More than 1 user in db',status=status.HTTP_400_BAD_REQUEST)
    phOtp = PhoneOTP.objects.filter(user=user)
    # set isactive True
    user.is_active=True
    user.save()

    if str(phOtp[0].otp) == otp:
        #generate JWT Token for the user and send it to the client
        import jwt
        try:
            payload = JWT_PAYLOAD_HANDLER(user)
            jwt_token = JWT_ENCODE_HANDLER(payload)
            update_last_login(None, user)
        except User.DoesNotExist:
            return Response(error="User does not exist",status=status.HTTP_401_UNAUTHORIZED)
        return Response(data={
            'id ': user.id,
            'token': jwt_token
        },status= status.HTTP_200_OK)

    else:
        return Response(data={'error':"Response not verified"},status=status.HTTP_401_UNAUTHORIZED)



@api_view(['GET'])
def send_otp(request):
    import requests
    url = "http://2factor.in/API/V1/293832-67745-11e5-88de-5600000c6b13/BAL/SMS"
    payload = ""
    headers = {'content-type': 'application/x-www-form-urlencoded'}
    response = requests.request("GET", url, data=payload, headers=headers)
    print(response.text)
    if response['Status']=='Success':
        return  Response(status=status.HTTP_200_OK)
    return Response(data={ "session":response["Details"]},status=status.HTTP_400_BAD_REQUEST)


