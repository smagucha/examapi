from django.urls import path
from . import views

urlpatterns = [
    path("add_event/", views.add_event),
    path("event_list/", views.event_list),
    path("event/<int:pk>/", views.event_detail),
]
