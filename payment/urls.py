from django.urls import path

from payment.views import create_transaction,buy

urlpatterns = [
    path('create/', create_transaction),
    path('buy/', buy),
]
