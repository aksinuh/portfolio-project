from django.contrib import admin
from django.urls import path, include, re_path
from .views import ContactView

urlpatterns = [
    path('contact/', ContactView.as_view(), name="contact"),
]