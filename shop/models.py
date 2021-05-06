from django.db import models
from django.utils.crypto import get_random_string


# Create your models here.
from phonenumber_field.modelfields import PhoneNumberField

from users.models import User

class Tags(models.Model):
    BIRTHDAY = 'birthday'
    ANNIVERSARY = 'anniversary'
    HOLI = 'holi'
    WEDDINGS = 'weddings'
    FRIENDSHIP = "friendship"
    FLOWERS = "flowers"
    CHOCOLATES = "chocolates"
    PRESENTS = "presents"
    ALL="all"

    TAGS = (
    (BIRTHDAY, BIRTHDAY), (ANNIVERSARY, ANNIVERSARY), (HOLI, HOLI), (WEDDINGS, WEDDINGS), (FRIENDSHIP, FRIENDSHIP),
    (FLOWERS, FLOWERS), (CHOCOLATES, CHOCOLATES), (PRESENTS, PRESENTS),(ALL,ALL))
    tag_name = models.CharField(max_length=200,choices=TAGS,default=ALL)

    def __str__(self):
        return self.tag_name


class Category(models.Model):
    category_name = models.CharField(max_length=100,unique=True)
    category_code = models.CharField(max_length=100,unique=True,null=True,blank=True)
    category_icon = models.CharField(max_length=255,null=True,blank=True)

    def __str__(self):
        return self.category_name

class SubCategory(models.Model):
    subcategory_name = models.CharField(max_length=100)
    subcategory_icon = models.CharField(max_length=255,null=True,blank=True)
    category = models.ForeignKey(Category,related_name='subcategories',on_delete=models.SET_NULL,blank=True,null=True)

    def __str__(self):
        return self.category.category_name + "         /     " + self.subcategory_name


class Products(models.Model):
    BIRTHDAY='birthday'
    ANNIVERSARY='anniversary'
    HOLI='holi'
    WEDDINGS='weddings'
    FRIENDSHIP="friendship"
    FLOWERS="flowers"
    CHOCOLATES="chocolates"
    PRESENTS="presents"
    ALL="all"
    TAGS =((BIRTHDAY,BIRTHDAY),(ANNIVERSARY,ANNIVERSARY),(HOLI,HOLI),(WEDDINGS,WEDDINGS),(FRIENDSHIP,FRIENDSHIP),(FLOWERS,FLOWERS),(CHOCOLATES,CHOCOLATES),(PRESENTS,PRESENTS),(ALL,ALL))
    product_id = models.AutoField(primary_key=True, editable=False)
    product_name = models.CharField(max_length=100)
    product_slug = models.CharField(max_length=100)
    img = models.CharField(max_length=200,null=True,blank=True)
    heading = models.CharField(max_length=100,null=True,blank=True)
    subtxt = models.CharField(max_length=100,null=True,blank=True)
    category = models.ForeignKey(Category,related_name='products',on_delete=models.SET_NULL,blank=True,null=True)
    subcategory = models.ForeignKey(SubCategory,related_name='products',on_delete=models.SET_NULL,blank=True,null = True)
    short_code = models.CharField(max_length=100)
    care_info = models.CharField(max_length=100,null=True)
    description = models.CharField(max_length=100,null=True)
    price = models.PositiveIntegerField()
    is_active = models.BooleanField(default=True)
    taglist = models.ManyToManyField(Tags,related_name='products')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return self.product_name + " /   "+ self.product_slug

class Cart(models.Model):
    product = models.ForeignKey(Products,on_delete=models.CASCADE,related_name='productcart')
    user = models.ForeignKey(User,on_delete=models.CASCADE,to_field='id',related_name='cart')
    is_added =models.BooleanField(default=True)
    quantity = models.PositiveIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

def create_orderproduct_id():
    return f'chord_{ get_random_string(length=10)}'

class OrderProduct(models.Model):
    orderproduct_id = models.CharField(max_length=20)
    user = models.ForeignKey(User,on_delete=models.CASCADE,related_name='orderproducts')
    product = models.ForeignKey(Products,on_delete=models.CASCADE)
    quantity =models.PositiveIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

class DeliveryInfo(models.Model):
    INITIALS_CHOICES =(('Mr.','Mr.'),('Mrs.','Mrs.'),('Ms','Ms.'),('Shri','Shri'),('Smt.','Smt.'),('Dr.','Dr.'),('Prof.','Prof.'))
    ADDRESS_TYPE=(('O','OFFICIAL'),('P','PERMANENT'),('H','HOME'))
    initials = models.CharField(max_length=10,choices=INITIALS_CHOICES)
    name = models.CharField(max_length=200,blank=True,null=True)
    street=models.CharField(max_length=300)
    landmark = models.CharField(max_length=300)
    address_type = models.CharField(max_length=100,choices=ADDRESS_TYPE,blank=True,null=True)
    recipient_phone = PhoneNumberField(unique = True)
    recipient_alternate_phone = PhoneNumberField(unique=True,null=True,blank=True)
    recipient_email = models.EmailField(null=True,blank=True)



class ErrorLogs(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE,related_name='error')
    error =  models.CharField(max_length=2000,blank=True,null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)



class DeliveryAddress(models.Model):
    orderproduct_id = models.CharField(max_length=200)
    first_name_recipient = models.CharField(max_length=200)
    last_name_recipient = models.CharField(max_length=200)
    street_1 =models.CharField(max_length=200)
    street_2 =models.CharField(max_length=200)
    city = models.CharField(max_length=200)
    state = models.CharField(max_length=200)
    pincode = models.PositiveIntegerField()
    phone_no_recipient = models.BigIntegerField()
    special_message =models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField

    def __str__(self):
        return f'{self.street} + " " +{self.city} + " " + {self.pincode}'





