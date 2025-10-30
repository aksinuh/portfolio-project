from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class HomePage(models.Model):
    title = models.ForeignKey("TypingText", on_delete=models.CASCADE)
    icon = models.ForeignKey("Icons", on_delete=models.CASCADE)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    
    def __str__(self):
        return f"{self.title} by {self.author.username}"
    
    
class TypingText(models.Model):
    text = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)
    
    def __str__(self):
        return self.text
    
    
class SocialLink(models.Model):
    name = models.CharField(max_length=50)
    url = models.URLField(max_length=200)
    icon = models.ForeignKey("Icons", on_delete=models.CASCADE) 
    
    
class Icons(models.Model):
    name = models.CharField(max_length=50)
    svg_code = models.TextField()
    
    def __str__(self):
        return self.name
    
    
class About(models.Model):
    content = models.TextField()
    projects_count = models.IntegerField(default=0)
    clients_count = models.IntegerField(default=0)
    years_experience = models.IntegerField(default=0)
    
    def __str__(self):
        return f"About Section with {self.years_experience} years experience"


class CodeDeveloper(models.Model):
    name = models.CharField(max_length=100)
    skills = models.TextField()
    experience = models.TextField()
    passion = models.TextField()
    about = models.TextField()
    
    def __str__(self):
        return self.name
    

class SkillsCategory(models.Model):
    name = models.CharField(max_length=100)
    icon = models.ForeignKey("Icons", on_delete=models.CASCADE)
    
    def __str__(self):
        return self.name


class Skill(models.Model):
    category = models.ForeignKey(SkillsCategory, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    
    def __str__(self):
        return f"{self.name} in {self.category.name}"


class Experience(models.Model):
    job_title = models.CharField(max_length=100)
    company = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.TextField()
    description = models.TextField()
    location = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.job_title} at {self.company}"