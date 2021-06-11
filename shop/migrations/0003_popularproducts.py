# Generated by Django 3.1.7 on 2021-05-21 03:56

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0002_auto_20210504_1818'),
    ]

    operations = [
        migrations.CreateModel(
            name='PopularProducts',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('products', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='popular', to='shop.products')),
            ],
        ),
    ]
