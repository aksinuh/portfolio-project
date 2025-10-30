from django.contrib import admin
from django.urls import reverse
from django.utils.html import format_html
from django import forms
from .models import (
    HomePage, TypingText, SocialLink, Icons, 
    About, CodeDeveloper, SkillsCategory, Skill, Experience
)


# === INLINE ADMIN CLASSES ===

class SocialLinkInline(admin.TabularInline):
    model = SocialLink
    extra = 1
    fields = ['name', 'url', 'icon']
    classes = ['collapse']


# === CUSTOM FILTERS ===

class ActiveStatusFilter(admin.SimpleListFilter):
    title = 'Aktivlik Statusu'
    parameter_name = 'is_active'
    
    def lookups(self, request, model_admin):
        return (
            ('active', 'Aktiv'),
            ('inactive', 'Deaktiv'),
        )
    
    def queryset(self, request, queryset):
        if self.value() == 'active':
            return queryset.filter(is_active=True)
        if self.value() == 'inactive':
            return queryset.filter(is_active=False)


# === CUSTOM FORMS ===

class HomePageForm(forms.ModelForm):
    class Meta:
        model = HomePage
        fields = '__all__'
        widgets = {
            'title': forms.Select(attrs={'class': 'vSelect'}),
            'icon': forms.Select(attrs={'class': 'vSelect'}),
        }


class AboutForm(forms.ModelForm):
    class Meta:
        model = About
        fields = '__all__'
        widgets = {
            'content': forms.Textarea(attrs={'rows': 6, 'cols': 80}),
        }


class CodeDeveloperForm(forms.ModelForm):
    class Meta:
        model = CodeDeveloper
        fields = '__all__'
        widgets = {
            'skills': forms.Textarea(attrs={'rows': 3}),
            'experience': forms.Textarea(attrs={'rows': 3}),
            'passion': forms.Textarea(attrs={'rows': 3}),
            'about': forms.Textarea(attrs={'rows': 4}),
        }


# === ADMIN CLASSES ===

@admin.register(HomePage)
class HomePageAdmin(admin.ModelAdmin):
    form = HomePageForm
    list_display = [
        'title_preview', 
        'author_name', 
        'icon_preview',
        'created_info',
        'admin_actions'
    ]
    
    fieldsets = (
        ('ƏSAS MƏLUMATLAR', {
            'fields': ('title', 'icon', 'author'),
            'description': 'Əsas səhifənin əsas konfiqurasiyası'
        }),
    )
    
    def title_preview(self, obj):
        return format_html(
            '<strong>{}</strong>',
            obj.title.text if obj.title else '-'
        )
    title_preview.short_description = 'BAŞLIQ'
    
    def author_name(self, obj):
        return obj.author.username if obj.author else '-'
    author_name.short_description = 'İSTİFADƏÇİ'
    
    def icon_preview(self, obj):
        if obj.icon and obj.icon.svg_code:
            return format_html(
                '<div title="{}">{}</div>',
                obj.icon.name,
                obj.icon.svg_code
            )
        return '-'
    icon_preview.short_description = 'İCON'
    
    def created_info(self, obj):
        return "Yaradılıb"
    created_info.short_description = 'STATUS'
    
    def admin_actions(self, obj):
        app_label = obj._meta.app_label
        model_name = obj._meta.model_name
        change_url = reverse(f'admin:{app_label}_{model_name}_change', args=[obj.pk])
        
        return format_html(
            '''
            <div style="display: flex; gap: 5px;">
                <a href="{}" style="background: #2196F3; color: white; padding: 4px 8px; text-decoration: none; border-radius: 4px; font-size: 11px;">DÜZƏLT</a>
            </div>
            ''',
            change_url
        )
    admin_actions.short_description = 'ƏMƏLİYYATLAR'
    
    def has_add_permission(self, request):
        # Yalnız bir HomePage ola bilər
        return not HomePage.objects.exists()


@admin.register(TypingText)
class TypingTextAdmin(admin.ModelAdmin):
    list_display = [
        'text_preview',
        'is_active',
        'created_date',
        'character_count',
        'admin_actions'
    ]
    list_editable = ['is_active']
    list_filter = [ActiveStatusFilter]
    search_fields = ['text']
    list_per_page = 20
    
    fieldsets = (
        ('TYPING TEXT AYARLARI', {
            'fields': ('text', 'is_active'),
            'description': 'Hero bölməsində görünəcək yazılar'
        }),
    )
    
    def text_preview(self, obj):
        color = 'green' if obj.is_active else '#999'
        return format_html(
            '<span style="color: {}; font-weight: bold;">{}</span>',
            color, obj.text
        )
    text_preview.short_description = 'MƏTN'
    
    def active_badge(self, obj):
        return obj.is_active
    active_badge.boolean = True
    active_badge.short_description = 'AKTİV'
    
    def created_date(self, obj):
        return "Həmişə"
    created_date.short_description = 'YARADILMA'
    
    def character_count(self, obj):
        return len(obj.text)
    character_count.short_description = 'UZUNLUQ'
    
    def admin_actions(self, obj):
        app_label = obj._meta.app_label
        model_name = obj._meta.model_name
        change_url = reverse(f'admin:{app_label}_{model_name}_change', args=[obj.pk])
        delete_url = reverse(f'admin:{app_label}_{model_name}_delete', args=[obj.pk])
        
        return format_html(
            '''
            <div style="display: flex; gap: 5px;">
                <a href="{}" style="background: #2196F3; color: white; padding: 4px 8px; text-decoration: none; border-radius: 4px; font-size: 11px;">DÜZƏLT</a>
                <a href="{}" style="background: #f44336; color: white; padding: 4px 8px; text-decoration: none; border-radius: 4px; font-size: 11px;">SİL</a>
            </div>
            ''',
            change_url, delete_url
        )
    admin_actions.short_description = 'ƏMƏLİYYATLAR'


@admin.register(SocialLink)
class SocialLinkAdmin(admin.ModelAdmin):
    list_display = [
        'name',
        'url_link',
        'icon_name',
        'admin_actions'
    ]
    list_filter = ['icon']
    search_fields = ['name', 'url']
    
    def url_link(self, obj):
        return format_html(
            '<a href="{}" target="_blank">{}</a>',
            obj.url, obj.url
        )
    url_link.short_description = 'LİNK'
    
    def icon_name(self, obj):
        return obj.icon.name if obj.icon else '-'
    icon_name.short_description = 'İCON'
    
    def admin_actions(self, obj):
        app_label = obj._meta.app_label
        model_name = obj._meta.model_name
        change_url = reverse(f'admin:{app_label}_{model_name}_change', args=[obj.pk])
        delete_url = reverse(f'admin:{app_label}_{model_name}_delete', args=[obj.pk])
        
        return format_html(
            '''
            <div style="display: flex; gap: 5px;">
                <a href="{}" style="background: #2196F3; color: white; padding: 4px 8px; text-decoration: none; border-radius: 4px; font-size: 11px;">DÜZƏLT</a>
                <a href="{}" style="background: #f44336; color: white; padding: 4px 8px; text-decoration: none; border-radius: 4px; font-size: 11px;">SİL</a>
            </div>
            ''',
            change_url, delete_url
        )
    admin_actions.short_description = 'ƏMƏLİYYATLAR'


@admin.register(Icons)
class IconsAdmin(admin.ModelAdmin):
    list_display = [
        'name',
        'svg_preview',
        'usage_count',
        'admin_actions'
    ]
    search_fields = ['name']
    readonly_fields = ['usage_count']
    
    def svg_preview(self, obj):
        if obj.svg_code:
            return format_html(
                '<div style="width: 30px; height: 30px;">{}</div>',
                obj.svg_code
            )
        return '-'
    svg_preview.short_description = 'İCON ÖN BAXIŞ'
    
    def usage_count(self, obj):
        social_count = SocialLink.objects.filter(icon=obj).count()
        skill_count = SkillsCategory.objects.filter(icon=obj).count()
        home_count = HomePage.objects.filter(icon=obj).count()
        return social_count + skill_count + home_count
    usage_count.short_description = 'İSTİFADƏ SAYI'
    
    def admin_actions(self, obj):
        app_label = obj._meta.app_label
        model_name = obj._meta.model_name
        change_url = reverse(f'admin:{app_label}_{model_name}_change', args=[obj.pk])
        delete_url = reverse(f'admin:{app_label}_{model_name}_delete', args=[obj.pk])
        
        return format_html(
            '''
            <div style="display: flex; gap: 5px;">
                <a href="{}" style="background: #2196F3; color: white; padding: 4px 8px; text-decoration: none; border-radius: 4px; font-size: 11px;">DÜZƏLT</a>
                <a href="{}" style="background: #f44336; color: white; padding: 4px 8px; text-decoration: none; border-radius: 4px; font-size: 11px;">SİL</a>
            </div>
            ''',
            change_url, delete_url
        )
    admin_actions.short_description = 'ƏMƏLİYYATLAR'


@admin.register(About)
class AboutAdmin(admin.ModelAdmin):
    form = AboutForm
    list_display = [
        'content_preview',
        'stats_summary',
        'admin_actions'
    ]
    
    fieldsets = (
        ('MƏZMUN', {
            'fields': ('content',),
            'description': 'Haqqımda məzmunu'
        }),
        ('STATİSTİKALAR', {
            'fields': ('projects_count', 'clients_count', 'years_experience'),
            'description': 'Statistik məlumatlar'
        }),
    )
    
    def content_preview(self, obj):
        preview = obj.content[:100] + '...' if len(obj.content) > 100 else obj.content
        return format_html('<div>{}</div>', preview)
    content_preview.short_description = 'MƏZMUN'
    
    def stats_summary(self, obj):
        return format_html(
            '📊 {} layihə | 👥 {} müştəri | ⏳ {} il təcrübə',
            obj.projects_count, obj.clients_count, obj.years_experience
        )
    stats_summary.short_description = 'STATİSTİKA'
    
    def admin_actions(self, obj):
        app_label = obj._meta.app_label
        model_name = obj._meta.model_name
        change_url = reverse(f'admin:{app_label}_{model_name}_change', args=[obj.pk])
        
        return format_html(
            '<a href="{}" style="background: #2196F3; color: white; padding: 4px 8px; text-decoration: none; border-radius: 4px; font-size: 11px;">DÜZƏLT</a>',
            change_url
        )
    admin_actions.short_description = 'ƏMƏLİYYATLAR'
    
    def has_add_permission(self, request):
        return not About.objects.exists()


@admin.register(CodeDeveloper)
class CodeDeveloperAdmin(admin.ModelAdmin):
    form = CodeDeveloperForm
    list_display = [
        'name',
        'skills_preview',
        'experience_preview',
        'admin_actions'
    ]
    search_fields = ['name', 'skills', 'experience']
    
    fieldsets = (
        ('ƏSAS MƏLUMATLAR', {
            'fields': ('name', 'about'),
            'description': 'Əsas məlumatlar'
        }),
        ('BACARIQLAR Və TƏCRÜBƏ', {
            'fields': ('skills', 'experience', 'passion'),
            'description': 'Texniki bacarıqlar və təcrübə'
        }),
    )
    
    def skills_preview(self, obj):
        preview = obj.skills[:80] + '...' if len(obj.skills) > 80 else obj.skills
        return format_html('<div>{}</div>', preview)
    skills_preview.short_description = 'BACARIQLAR'
    
    def experience_preview(self, obj):
        preview = obj.experience[:80] + '...' if len(obj.experience) > 80 else obj.experience
        return format_html('<div>{}</div>', preview)
    experience_preview.short_description = 'TƏCRÜBƏ'
    
    def admin_actions(self, obj):
        app_label = obj._meta.app_label
        model_name = obj._meta.model_name
        change_url = reverse(f'admin:{app_label}_{model_name}_change', args=[obj.pk])
        delete_url = reverse(f'admin:{app_label}_{model_name}_delete', args=[obj.pk])
        
        return format_html(
            '''
            <div style="display: flex; gap: 5px;">
                <a href="{}" style="background: #2196F3; color: white; padding: 4px 8px; text-decoration: none; border-radius: 4px; font-size: 11px;">DÜZƏLT</a>
                <a href="{}" style="background: #f44336; color: white; padding: 4px 8px; text-decoration: none; border-radius: 4px; font-size: 11px;">SİL</a>
            </div>
            ''',
            change_url, delete_url
        )
    admin_actions.short_description = 'ƏMƏLİYYATLAR'


class SkillInline(admin.TabularInline):
    model = Skill
    extra = 1
    fields = ['name']
    classes = ['collapse']


@admin.register(SkillsCategory)
class SkillsCategoryAdmin(admin.ModelAdmin):
    list_display = [
        'name',
        'icon_preview',
        'skills_count',
        'admin_actions'
    ]
    inlines = [SkillInline]
    list_filter = ['icon']
    
    def icon_preview(self, obj):
        if obj.icon and obj.icon.svg_code:
            return format_html(
                '<div style="width: 24px; height: 24px;" title="{}">{}</div>',
                obj.icon.name,
                obj.icon.svg_code
            )
        return '-'
    icon_preview.short_description = 'İCON'
    
    def skills_count(self, obj):
        return obj.skill_set.count()
    skills_count.short_description = 'BACARIQ SAYI'
    
    def admin_actions(self, obj):
        app_label = obj._meta.app_label
        model_name = obj._meta.model_name
        change_url = reverse(f'admin:{app_label}_{model_name}_change', args=[obj.pk])
        delete_url = reverse(f'admin:{app_label}_{model_name}_delete', args=[obj.pk])
        
        return format_html(
            '''
            <div style="display: flex; gap: 5px;">
                <a href="{}" style="background: #2196F3; color: white; padding: 4px 8px; text-decoration: none; border-radius: 4px; font-size: 11px;">DÜZƏLT</a>
                <a href="{}" style="background: #f44336; color: white; padding: 4px 8px; text-decoration: none; border-radius: 4px; font-size: 11px;">SİL</a>
            </div>
            ''',
            change_url, delete_url
        )
    admin_actions.short_description = 'ƏMƏLİYYATLAR'


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = [
        'name',
        'category_name',
        'admin_actions'
    ]
    list_filter = ['category']
    search_fields = ['name', 'category__name']
    
    def category_name(self, obj):
        return obj.category.name
    category_name.short_description = 'KATEQORİYA'
    
    def admin_actions(self, obj):
        app_label = obj._meta.app_label
        model_name = obj._meta.model_name
        change_url = reverse(f'admin:{app_label}_{model_name}_change', args=[obj.pk])
        delete_url = reverse(f'admin:{app_label}_{model_name}_delete', args=[obj.pk])
        
        return format_html(
            '''
            <div style="display: flex; gap: 5px;">
                <a href="{}" style="background: #2196F3; color: white; padding: 4px 8px; text-decoration: none; border-radius: 4px; font-size: 11px;">DÜZƏLT</a>
                <a href="{}" style="background: #f44336; color: white; padding: 4px 8px; text-decoration: none; border-radius: 4px; font-size: 11px;">SİL</a>
            </div>
            ''',
            change_url, delete_url
        )
    admin_actions.short_description = 'ƏMƏLİYYATLAR'


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = [
        'job_title',
        'company_name',
        'duration',
        'location',
        'admin_actions'
    ]
    list_filter = ['company', 'location']
    search_fields = ['job_title', 'company', 'description']
    
    fieldsets = (
        ('ƏSAS MƏLUMATLAR', {
            'fields': ('job_title', 'company', 'location'),
            'description': 'İş yeri məlumatları'
        }),
        ('TARİXLƏR', {
            'fields': ('start_date', 'end_date'),
            'description': 'İşə başlama və bitirmə tarixləri'
        }),
        ('TƏSVİR', {
            'fields': ('description',),
            'description': 'İş təsviri və vəzifələr'
        }),
    )
    
    def company_name(self, obj):
        return obj.company
    company_name.short_description = 'ŞİRKƏT'
    
    def duration(self, obj):
        return f"{obj.start_date} - {obj.end_date}"
    duration.short_description = 'MÜDDƏT'
    
    def admin_actions(self, obj):
        app_label = obj._meta.app_label
        model_name = obj._meta.model_name
        change_url = reverse(f'admin:{app_label}_{model_name}_change', args=[obj.pk])
        delete_url = reverse(f'admin:{app_label}_{model_name}_delete', args=[obj.pk])
        
        return format_html(
            '''
            <div style="display: flex; gap: 5px;">
                <a href="{}" style="background: #2196F3; color: white; padding: 4px 8px; text-decoration: none; border-radius: 4px; font-size: 11px;">DÜZƏLT</a>
                <a href="{}" style="background: #f44336; color: white; padding: 4px 8px; text-decoration: none; border-radius: 4px; font-size: 11px;">SİL</a>
            </div>
            ''',
            change_url, delete_url
        )
    admin_actions.short_description = 'ƏMƏLİYYATLAR'


# Admin site konfiqurasiyası
admin.site.site_header = "🚀 Portfolio Admin Paneli"
admin.site.site_title = "Portfolio Administration"
admin.site.index_title = "📊 İdarəetmə Panelinə Xoş Gəlmisiniz"
