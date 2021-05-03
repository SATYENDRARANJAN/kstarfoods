from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.response import Response

from payment import models
from payment.models import Transaction
from shop.models import Products, OrderProduct
from users.models import User

from payment.constants import RAZORPAY_TEST_KEY,RAZORPAY_TEST_SECRET


def create_transaction(request):
    user = User.objects.all()[0]
    product= Products.objects.all()[0]
    order = OrderProduct.objects.create(user=user,product=product)
    order.save()
    tr = Transaction.objects.create(order=order)
    return Response(data ={'transaction':tr.transaction_id + " " +tr.order.id},status=status.HTTP_200_OK)


def buy(request):
    # create an order and open razorpay.
    pass


class Razorpay():
    def __init__(self):
        import razorpay

        self.client = razorpay.Client(auth = (RAZORPAY_TEST_KEY, RAZORPAY_TEST_SECRET))

    def create_order(self,amount,transaction_id,shipping_address):
        order_amount = amount
        order_currency = 'INR'
        order_receipt = transaction_id
        notes = {'Shipping address': shipping_address}  # OPTIONAL
        rp_order =self.client.order.create(dict(amount=order_amount, currency=order_currency, receipt=order_receipt, notes=notes))
        return rp_order

    def get_options(self,order_amount,order_id,username=None,email=None,contact=None,user_address=None):
        options = {
                    "key": RAZORPAY_TEST_KEY,
                    "amount": order_amount,
                    "currency": "INR",
                    "name": "@hiCherie !",
                    "description": "Cherie Transaction",
                    "image": "https://s3.ap-south-1.amazonaws.com/hicherie.in/CHERIE_LOGO.png",
                    "order_id": order_id,
                    "prefill": {
                                    "name": username,
                                    "email": email,
                                    "contact": contact
                                },
                    "notes": {
                        "address":user_address
                    },
                    "theme": {
                        "color": "#ffe6cc"
                    }
                };
        return options