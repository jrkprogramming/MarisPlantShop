from django.urls import path
from . import views


urlpatterns = [
    path('users/login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/', views.getUsers, name='users'),
    path('users/signup', views.userSignup, name='signup'),
    path('users/profile', views.getUser, name='user_profile'),
    
    path('plants/', views.getPlants, name='plants'),
    path('plants/<str:pk>/', views.getPlant, name='plants'),
]