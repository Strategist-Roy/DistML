#user requests URL are handled here

from django.conf.urls import url
from datamodels import views

urlpatterns = [	
	url(r'^ml/dispatch/$', views.dispatch),
	url(r'^ml/dataset_upload/$', views.dataset_upload),
	url(r'^ml/dispatch/$', views.dispatch),
	url(r'^ml/submit_results/$', views.submit_results),
	url(r'^ml/get_status/$', views.get_status),
	url(r'^ml/evaluate/$', views.evaluate),
]

