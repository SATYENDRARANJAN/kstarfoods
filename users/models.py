import uuid

from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.core.validators import RegexValidator
from django.db import models
from phonenumber_field.modelfields import PhoneNumberField
from django.utils.translation import ugettext_lazy as _

from users.manager import CustomerManager, SellerManager


class CustomUserManager(BaseUserManager):

    def create_user(self,email,phone=None,password=None,is_active=False, is_admin=False,is_staff=False):
        if not email:
            raise ValueError('Users must have an email address.')

        user_obj = self.model(email = self.normalize_email(email))
        user_obj.set_password(password)
        user_obj.is_active = is_active
        user_obj.is_staff = is_staff
        user_obj.is_admin = is_admin
        user_obj.save(using = self._db)
        return user_obj

    def create_superuser(self,email,password=None,is_active=True, is_admin=True,is_staff=True,is_superuser=True):
        if not email:
            raise ValueError('Users must have an email address.')

        user_obj = self.model(email = self.normalize_email(email))
        user_obj.set_password(password)
        user_obj.is_active = is_active
        user_obj.is_staff = is_staff
        user_obj.is_admin = is_admin
        user_obj.is_superuser=is_superuser
        user_obj.save(using = self._db)
        return user_obj

#client.phone.as_e164
class User1(AbstractBaseUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    phone = PhoneNumberField(null =True, blank = True, unique = True)
    email = models.CharField(max_length=255,null = False,unique=True)
    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)
    role = models.CharField(max_length=1,choices=[('A',_('Customer')),('B',_('Admin')),('C','Seller')])

    objects =CustomUserManager()
    customers = CustomerManager()
    sellers = SellerManager()
    USERNAME_FIELD ='email'
    REQUIRED_FIELDS = []

    def get_full_name(self):
        return self.email

    def get_short_name(self):
        return self.email

    def has_perm(self,perm,obj=None):
        return True

    def has_module_perms(self,obj=None):
        return True


class UserManager(BaseUserManager):
    def create_user(self, phone=None,email =None ,password=None, is_staff=False, is_active=False, is_admin=False,utm_source=None,utm_medium=None,utm_campaign=None):
        if not phone:
            return ValueError("Please enter phone ")
        user = self.model (phone=phone,email=email)
        user.set_password(password)
        user.is_staff=is_staff
        user.is_active=is_active
        user.is_admin = is_admin
        if utm_source:
            user.utm_source=utm_source
        if utm_medium:
            user.utm_medium =utm_medium
        if utm_campaign:
            user.utm_campaign =utm_campaign
        user.role = User.Customer
        user.save(using=self._db)
        return user

    def create_superuser(self, phone=None,email =None ,password=None, is_staff=False, is_active=False, is_admin=False):
        if not phone:
            return ValueError("Please enter phone ")
        if password is None:
            raise TypeError('Superusers must have a password.')
        user = self.model (phone=phone,email=email)
        user.set_password(password)
        user.is_staff=True
        user.is_active=True
        user.is_admin = True
        user.role = User.Staff
        user.save(using= self._db)
        return user

class StaffManager(BaseUserManager):
    def create_staff_user(self,phone=None,email=None,password=None, is_staff=False, is_active=False,is_admin=False):
        if not email:
            return ValueError("Email is mandatory")
        user = self.model(email = email)
        user.phone = phone
        user.set_password(password)
        user.is_staff = True
        user.is_active = is_active
        user.is_admin = is_admin
        user.role = User.Customer
        user.save(using=self._db)
        return user

class User(AbstractBaseUser):
    Customer ="Customer"
    Staff ="Staff"
    Seller = "Seller"
    phone_regex = RegexValidator(regex =r'^[6-9]{1}[0-9]{9}$',message="Check Phone no.")
    id = models.UUIDField(primary_key=True,default=uuid.uuid4,max_length=100,editable=True)
    phone = models.CharField(validators=[phone_regex],max_length=15,unique=True,null=True)
    email  = models.EmailField(null=True)
    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    utm_source = models.CharField(max_length=40,default=None,null=True)
    utm_medium = models.CharField(max_length=40,default=None,null=True)
    utm_campaign = models.CharField(max_length=40,default=None,null=True)
    referral_code = models.CharField(max_length=40,null=True)
    referrer = models.CharField(max_length=40,default=None,null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)
    role = models.CharField(max_length=100,choices=[(Customer,_('Customer')),(Staff,_('Staff')),(Seller,'Seller')])

    USERNAME_FIELD ='phone'
    REQUIRED_FIELD = []

    objects= UserManager()
    staff_objects =StaffManager()

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, obj=None):
        return True

class UserProfile(models.Model):
    user = models.OneToOneField(User,related_name="profile",on_delete=models.CASCADE)
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    date_of_birth =models.DateField(null=True)

class UserAddress(models.Model):
    user=models.OneToOneField(User,related_name="address",on_delete=models.CASCADE)
    street =models.CharField(max_length=200)
    city = models.CharField(max_length=200)
    pincode = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.street} + " " +{self.city} + " " + {self.pincode}'

class PhoneOTP(models.Model):
    user = models.OneToOneField(User,to_field='id',on_delete=models.CASCADE)
    otp = models.IntegerField(max_length=6,null=True)
