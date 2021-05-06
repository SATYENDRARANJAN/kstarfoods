from django.db import models
from shop.models import OrderProduct
from django.utils.crypto import get_random_string

def create_transaction_id():
    return f'chtr_{ get_random_string(length=32)}'

class Transaction(models.Model):
    PAID='paid'
    FAIL='fail'
    INITIATED='initiated'
    TRANSACTION_STATUS=((PAID,'paid'),(FAIL,'fail'),(INITIATED,'initiated'))
    transaction_id = models.CharField(primary_key=True, max_length=200, default=create_transaction_id)
    orderproduct_id = models.CharField(max_length=200)
    rp_order = models.CharField(max_length=200,null=True,blank=True)
    amount = models.DecimalField(max_digits=6,decimal_places=2)
    tax = models.DecimalField(max_digits=6,decimal_places=2)
    status= models.CharField(choices=TRANSACTION_STATUS,max_length=255,default=PAID)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.transaction_id + "  " + self.order.order_id






