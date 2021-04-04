from django.db import models


class CustomerManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(role='A')


class AdminManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(role='B')


class SellerManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(role='C')




