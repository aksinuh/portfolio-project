# context_processors.py
from apps.pages.home.models import SocialLink

def active_page(request):
    """
    Bütün template-lərə avtomatik active_page context-i əlavə edir
    """
    # URL-ə görə active page-i təyin et
    path = request.path
    
    # Dil prefixini çıxart
    clean_path = path
    for lang_code in ['az', 'en', 'tr', 'ru']:
        if path.startswith(f'/{lang_code}'):
            clean_path = path.replace(f'/{lang_code}', '', 1)
            break
    
    # Clean path-ə görə active page təyin et
    if clean_path == '/' or clean_path == '':
        active_page = 'home'
    elif clean_path.startswith('/about') or '/about' in clean_path:
        active_page = 'about'
    elif clean_path.startswith('/projects') or '/projects' in clean_path:
        active_page = 'projects'
    elif clean_path.startswith('/blog') or '/blog' in clean_path:
        active_page = 'blog'
    elif clean_path.startswith('/contact') or '/contact' in clean_path:
        active_page = 'contact'
    elif '/experience' in clean_path or '#experience' in request.get_full_path():
        active_page = 'experience'
    else:
        active_page = 'home'
    
    return {'active_page': active_page}

def social_links(request):
    return {
        "footer_social_links": SocialLink.objects.select_related("icon").all()
    }
 