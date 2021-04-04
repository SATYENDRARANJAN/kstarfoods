from rest_framework import serializers

from shop.models import Products, DeliveryInfo, Cart, DeliveryAddress, Tags
from users.serializers import UserSerializer


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Products
        fields ='__all__'


class DeliveryInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeliveryInfo
        fields = '__all__'


class DeliveryAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeliveryAddress
        fields = '__all__'


class CartSerializer(serializers.ModelSerializer):
    product =ProductSerializer()
    class Meta:
        model = Cart
        fields =['id','user','quantity','is_added','product']


class TaggedProductSerializer(serializers.ModelSerializer):
    class Meta:
        model=Products
        fields='__all__'


class TagSerializer(serializers.ModelSerializer):
    products = TaggedProductSerializer(many=True)
    class Meta:
        model = Tags
        fields = ['tag_name','products']



class OnlyTagSerializer(serializers.ModelSerializer):
    class Meta:
        model =Tags
        fields ='__all__'


# class CartSerializer(serializers.Serializer):
#     product = ProductSerializer(required=False)
#     user = UserSerializer(required=True)
#     is_added =serializers.BooleanField(default=True)
#
#     def create(self,validated_data):
#         self.cart.delete()
#         return Cart(**validated_data)
#
#     def update(self, instance, validated_data):
#         instance.product = validated_data.get('product',instance.product)
