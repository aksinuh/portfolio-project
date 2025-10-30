from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    photo_profil = models.ImageField(blank=True, null=True, upload_to='user_profil')
    

    def __str__(self):
        return self.username