from django.contrib import admin

# Register your models here.
from shop.models import Products, SubCategory, Category, Tags


class ProductsAdmin(admin.ModelAdmin):
    model = Products
    readonly_fields = ('product_id',)

admin.site.register(Category)
admin.site.register(SubCategory)
admin.site.register(Products,ProductsAdmin)
admin.site.register(Tags)