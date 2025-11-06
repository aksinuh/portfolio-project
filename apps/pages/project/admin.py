from django.contrib import admin
from .models import Project, Category, ProjectLink, TechnologyTag


class ProjectLinkInline(admin.TabularInline):
    model = ProjectLink
    extra = 1


@admin.register(TechnologyTag)
class TechnologyTagAdmin(admin.ModelAdmin):
    list_display = ['name']
    search_fields = ['name']
 
 
@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['title', 'created_at', 'icon', 'categories_list']
    search_fields = ['title', 'description']
    list_filter = ['categories', 'created_at']
    inlines = [ProjectLinkInline]
    filter_horizontal = ['categories']

    def categories_list(self, obj):
        return ", ".join([category.name for category in obj.categories.all()])
    categories_list.short_description = 'Kateqoriyalar'
    
    
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name']
    search_fields = ['name']
