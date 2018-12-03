from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Jobs(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    job = models.CharField(max_length=100,default='')
    summarized = models.BooleanField(default=False)
    accuracy = models.CharField(max_length=10,default='0.00')

    def __str__(self):
        return self.user.username+' '+self.job+' '+str(self.summarized)+' '+self.accuracy

    class Meta:
        verbose_name_plural = "User Jobs"