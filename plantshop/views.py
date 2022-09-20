from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.hashers import make_password
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import serializers
from rest_framework import status
from rest_framework.serializers import *
from django.contrib.auth.models import User
from .models import *
from .serializers import PlantSerializer, UserSerializer, UserSerializerWithToken, OrderSerializer
from datetime import datetime

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


# Create your views here.


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        
        serializer = UserSerializerWithToken(self.user).data
        
        for k, v in serializer.items():
            data[k] = v
        
        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUser(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def userSignup(request):
    data = request.data
    
    try:
        user = User.objects.create(
            username = data['username'],
            email = data['email'],
            first_name = data['first_name'],
            last_name = data['last_name'],
            password = make_password(data['password'])
        )
        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'User with this email already exists!'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    
    
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def editUser(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    data = request.data
    
    user.username = data['username']
    user.email = data['email']
    user.first_name = data['first_name']
    user.last_name = data['last_name']
    if data['password'] != '':
        user.password = make_password(data['password'])
        
    user.save()
    
    return Response(serializer.data)





# Plant Views


@api_view(['GET'])
def getPlants(request):
    plants = Plant.objects.all()
    serializer = PlantSerializer(plants, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getPlant(request, pk):
    plant = Plant.objects.get(id=pk)
    serializer = PlantSerializer(plant, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createPlant(request):
    user = request.user
    
    plant = Plant.objects.create(
        user=user,
        name='name',
        price=0,
        description='description',
        quantity=0,
    )
    
    serializer = PlantSerializer(plant, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def editPlant(request, pk):
    data = request.data
    plant = Plant.objects.get(id=pk)
    
    plant.name = data['name']
    plant.price = data['price']
    plant.description = data['description']
    plant.quantity = data['quantity']
    
    plant.save()
    
    serializer = PlantSerializer(plant, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deletePlant(request, pk):
    plant = Plant.objects.get(id=pk)
    plant.delete()
    return Response('Plant Deleted')



# Order Views

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data
    
    orderItems = data['orderItems']
    print(orderItems)
    
    if orderItems and len(orderItems) == 0:
        return Response({'detail': 'No Order Items'}, status=status.HTTP_400_BAD_REQUEST)
    
    else:
        
        # Create Order
        
        order = Order.objects.create(
            user = user,
            paymentMethod = data['paymentMethod'],
            taxPrice = data['taxPrice'],
            shippingPrice = data['shippingPrice'],
            totalPrice = data['totalPrice'],
        )
        
        # Create ShippingAddress
        
        shipping = ShippingAddress.objects.create(
            order = order,
            address=data['shippingAddress']['address'],
            city=data['shippingAddress']['city'],
            zipcode=data['shippingAddress']['zipcode'],
            state=data['shippingAddress']['state'],
        )
        
        # Create Order Items
        
        
        for i in orderItems:
            plant = Plant.objects.get(id=i['plant'])
            
            item = OrderItem.objects.create(
                plant = plant,
                order=order,
                name=plant.name,
                cartQty=i['cartQty'],
                price=i['price'],
                image=plant.image.url
            )
            
            #Update inventory 
            plant.quantity -= int(item.cartQty)
            plant.save()
    
        serializer = OrderSerializer(order, many=False)    
        return Response(serializer.data)
    


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrders(request):
    user = request.user
    orders = user.order_set.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getOrdersAdmin(request):
    orders = Order.objects.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


    

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderDetails(request, pk):
    # user = request.user
    order = Order.objects.get(id=pk)
    serializer = OrderSerializer(order, many=False)
    return Response(serializer.data)
    


@api_view(['POST'])
def imageUpload(request):
    data = request.data
    
    plant_id = data['plant_id']
    plant = Plant.objects.get(id=plant_id)
    
    plant.image = request.FILES.get('image')
    plant.save()
    return Response("image was uploaded")



@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def orderPaidStatus(request, pk):
    order = Order.objects.get(id=pk)
    
    order.isPaid = True
    order.paid_At = datetime.now()
    order.save()
    return Response('ORDER PAID')