from django.urls import path
from . import views


urlpatterns = [
    path('users/login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/', views.getUsers, name='users'),
    path('users/signup/', views.userSignup, name='signup'),
    path('users/profile/', views.getUser, name='user_profile'),
    path('users/profile/edit/', views.editUser, name='edit_profile'),
    
    path('plants/', views.getPlants, name='plants-index'),
    path('plants/create/', views.createPlant, name='plant-create'),
    path('plants/imgUpload/', views.imageUpload, name='img-upload'),
    path('plants/<str:pk>/', views.getPlant, name='plant-detail'),
    path('plants/edit/<str:pk>/', views.editPlant, name='plant-edit'),
    path('plants/delete/<str:pk>/', views.deletePlant, name='plant-delete'),
    
    path('orders/add/', views.addOrderItems, name='add_orders'),
    path('orders/<int:pk>/', views.getOrderDetails, name='order_details'),
]