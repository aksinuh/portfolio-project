from django.contrib import admin
from django.urls import path, include, re_path
from . import views

urlpatterns = [
    path('', views.HomePageView.as_view(), name="home"),
    path('blog/', views.BlogPageView.as_view(), name="blog"),
    path('blog-1', views.BlogDetailPageView.as_view(), name="blog-detail"),
    path('projects/', views.ProjectsPageView.as_view(), name="projects"),
    path('contact/', views.ContactPageView.as_view(), name="contact"),

]