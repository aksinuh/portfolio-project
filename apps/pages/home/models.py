from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class HomePage(models.Model):
    title = models.ForeignKey("TypingText", on_delete=models.CASCADE)
    icon = models.ForeignKey("Icons", on_delete=models.CASCADE)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    
    class Meta:
        verbose_name = "Ana Səhifə"
        verbose_name_plural = "Ana Səhifələr"
        
    def __str__(self):
        return f"{self.title} by {self.author.username}"
    
    
class TypingText(models.Model):
    text = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        verbose_name = "Yazı Tipi Mətn"
        verbose_name_plural = "Yazı Tipi Mətnlər"
        ordering = ['text']
        
    def __str__(self):
        return self.text
    
    
class SocialLink(models.Model):
    name = models.CharField(max_length=50)
    url = models.URLField(max_length=200)
    icon = models.ForeignKey("Icons", on_delete=models.CASCADE) 
    
    class Meta:
        verbose_name = "Sosial Link"
        verbose_name_plural = "Sosial Linklər"
        ordering = ['name']
        
    def __str__(self):
        return self.name
    
    
class Icons(models.Model):
    name = models.CharField(max_length=50)
    svg_code = models.TextField()
    
    class Meta:
        verbose_name = "İcon"
        verbose_name_plural = "İconlar"
        ordering = ['name']
        
    def __str__(self):
        return self.name
    
    
class About(models.Model):
    content = models.TextField()
    projects_count = models.IntegerField(default=0)
    clients_count = models.IntegerField(default=0)
    years_experience = models.IntegerField(default=0)
    
    class Meta:
        verbose_name = "Haqqında Bölmə"
        verbose_name_plural = "Haqqında Bölmələr"
        
    def __str__(self):
        return f"About Section with {self.years_experience} years experience"


class CodeDeveloper(models.Model):
    name = models.CharField(max_length=100)
    skills = models.TextField()
    experience = models.TextField()
    passion = models.TextField()
    about = models.TextField()
    
    class Meta:
        verbose_name = "Kod Tərtibatçısı"
        verbose_name_plural = "Kod Tərtibatçıları"
        
    def __str__(self):
        return self.name
    

class SkillsCategory(models.Model):
    name = models.CharField(max_length=100)
    icon = models.ForeignKey("Icons", on_delete=models.CASCADE)
    
    class Meta:
        verbose_name = "Bacarıq Kateqoriyası"
        verbose_name_plural = "Bacarıq Kateqoriyaları"
        ordering = ['name']
        
    def __str__(self):
        return self.name


class Skill(models.Model):
    category = models.ForeignKey(SkillsCategory, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    
    class Meta:
        verbose_name = "Bacarıq"
        verbose_name_plural = "Bacarıqlar"
        ordering = ['name']
        
    def __str__(self):
        return f"{self.name} in {self.category.name}"


class Experience(models.Model):
    job_title = models.CharField(max_length=100)
    company = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.TextField()
    description = models.TextField()
    location = models.CharField(max_length=100)

    class Meta:
        verbose_name = "Təcrübə"
        verbose_name_plural = "Təcrübələr"
        ordering = ['-start_date']
        
    def __str__(self):
        return f"{self.job_title} at {self.company}"