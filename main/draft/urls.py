from django.urls import path
from . import views

urlpatterns = [
    path('contact/', views.save_contact, name="save_contact"),
    path("affidavit/", views.affidavit_view, name="affidavit"),
    path("rent-agre/", views.rent_agreement_view, name="rent-agre"),
    path("nda-form/", views.nda_form_view, name="nda-form"),
    path("will-form/", views.will_form_view, name="will-form"),
    path("green-paper/", views.green_paper_view, name="green-paper"),
    path("power-of-attorney/", views.power_of_attorney_view, name="power-of-attorney"),
    path("last-will/", views.last_will_view, name="last-will"),


]
