# Generated by Django 3.1.7 on 2021-05-04 18:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='deliveryaddress',
            name='phone_no_recipient',
            field=models.BigIntegerField(),
        ),
    ]
