from django.urls import path

from shop import views
from shop.views import ProductViewSet, DeliveryInfoViewSet, addToCart, getCartDetails, removeFromCart, createOrder, \
    DeliveryAddressViewSet, placeOrder, getTagsAndProducts, getTags

product_list = ProductViewSet.as_view({
    'get':'list',
    'post':'create'
})

product_detail =ProductViewSet.as_view({
    'get':'retrieve',
    'put':'update',
    'patch':'partial_update',
    'delete':'destroy'
})

product_list_tag = ProductViewSet.as_view({
    'get':'list_by_tag',
})

delivery_info_list = DeliveryInfoViewSet.as_view({
    'get':'list',
    'post':'create'
})

delivery_info_detail= DeliveryInfoViewSet.as_view({
    'get':'retrieve',
    'put':'update',
    'patch':'partial_update',
    'delete':'destroy'
})

delivery_address_list =DeliveryAddressViewSet.as_view({
    'get':'list',
    'post':'create'
})

delivery_address_detail = DeliveryAddressViewSet.as_view({
    'get':'retrieve',
    'put':'update',
    'patch':'partial_update',
    'delete':'destroy'
})

urlpatterns = [
    path('products/',product_list,name='product-list'),
    path('products/<slug:pk>',product_detail,name='product-detail'),
    path('products/list/<str:tag>',product_list_tag,name='product-list-tag'),
    path('delivery_info/',delivery_info_detail,name ='delivery_info_detail'),
    path('delivery_info/',delivery_info_list,name ='delivery_info_list'),
    path('delivery_address/',delivery_address_list,name ='delivery_address_list'),
    path('add_to_cart/', addToCart),
    path('get_cart_details/', getCartDetails),
    path('remove_item_from_cart/', removeFromCart),
    path('create_order/', createOrder),
    path('place_order/', placeOrder),
    path('get_tags_and_products/', getTagsAndProducts),
    path('get_tags/', getTags)
]
