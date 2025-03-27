from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from rest_framework.authtoken.models import Token
from rest_framework import status

@api_view(['POST'])
@permission_classes([AllowAny])  # Allow anyone to access signup API
def signup_api(request):
    username = request.data.get('username')
    password = request.data.get('password')
    email = request.data.get('email')

    if not username or not password or not email:
        return Response({'error': 'Please provide all fields'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already taken'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, password=password, email=email)
    token, created = Token.objects.get_or_create(user=user)
    
    return Response({'message': 'User created successfully', 'token': token.key}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
@permission_classes([AllowAny])  # Allow anyone to access login API
def login_api(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)
    if user is not None:
        token, created = Token.objects.get_or_create(user=user)
        return Response({'message': 'Login successful', 'token': token.key}, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def logout_api(request):
    request.user.auth_token.delete()  # Remove token
    logout(request)
    return Response({'message': 'Logged out successfully'}, status=status.HTTP_200_OK)

from rest_framework.authentication import TokenAuthentication

@api_view(['GET'])
def get_user_details(request):
    auth = TokenAuthentication()
    user_auth_tuple = auth.authenticate(request)

    if user_auth_tuple is not None:
        user, token = user_auth_tuple
    else:
        return Response({"error": "Invalid Token"}, status=status.HTTP_401_UNAUTHORIZED)

    user_data = {
        "id": user.id,
        "username": user.username,
    }

    return Response(user_data, status=status.HTTP_200_OK)