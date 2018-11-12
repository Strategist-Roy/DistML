#user requests URL are handled here

from django.conf.urls import url
from datamodels import views

urlpatterns = [	
	url(r'^user/dispatch/$', views.dispatch),
	url(r'^user/dataset_upload/$', views.dataset_upload),
	url(r'^models/dispatch/$', views.dispatch)
]

