#user requests URL are handled here

from django.conf.urls import url
from user import views

urlpatterns = [
	url(r'^user/upload_dataset/$', views.dataset_upload)
]

