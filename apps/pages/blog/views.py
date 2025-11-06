# views.py
from django.shortcuts import render, get_object_or_404
from django.views.generic import DetailView, ListView
from .models import BlogPost, Category, Tag

class BlogDetailView(DetailView):
    model = BlogPost
    template_name = 'blogs/blog-detail.html'
    context_object_name = 'post'
    
    def get_queryset(self):
        return BlogPost.objects.filter(is_published=True)
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        post = self.get_object()
        
        # Table of Contents üçün başlıqları çıxar
        context['toc_headings'] = post.extract_headings()
        
        return context




class BlogListView(ListView):
    model = BlogPost
    template_name = 'blogs/blog.html'
    context_object_name = 'posts'
    
    
    def get_queryset(self):
        queryset = BlogPost.objects.filter(is_published=True)

        # Axtarış parametri
        search = self.request.GET.get("q")
        if search:
            queryset = queryset.filter(
                title__icontains=search
            ) | queryset.filter(
                excerpt__icontains=search
            )

        # Kateqoriya filtiri (slug)
        category = self.request.GET.get("category")
        if category and category != "all":
            queryset = queryset.filter(category__slug=category)

        return queryset

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["categories"] = Category.objects.all()
        context["selected_category"] = self.request.GET.get("category", "all")
        context["search_query"] = self.request.GET.get("q", "")
        return context