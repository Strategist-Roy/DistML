from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class AppUsers(models.Model):
	user = models.OneToOneField(User, on_delete=models.CASCADE)
	name = models.CharField(max_length=100,default='')
	balance = models.DecimalField(max_digits=14,decimal_places=2,default=0)

	def __str__(self):
		return self.user.username

	class Meta:
		verbose_name_plural = "App Users"
	