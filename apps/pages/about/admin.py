from django.contrib import admin
from django.utils.html import format_html
from django.urls import reverse

from .models import Contact, ContactInfo


@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    # Siyahı konfiqi
    list_display = [
        'name',
        'email_link', 
        'subject_short',
        'status_badge',
        'created_time',
        'quick_actions',
    ]
    
    list_filter = ['status', 'created_at']
    search_fields = ['name', 'email', 'subject', 'message']
    readonly_fields = [ 'ip_address', 'created_at']
    list_per_page = 25
    
    # Fieldsets
    fieldsets = (
        ('MESAJ MƏLUMATLARI', {
            'fields': ('name', 'email', 'subject', 'message')
        }),
        ('STATUS Və META', {
            'fields': ('status', 'ip_address', 'created_at')
        }),
    )
    
    # Fəaliyyətlər
    actions = ['mark_as_read', 'mark_as_replied', 'mark_as_spam']
    
    def mark_as_read(self, request, queryset):
        updated = queryset.update(status='read')
        self.message_user(request, f'📖 {updated} mesaj oxundu olaraq işarələndi')
    mark_as_read.short_description = "Seçilmişləri OXUNDU et"
    
    def mark_as_replied(self, request, queryset):
        updated = queryset.update(status='replied')
        self.message_user(request, f'📧 {updated} mesaj cavablandı olaraq işarələndi')
    mark_as_replied.short_description = "Seçilmişləri CAVABLANDI et"
    
    def mark_as_spam(self, request, queryset):
        updated = queryset.update(status='spam')
        self.message_user(request, f'🚫 {updated} mesaj spam olaraq işarələndi')
    mark_as_spam.short_description = "Seçilmişləri SPAM et"
    
    # Custom sütunlar
    def email_link(self, obj):
        return format_html(
            '<a href="mailto:{}">{}</a>',
            obj.email, obj.email
        )
    email_link.short_description = 'E-POÇT'
    
    def subject_short(self, obj):
        return obj.subject[:50] + ('...' if len(obj.subject) > 50 else '')
    subject_short.short_description = 'MÖVZU'
    
    def status_badge(self, obj):
        colors = {
            'new': 'blue',
            'read': 'green',
            'replied': 'purple', 
            'spam': 'red'
        }
        texts = {
            'new': 'YENİ',
            'read': 'OXUNDU',
            'replied': 'CAVABLANDI',
            'spam': 'SPAM'
        }
        return format_html(
            '<span style="background: {}; color: white; padding: 3px 8px; border-radius: 10px; font-size: 11px;">{}</span>',
            colors.get(obj.status, 'gray'),
            texts.get(obj.status, 'UNKNOWN')
        )
    status_badge.short_description = 'STATUS'
    
    def created_time(self, obj):
        return obj.created_at.strftime('%H:%M / %d.%m.%Y')
    created_time.short_description = 'TARİX/SAAT'
    
    
    def quick_actions(self, obj):
        # ✅ DÜZƏLDİ: Dynamic URL istifadə et
        try:
            app_label = obj._meta.app_label  # 'pages' və ya 'portfolio'
            model_name = obj._meta.model_name  # 'contact'
            
            change_url = reverse(f'admin:{app_label}_{model_name}_change', args=[obj.pk])
            
            return format_html(
                '<a href="{}" style="background: #2196F3; color: white; padding: 4px 8px; text-decoration: none; border-radius: 4px; font-size: 12px;">BAX</a>',
                change_url
            )
        except:
            return "URL tapılmadı"
    quick_actions.short_description = 'ƏMƏLİYYAT'
    

@admin.register(ContactInfo)
class ContactInfoAdmin(admin.ModelAdmin):
    list_display = ['phone', 'email', 'address_short']
    search_fields = ['phone', 'email', 'address']
    
    def address_short(self, obj):
        return obj.address[:50] + ('...' if len(obj.address) > 50 else '')
    address_short.short_description = 'ÜNVAN'