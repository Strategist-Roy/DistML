#user requests URL are handled here

from django.conf.urls import url
from datamodels import views

urlpatterns = [
	url(r'^models/dispatch/$', views.dispatch)
]

