def active_page(request):
    """
    Bütün template-lərə avtomatik active_page context-i əlavə edir
    """
    # URL-ə görə active page-i təyin et
    active_page = None
    path = request.path
    
    if path == '/':
        active_page = 'home'
    elif path.startswith('/about'):
        active_page = 'about'
    elif path.startswith('/projects'):
        active_page = 'projects'
    elif path.startswith('/blog'):
        active_page = 'blog'
    elif path.startswith('/contact'):
        active_page = 'contact'
    
    return {'active_page': active_page}