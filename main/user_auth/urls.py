from django.urls import path
from .views import signup_api, login_api, logout_api,get_user_details

urlpatterns = [
    path('signup/', signup_api, name='signup_api'),
    path('login/', login_api, name='login_api'),
    path('logout/', logout_api, name='logout_api'),
    path('user/', get_user_details, name='get_user_details'),
]