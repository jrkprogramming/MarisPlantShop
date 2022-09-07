from django.db import models

# Create your models here.


# User Management
class User(models.Model):
    username: models.CharField()
    password: models.CharField()
    first_name: models.CharField()
    last_name: models.CharField()
    telephone: models.IntegerField()
    isAdmin: models.BooleanField()
    
    def __str__(self):
        return self.username
    
    
class User_Address(models.Model):
    user_id: models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_address')
    address_line1: models.CharField()
    address_line2: models.CharField()
    city: models.CharField()
    postal_code: models.CharField()
    country: models.CharField()
    phone_number: models.CharField()
    
    def __str__(self):
        return self.user_id
    
class User_Payment(models.Model):
    user_id: models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_payment')
    payment_type: models.CharField()
    provider: models.CharField()
    card_number: models.IntegerField()
    expiry: models.DateField()
    
    def __str__(self):
        return self.user_id
    
    
    
# Product Management
class Product(models.Model):
    name: models.CharField()
    description: models.TextField()
    price: models.IntegerField()
    quantity: models.IntegerField()
    
    def __str__(self):
        return self.name
    


# Shopping Process
class Shopping_Session(models.Model):
    user_id: models.ForeignKey(User, on_delete=models.CASCADE, related_name='shopping_session')
    total_price: models.CharField()
    
    def __str__(self):
        return self.user_id
    
class Cart_Item(models.Model):
    session_id: models.ForeignKey(Shopping_Session, on_delete=models.CASCADE, related_name='session_id')
    product_id: models.ForeignKey(Product, on_delete=models.CASCADE, related_name='product_id')
    quantity: models.IntegerField()
    
    def __str__(self):
        return self.session_id
    
class Payment_Details(models.Model):
    order_id: models.IntegerField()
    amount: models.IntegerField()
    provider: models.CharField()
    status: models.CharField()
    
    def __str__(self):
        return self.order_id
    
class Order_Details(models.Model):
    user_id: models.ForeignKey(User, on_delete=models.CASCADE, related_name='order_details')
    total: models.IntegerField()
    payment_id: models.ForeignKey(Payment_Details, on_delete=models.CASCADE, related_name='payment_id')
    
    def __str__(self):
        return self.user_id
    
class Order_Items(models.Model):
    order_id: models.ForeignKey(Order_Details, on_delete=models.CASCADE, related_name='order_items')
    product_id: models.ForeignKey(Product, on_delete=models.CASCADE, related_name='product_id')
    quantity: models.IntegerField()
    
    def __str__(self):
        return self.order_id