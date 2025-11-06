# management/commands/load_icons.py
from django.core.management.base import BaseCommand
from apps.pages.home.models import Icons

class Command(BaseCommand):
    help = 'Font Awesome iconlarını veritabanına yükler'
    
    def handle(self, *args, **options):
        icons_data = [
            {"name": "Python", "svg_code": "fab fa-python"},
            {"name": "JavaScript", "svg_code": "fab fa-js-square"},
            {"name": "Java", "svg_code": "fab fa-java"},
            {"name": "HTML5", "svg_code": "fab fa-html5"},
            {"name": "CSS3", "svg_code": "fab fa-css3-alt"},
            {"name": "React", "svg_code": "fab fa-react"},
            {"name": "Angular", "svg_code": "fab fa-angular"},
            {"name": "Vue.js", "svg_code": "fab fa-vuejs"},
            {"name": "Node.js", "svg_code": "fab fa-node-js"},
            {"name": "PHP", "svg_code": "fab fa-php"},
            {"name": "GitHub", "svg_code": "fab fa-github"},
            {"name": "GitLab", "svg_code": "fab fa-gitlab"},
            {"name": "Docker", "svg_code": "fab fa-docker"},
            {"name": "AWS", "svg_code": "fab fa-aws"},
            {"name": "Google", "svg_code": "fab fa-google"},
            {"name": "Microsoft", "svg_code": "fab fa-microsoft"},
            {"name": "Apple", "svg_code": "fab fa-apple"},
            {"name": "Android", "svg_code": "fab fa-android"},
            {"name": "Facebook", "svg_code": "fab fa-facebook-f"},
            {"name": "Twitter", "svg_code": "fab fa-twitter"},
            {"name": "Instagram", "svg_code": "fab fa-instagram"},
            {"name": "LinkedIn", "svg_code": "fab fa-linkedin-in"},
            {"name": "YouTube", "svg_code": "fab fa-youtube"},
            {"name": "WhatsApp", "svg_code": "fab fa-whatsapp"},
            {"name": "Telegram", "svg_code": "fab fa-telegram"},
            {"name": "Discord", "svg_code": "fab fa-discord"},
            {"name": "Home", "svg_code": "fas fa-home"},
            {"name": "User", "svg_code": "fas fa-user"},
            {"name": "Email", "svg_code": "fas fa-envelope"},
            {"name": "Phone", "svg_code": "fas fa-phone"},
            {"name": "Search", "svg_code": "fas fa-search"},
            {"name": "Menu", "svg_code": "fas fa-bars"},
            {"name": "Heart", "svg_code": "fas fa-heart"},
            {"name": "Star", "svg_code": "fas fa-star"},
            {"name": "Add", "svg_code": "fas fa-plus"},
            {"name": "Edit", "svg_code": "fas fa-edit"},
            {"name": "Delete", "svg_code": "fas fa-trash"},
            {"name": "Save", "svg_code": "fas fa-save"},
            {"name": "Download", "svg_code": "fas fa-download"},
            {"name": "Upload", "svg_code": "fas fa-upload"},
        ]
        
        for icon_data in icons_data:
            Icons.objects.get_or_create(
                name=icon_data["name"],
                defaults={'svg_code': icon_data["svg_code"]}
            )
        
        self.stdout.write(
                self.style.SUCCESS(f'{len(icons_data)} icon başarıyla eklendi!')
        )