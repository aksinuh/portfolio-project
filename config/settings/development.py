from .base import *
from decouple import config
from .base import *
import os
import dj_database_url


DEBUG = config("DEBUG", default=True, cast=bool)

ALLOWED_HOSTS = ["aksinh.info", "www.aksinh.info", "localhost", "127.0.0.1"]


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv('POSTGRES_DB', 'AksinhDB'),
        'USER': os.getenv('POSTGRES_USER', 'AksinhUser'),
        'PASSWORD': os.getenv('POSTGRES_PASSWORD', 'Aksinh1192037'),
        'HOST': os.getenv('POSTGRES_HOST', 'localhost'),
        'PORT': os.getenv('POSTGRES_PORT', '5433'),
    }
}


EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

