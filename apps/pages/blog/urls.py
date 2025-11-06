from django.contrib import admin
from django.urls import path, include, re_path
from .views import BlogDetailView, BlogListView

urlpatterns = [
    path('blog/', BlogListView.as_view(), name="blog"),
    path('blog/<slug:slug>/', BlogDetailView.as_view(), name="blog_detail"),
    


]