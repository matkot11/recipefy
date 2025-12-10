from django.contrib.auth.models import User
from django.test import Client
import pytest
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST


class TestRegister:
    @pytest.mark.django_db
    def test_register_success(self, client: Client):
        # When user registers successfully
        response = client.post(
            "/api/auth/register/",
            {
                "email": "test@test.com",
                "username": "testuser",
                "password": "testpassword",
                "password_confirmation": "testpassword",
            },
        )

        # Then response is successful
        assert response.status_code == HTTP_200_OK
        response_data = response.json()
        assert response_data["detail"] == "User registered successfully"

    @pytest.mark.django_db
    def test_register_email_already_exists(self, client: Client):
        # Given existing user
        user = User.objects.create_user(
            username="testuser",
            email="test@test.com",
            password="testpassword",
        )

        # When user registers with existing email
        response = client.post(
            "/api/auth/register/",
            {
                "email": user.email,
                "username": "testuser2",
                "password": "testpassword2",
                "password_confirmation": "testpassword2",
            },
        )

        # Then response is unsuccessful
        assert response.status_code == HTTP_400_BAD_REQUEST
        response_data = response.json()
        assert response_data["detail"] == "Email already exists"

    @pytest.mark.django_db
    def test_register_username_already_exists(self, client: Client):
        # Given existing user
        user = User.objects.create_user(
            username="testuser",
            email="test@test.com",
            password="testpassword",
        )
        # When user registers with existing username
        response = client.post(
            "/api/auth/register/",
            {
                "email": "test2@test.com",
                "username": user.username,
                "password": "testpassword2",
                "password_confirmation": "testpassword2",
            },
        )

        # Then response is unsuccessful
        assert response.status_code == HTTP_400_BAD_REQUEST
        response_data = response.json()
        assert response_data["detail"] == "Username already exists"

    @pytest.mark.django_db
    def test_register_password_confirmation_does_not_match(self, client: Client):
        # When user registers with password confirmation that does not match
        response = client.post(
            "/api/auth/register/",
            {
                "email": "test@test.com",
                "username": "testuser",
                "password": "testpassword",
                "password_confirmation": "testpassword2",
            },
        )

        # Then response is unsuccessful
        assert response.status_code == HTTP_400_BAD_REQUEST
        response_data = response.json()
        assert response_data["detail"] == "Passwords do not match"
