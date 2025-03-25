from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("user_auth.urls")),
    path("model/", include("mlmodel.urls")),
    path("draft/", include("draft.urls")),
]
