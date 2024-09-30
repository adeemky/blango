from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework.authtoken import views

from blog.api.views import PostList, PostDetail

urlpatterns = [
    path("posts/", PostList.as_view()),
    path("posts/<int:pk>/", PostDetail.as_view()),
    path("auth/", include("rest_framework.urls")),
    path("token-auth/", views.obtain_auth_token)
]