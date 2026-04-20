from django.urls import path
from . import views

urlpatterns = [path("allusers/", views.all_users)]
