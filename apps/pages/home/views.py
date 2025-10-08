from django.shortcuts import render
from django.views.generic import TemplateView 


class HomePageView(TemplateView):
    template_name = "home/index.html"

class BlogPageView(TemplateView):
    template_name = "blogs/blog.html"

class BlogDetailPageView(TemplateView):
    template_name = "blogs/blog-detail.html"
    
class ProjectsPageView(TemplateView):
    template_name = "projects/projects.html"
    
class ContactPageView(TemplateView):
    template_name = "about/contact.html"
    
