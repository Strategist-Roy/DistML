from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Jobs(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    job = models.CharField(max_length=100,default='')

    def __str__(self):
        return self.user.username

    class Meta:
        verbose_name_plural = "User Jobs"