from rest_framework import serializers

from users.models import User, UserLeads


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude =['password','is_admin','is_staff','created_at']


class UserLeadSerializer(serializers.ModelSerializer):
    class Meta:
        model= UserLeads
        fields="__all__"
