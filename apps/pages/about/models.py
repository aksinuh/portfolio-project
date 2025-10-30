from django.db import models


class Contact(models.Model):
    STATUS_CHOICES = [
        ('new', 'Yeni'),
        ('read', 'Oxundu'), 
        ('replied', 'Cavablandı'),
        ('spam', 'Spam'),
    ]
    
    name = models.CharField(max_length=100, verbose_name="Ad")
    email = models.EmailField(verbose_name="E-poçt")
    subject = models.CharField(max_length=200, verbose_name="Mövzu")
    message = models.TextField(verbose_name="Mesaj")
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='new', verbose_name="Status")
    ip_address = models.GenericIPAddressField(null=True, blank=True, verbose_name="IP Ünvanı")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Göndərilmə Tarixi")
    
    class Meta:
        verbose_name = "Kontakt Mesajı"
        verbose_name_plural = "Kontakt Mesajları"
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.name} - {self.subject}"
