"""
Test settings - uses separate test database to avoid touching real database
"""

from .settings import *
import os

# Use a separate PostgreSQL test database (completely isolated from production)
# pytest-django will create a test database prefixed with 'test_'
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": f"test_{os.getenv('POSTGRES_DB', 'recipefy')}",
        "USER": os.getenv("POSTGRES_USER", "recipefy"),
        "PASSWORD": os.getenv("POSTGRES_PASSWORD", "recipefy"),
        "HOST": os.getenv("POSTGRES_HOST", "postgres"),
        "PORT": os.getenv("POSTGRES_PORT", "5432"),
    }
}

# Disable password hashers for faster tests (optional)
PASSWORD_HASHERS = [
    "django.contrib.auth.hashers.MD5PasswordHasher",
]
