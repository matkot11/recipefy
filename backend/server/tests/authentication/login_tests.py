from django.contrib.auth.models import User
from django.test import Client
import pytest
from rest_framework.status import HTTP_200_OK, HTTP_401_UNAUTHORIZED


class TestLogin:
    @pytest.mark.django_db
    def test_login_success(self, client: Client):
        # Given existing user
        user = User.objects.create_user(
            username="testuser",
            email="test@test.com",
            password="testpassword",
        )

        # When user logs in successfully
        response = client.post(
            "/api/auth/login/",
            {
                "email": user.email,
                "password": "testpassword",
            },
        )

        # Then response is successful
        assert response.status_code == HTTP_200_OK
        response_data = response.json()
        assert response_data["user"]["id"] == user.id
        assert response_data["user"]["email"] == user.email
        assert response_data["user"]["username"] == user.username

    @pytest.mark.django_db
    def test_login_invalid_email(self, client: Client):
        # When user logs in with invalid email
        response = client.post(
            "/api/auth/login/",
            {
                "email": "invalid@test.com",
                "password": "testpassword",
            },
        )

        # Then response is unsuccessful
        assert response.status_code == HTTP_401_UNAUTHORIZED
        assert response.json() == {"detail": "Invalid email address"}

    @pytest.mark.django_db
    def test_login_invalid_password(self, client: Client):
        # Given existing user
        User.objects.create_user(
            username="testuser",
            email="test@test.com",
            password="testpassword",
        )
        response = client.post(
            "/api/auth/login/",
            {
                "email": "test@test.com",
                "password": "invalidpassword",
            },
        )
        assert response.status_code == HTTP_401_UNAUTHORIZED
        assert response.json() == {"detail": "Invalid email or password"}
