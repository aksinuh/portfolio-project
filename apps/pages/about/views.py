from django.views.generic import FormView
from django.urls import reverse_lazy
from django.http import JsonResponse
from .forms import ContactForm
from django.contrib import messages
from .models import ContactInfo
from apps.pages.home.models import SocialLink

class ContactView(FormView):
    template_name = "about/contact.html"
    form_class = ContactForm
    success_url = reverse_lazy('contact')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['contact_info'] = ContactInfo.objects.first()
        context['social_links'] = SocialLink.objects.all()
        return context

    def form_valid(self, form):
        contact = form.save(commit=False)
        contact.ip_address = self.request.META.get("REMOTE_ADDR")
        contact.save()
        return JsonResponse({
                'success': True,
                'message': 'Mesajınız uğurla göndərildi! 24 saat ərzində sizə cavab verəcəyəm.'
            })

    def form_invalid(self, form):
        return JsonResponse({"success": False, "errors": form.errors}, status=400)