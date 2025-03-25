from django.urls import path
from . import views

urlpatterns = [
    path('contact/', views.save_contact, name="save_contact"),
    path("affidavit/", views.affidavit_view, name="affidavit"),
    path("bond-paper/", views.bond_paper_view, name="bond-paper"),
    path("nda-form/", views.nda_form_view, name="nda-form"),
    path("will-form/", views.will_form_view, name="will-form"),
    path("green-paper/", views.green_paper_view, name="green-paper"),


]
