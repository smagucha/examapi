from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView
from . import views

urlpatterns = [
    path("allusers/", views.all_users),
    path("register/", views.register_view, name="register"),
    path("login/", views.login_view, name="login"),
    path("refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("verify-token/", TokenVerifyView.as_view(), name="token_verify"),
    path(
        "register/resend-email/",
        views.resend_email_verification_view,
        name="rest_resend_email",
    ),
    path(
        "account-confirm-email/<str:uidb64>/<str:token>/",
        views.email_confirm_redirect,
        name="account_confirm_email",
    ),
    path("password/reset/", views.password_reset_view, name="rest_password_reset"),
    path(
        "password/reset/confirm/<str:uidb64>/<str:token>/",
        views.password_reset_confirm_redirect,
        name="password_reset_confirm",
    ),
    path(
        "password/reset/confirm/",
        views.password_reset_confirm_view,
        name="password_reset_confirm_api",
    ),
    path("change-password/", views.change_password_view, name="change_password"),
    path("logout/", views.logout_view, name="logout"),
    path("update-user/", views.update_user_profile, name="update-user"),
    path("me/", views.current_user),
]
