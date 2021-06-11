from django.contrib import admin
from django.urls import path

from users import views
from users.views import UserViewSet
from rest_framework.routers import DefaultRouter

# router = DefaultRouter()
# router.register(r'users',UserViewSet,basename='user')
# urlpatterns = router.urls
user_list =UserViewSet.as_view({
    'get':'list',
    'post':'create'
})
user_detail = UserViewSet.as_view({
    'get':'retrieve',
    'put':'update',
    'patch':'partial_update',
    'delete':'destroy'
})

urlpatterns = [
    path('a/', views.checkuser),
    path('user/',user_list,name='user-list'),
    path('user/<uuid:pk>',user_detail,name ='user-detail'),
    path('login/',views.login),
    path('verify/',views.verify),
    path('lead/',views.lead)
]
