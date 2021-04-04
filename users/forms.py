#accounts.forms.py

from django import forms
from django.contrib.auth.forms import ReadOnlyPasswordHashField

from .models import User

# class RegisterForm(forms.ModelForm):
#     password = ReadOnlyPasswordHashField()
#
#     class Meta:
#         model =User
#         fields =('email','phone','role')
#
#     def clean_data(self):
#         email=self.cleaned_data.get('email')
#         phone= self.cleaned_data.get('phone')
#
#         qs = User.objects.filter(email=email)
#         qs2 = User.objects.filter(phone =phone)
#         if qs.exists() and qs2.exists():
#             raise forms.ValidationError('both email and phone are taken')
#         if qs.exists():
#             raise forms.ValidationError('email is taken')
#         if qs2.exists():
#             raise forms.ValidationError('phone is taken')
#         return email

class UserAdminCreationForm(forms.ModelForm):
    password1 = forms.CharField(label='Password', widget=forms.PasswordInput)
    password2 = forms.CharField(label='Repeat Password', widget=forms.PasswordInput)
    class Meta:
        model = User
        fields =('email','phone','role','is_staff','is_admin')

    def save(self,commit=True):
        # save the provided password in hashed format
        user = super(UserAdminCreationForm,self).save(commit=False)
        user.phone = self.cleaned_data.get('phone',None)
        user.email = self.cleaned_data['email']
        if commit :
            user.save()
        return user



class UserAdminChangeForm(forms.ModelForm):
    class Meta:
        model = User
        fields =('phone','email','is_active')

