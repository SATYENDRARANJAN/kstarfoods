from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

# Register your models here.
from users.forms import UserAdminChangeForm, UserAdminCreationForm
from users.models import User, UserProfile, UserAddress


class UserAdmin(BaseUserAdmin):
    add_form = UserAdminCreationForm
    # change_form = UserAdminChangeForm

    list_display = ('email','phone','is_active')
    list_filter = ('phone','email')
    fieldsets = (
        (None, {'fields': ('email', 'phone')}),
        ('Personal info', {'fields': ()}),
        ('Permissions', {'fields': ('is_active',)}),
    )
    add_fieldsets = (
        (None, {
            'fields': ('email',  'password1', 'password2'),
        }),
    )
    search_fields = ('email',)
    ordering = ('email',)
    filter_horizontal = ()


admin.site.register(User,UserAdmin)

admin.site.register(UserProfile)
admin.site.register(UserAddress)