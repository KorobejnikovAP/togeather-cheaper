from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings

# Create your models here.

class User(AbstractUser):
    CLIENT = 'client'
    MANAGER = 'manager'
    USER_ROLE_CHOICES = [
        (CLIENT, 'client'),
        (MANAGER, 'manager'),
    ]

    user_role = models.CharField(max_length=7, choices=USER_ROLE_CHOICES, default=CLIENT)  

class Product(models.Model):
    name = models.CharField(max_length=128)
    price = models.IntegerField()

class Collecting(models.Model):
    product = models.ForeignKey('Product', on_delete=models.CASCADE)
    manager = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='manager')
    clients = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='client')
    countForBuy = models.IntegerField()

    ACTIVE = True
    CLOSE = False
    STATUS_CHOICES = [
        (ACTIVE, 'active'),
        (CLOSE, 'close'), 
    ]
    status = models.BooleanField(choices=STATUS_CHOICES, default=CLOSE)
