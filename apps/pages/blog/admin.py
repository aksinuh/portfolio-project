# admin.py
from django.contrib import admin
from django import forms
from django.db import models
from .models import Category, Tag, BlogPost
from modeltranslation.admin import TranslationAdmin


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug']
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ['name']

@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug']
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ['name']

@admin.register(BlogPost)
class BlogPostAdmin(TranslationAdmin):
    list_display = ['title', 'post_type', 'category', 'published_date', 'is_published', 'reading_time']
    list_filter = ['post_type', 'category', 'is_published', 'published_date']
    search_fields = ['title', 'content', 'excerpt']
    prepopulated_fields = {'slug': ('title',)}
    filter_horizontal = ['tags']
    date_hierarchy = 'published_date'
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('Əsas Məlumatlar', {
            'fields': ('title', 'slug', 'content', 'excerpt')
        }),
        ('Kateqoriya və Teqlər', {
            'fields': ('category', 'post_type', 'tags', 'icon', 'image')
        }),
        ('Tarix və Status', {
            'fields': ('published_date', 'reading_time', 'is_published')
        }),
        ('Sistem Məlumatları', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    class Media:
        js = (
                'http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js',
                'http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.2/jquery-ui.min.js',
                'modeltranslation/js/tabbed_translation_fields.js',
            )
        css = {
                'screen': ('modeltranslation/css/tabbed_translation_fields.css',),
            }
