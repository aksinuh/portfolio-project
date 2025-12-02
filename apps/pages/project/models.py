from django.db import models
from apps.pages.home.models import Icons
from django.utils.text import slugify

class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100, unique=True, null=True, blank=True)

    class Meta:
        verbose_name = "Kateqoriya"
        verbose_name_plural = "Kateqoriyalar"
        ordering = ['name']
    
    def __str__(self):
        return self.name
   
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)
    
class ProjectLink(models.Model):
    name = models.CharField(max_length=200)
    link = models.URLField(max_length=300)
    icon = models.ForeignKey(Icons, on_delete=models.CASCADE)
    project = models.ForeignKey("Project", on_delete=models.CASCADE, related_name="links")

    class Meta:
        verbose_name = "Layihə Linki"
        verbose_name_plural = "Layihə Linkləri"
        
    def __str__(self):
        return f"{self.name} for {self.project.title}"
    
    
class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='projects/', null=True, blank=True)
    categories = models.ManyToManyField(Category, related_name="projects")
    created_at = models.DateTimeField(auto_now_add=True)
    icon = models.ForeignKey(Icons, on_delete=models.CASCADE, null=True, blank=True)
    technologies = models.ManyToManyField("TechnologyTag", related_name="projects", blank=True)
    
    class Meta:
        verbose_name = "Layihə"
        verbose_name_plural = "Layihələr"
        ordering = ['-created_at']
    
    def __str__(self):
        return self.title
    
    
class TechnologyTag(models.Model):
    name = models.CharField("Ad", max_length=100)
    
    class Meta:
        verbose_name = "Texnologiya Tagı"
        verbose_name_plural = "Texnologiya Tagları"
        ordering = ['name'] 
        
    def __str__(self):
        return self.name
    
    