from django.db import models
from django.contrib.auth.models import User

# Create your models here.
    
class Plant(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True, default='')
    image = models.ImageField(null=True, blank=True)
    description = models.TextField(null=True, blank=True, default='')
    price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True, default=0)
    quantity = models.IntegerField(default=0)

    def __str__(self):
        return self.name

class Order(models.Model): #Cart
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    paymentMethod = models.CharField(max_length=200, null=True, blank=True, default='')
    taxPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True, default=0)
    shippingPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True, default=0)
    totalPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True, default=0)
    isPaid = models.BooleanField(default=False, null=True, blank=True)
    paid_At = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    isDelivered = models.BooleanField(default=False)
    delivered_At = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    transaction_id = models.CharField(max_length=200, null=True, default='')
    
    def __str__(self):
        return str(self.createdAt)
    
class OrderItem(models.Model):
    plant = models.ForeignKey(Plant, on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True, blank=True)
    name = models.CharField(max_length=200, null=True, blank=True, default='')
    quantity = models.IntegerField(default=0, null=True, blank=True)
    price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True, default=0)
    image = models.CharField(max_length=200, null=True, blank=True, default='')
    
    def __str__(self):
        return self.name


class ShippingAddress(models.Model):
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, blank=True, null=True)
    address = models.CharField(max_length=200, null=True, blank=True, default='')
    city = models.CharField(max_length=200, null=True, blank=True, default='')
    state = models.CharField(max_length=200, null=True, blank=True, default='')
    zipcode = models.CharField(max_length=200, null=True, blank=True, default='')
    shippingPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True, default=0)
    
    def __str__(self):
        return self.address