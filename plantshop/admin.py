from django.contrib import admin
from .models import User, User_Address, User_Payment, Product, Shopping_Session, Cart_Item, Payment_Details, Order_Details, Order_Items

# Register your models here.
admin.site.register(User)
admin.site.register(User_Address)
admin.site.register(User_Payment)
admin.site.register(Product)
admin.site.register(Shopping_Session)
admin.site.register(Cart_Item)
admin.site.register(Payment_Details)
admin.site.register(Order_Details)
admin.site.register(Order_Items)
