from django.shortcuts import render
from django.views.generic import TemplateView, DetailView
from apps.pages.project.models import Project
from apps.pages.blog.models import BlogPost
from .forms import ContactForm
from apps.pages.about.models import ContactInfo
from django.http import JsonResponse

from .models import (
    HomePage, TypingText, SocialLink,
    Icons, About, CodeDeveloper, SkillsCategory,
    Skill, Experience
    )


class HomePageView(TemplateView):
    template_name = "home/index.html"
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["about"] = About.objects.first()
        context["code_developer"] = CodeDeveloper.objects.first()
        context["skills_categories"] = SkillsCategory.objects.all()
        context["projects"] = Project.objects.all().order_by('-created_at')[:3]
        context["blog_posts"] = BlogPost.objects.all().order_by('-created_at')[:3]
        context["experience"] = Experience.objects.all().order_by('-start_date')
        context["contact_form"] = ContactForm()
        context['contact_info'] = ContactInfo.objects.first()
        
        return context
    
    def post(self, request, *args, **kwargs):
        form = ContactForm(request.POST)

        if form.is_valid():
            contact = form.save(commit=False)
            contact.ip_address = self.request.META.get("REMOTE_ADDR")
            contact.save()
            # Əgər AJAX sorğusudur (fetch), JSON cavab qaytar
            if request.headers.get('x-requested-with') == 'XMLHttpRequest':
                return JsonResponse({
                    'success': True,
                    'message': "Mesajınız uğurla göndərildi! Təşəkkürlər."
                })
        else:
            if request.headers.get('x-requested-with') == 'XMLHttpRequest':
                return JsonResponse({
                    'success': False,
                    'errors': form.errors
                }, status=400)
        
        # Əgər AJAX deyil (adi form göndərilibsə), normal cavab
        context = self.get_context_data()
        context["contact_form"] = form
        return self.render_to_response(context)
    
    
def custom_404(request, exception):
    return render(request, '404.html', status=404)


def custom_500(request):
    return render(request, '500.html', status=500)


