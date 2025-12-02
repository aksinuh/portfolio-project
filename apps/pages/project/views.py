from django.shortcuts import render
from .models import Project, Category
from django.views.generic import ListView
from apps.pages.home.models import About
from django.db.models import Q

class ProjectListView(ListView):
    model = Project
    template_name = 'projects/projects.html'
    context_object_name = 'projects'
    
    
    def get_queryset(self):
        queryset = Project.objects.all()

        # Axtarış parametri
        search = self.request.GET.get("q", "").strip()
        if search:
            queryset = queryset.filter(
                Q(title__icontains=search) |
                Q(description__icontains=search) |
                Q(categories__name__icontains=search)
            ).distinct()

        # Kateqoriya filtiri (slug)
        category = self.request.GET.get("category")
        if category and category != "all":
            queryset = queryset.filter(categories__slug=category).distinct()

        return queryset

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["categories"] = Category.objects.all()
        context["selected_category"] = self.request.GET.get("category", "all")
        context["search_query"] = self.request.GET.get("q", "")
        context['about'] = About.objects.first()
        return context