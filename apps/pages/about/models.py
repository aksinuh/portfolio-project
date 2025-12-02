from django.db import models


class Contact(models.Model):
    STATUS_CHOICES = [
        ('new', 'Yeni'),
        ('read', 'Oxundu'), 
        ('replied', 'Cavablandı'),
        ('spam', 'Spam'),
    ]
    project_type = [
        ("Web Development", "Web Development"),
        ("Backend Development", "Backend Development"),
        ("API Development", "API Development"),
        ("Consultation", "Consultation"),
        ("Other", "Other")
    ]
    
    name = models.CharField(max_length=100, verbose_name="Ad")
    email = models.EmailField(verbose_name="E-poçt")
    subject = models.CharField(max_length=200, verbose_name="Mövzu")
    message = models.TextField(verbose_name="Mesaj")
    project_type = models.CharField(max_length=50, choices=project_type, verbose_name="Layihə Növü", null=True, blank=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='new', verbose_name="Status")
    ip_address = models.GenericIPAddressField(null=True, blank=True, verbose_name="IP Ünvanı")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Göndərilmə Tarixi")
    
    class Meta:
        verbose_name = "Kontakt Mesajı"
        verbose_name_plural = "Kontakt Mesajları"
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.name} - {self.subject}"


class ContactInfo(models.Model):
    phone = models.CharField(max_length=20, verbose_name="Telefon Nömrəsi")
    email = models.EmailField(verbose_name="E-poçt")
    address = models.TextField(verbose_name="Ünvan")
    class Meta:
        verbose_name = "Əlaqə Məlumatı"
        verbose_name_plural = "Əlaqə Məlumatları"
    
    def __str__(self):
        return f"Əlaqə Məlumatı - {self.email}" 