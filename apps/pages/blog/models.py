# models.py
from django.db import models
from django.utils import timezone
from django.utils.text import slugify
from django.urls import reverse
import re
from apps.pages.home.models import Icons

class Category(models.Model):
    name = models.CharField(max_length=100, verbose_name="Kateqoriya adı")
    slug = models.SlugField(max_length=100, unique=True)
    

    
    class Meta:
        verbose_name = "Kateqoriya"
        verbose_name_plural = "Kateqoriyalar"
    
    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

class Tag(models.Model):
    name = models.CharField(max_length=50, verbose_name="Teq adı")
    slug = models.SlugField(max_length=50, unique=True)
    
    class Meta:
        verbose_name = "Teq"
        verbose_name_plural = "Teqlər"
    
    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

class BlogPost(models.Model):
    POST_TYPES = [
        ('Backend Development', 'backend' ),
        ('Frontend Development', 'frontend'),
        ('FullStack Development', 'fullstack'),
        ('DevOps', 'devops'),
    ]
    
    title = models.CharField(max_length=200, verbose_name="Başlıq")
    slug = models.SlugField(max_length=200, unique=True)
    content = models.TextField(verbose_name="Məzmun")
    excerpt = models.TextField(max_length=500, verbose_name="Qısa məzmun", blank=True)
    icon = models.ForeignKey(Icons, on_delete=models.SET_NULL, null=True, blank=True, verbose_name="İcon")
    image = models.ImageField(upload_to='blog_images/', null=True, blank=True, verbose_name="Blog şəkli")
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True, verbose_name="Kateqoriya")
    post_type = models.CharField(max_length=50, choices=POST_TYPES, null=True, blank=True, verbose_name="Post Tipi")
    tags = models.ManyToManyField(Tag, blank=True, verbose_name="Teqlər")
    published_date = models.DateTimeField(default=timezone.now, verbose_name="Nəşr tarixi")
    reading_time = models.PositiveIntegerField(default=5, verbose_name="Oxuma müddəti (dəq)")
    is_published = models.BooleanField(default=True, verbose_name="Nəşr edilib")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "Blog Post"
        verbose_name_plural = "Blog Postlar"
        ordering = ['-published_date']
    
    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)
    
    def get_absolute_url(self):
        return reverse('blog_detail', kwargs={'slug': self.slug})
    
    def is_recent(self):
        return (timezone.now() - self.published_date).days <= 7
    
    def extract_headings(self):
        """HTML məzmundan başlıqları avtomatik çıxarır"""
        headings = []
        # h2 başlıqlarını tap
        pattern = r'<h2[^>]*id="([^"]*)"[^>]*>(.*?)</h2>'
        matches = re.findall(pattern, self.content)
        
        for heading_id, heading_text in matches:
            # HTML taglərini təmizlə
            clean_text = re.sub(r'<[^>]*>', '', heading_text).strip()
            headings.append({
                'id': heading_id,
                'text': clean_text
            })
        
        return headings
