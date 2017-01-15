from __future__ import unicode_literals

from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from datetime import datetime, timedelta
from django.contrib.auth.validators import ASCIIUsernameValidator


# Create your models here.

class User(User):
    username_validator = ASCIIUsernameValidator()


class News(models.Model):
    """Class for the news"""
    title = models.CharField(max_length=100, default='')
    content = models.TextField()
    publish_date = models.DateTimeField('date published', default=datetime.now)

    def is_recent(self):
        """Returns true, if the given news instance counts as fresh"""
        if self.pub_date + timedelta(days=3) >= timezone.now():
            return True

        return False


class Statistics(models.Model):
    """Track users personal game statistics"""
    user_id = models.ForeignKey('User', on_delete=models.CASCADE)
    games_played = models.IntegerField(default=0)
    games_won = models.IntegerField(default=0)
    routes_built = models.IntegerField(default=0)
    routes_destroyed = models.IntegerField(default=0)
    towers_built = models.IntegerField(default=0)
    towers_destroyed = models.IntegerField(default=0)
    fields_occupied = models.IntegerField(default=0)
    points_total = models.IntegerField(default=0)
    games_left = models.IntegerField(default=0)