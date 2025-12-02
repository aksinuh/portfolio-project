from modeltranslation.translator import TranslationOptions,register
from apps.pages.home.models import About, Experience


@register(About)
class AboutTranslationOptions(TranslationOptions):
    fields = ('content',)



@register(Experience)
class ExperienceTranslationOptions(TranslationOptions):
    fields = ("job_title", "end_date", "description")