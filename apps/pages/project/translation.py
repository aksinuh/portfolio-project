from modeltranslation.translator import TranslationOptions,register
from apps.pages.project.models import Project


@register(Project)
class ProjectTranslationOptions(TranslationOptions):
    fields = ('title', 'description',)