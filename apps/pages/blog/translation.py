from modeltranslation.translator import TranslationOptions,register
from apps.pages.blog.models import BlogPost

@register(BlogPost)
class BlogPostTranslationOptions(TranslationOptions):
    fields = ('title', 'excerpt', 'content')