from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.urls import reverse
from django.utils.translation import activate

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required, permission_required

import sys

from .models import News, Statistics

# Create your views here.

app_name = 'colorfulDomination_app'


def index(request):
    """The landing page

    This is the landing page of your app. It contains the latest news on the
    weather, the side menu and login.

    Keyword arguments:
    request -- the django request object
    """
    return render(request, 'colorfulDomination_app/index.html')


def play(request):
    return render(request, 'colorfulDomination_app/play.html')


def basics(request):
    return render(request, 'colorfulDomination_app/basics.html')


def protips(request):
    return render(request, 'colorfulDomination_app/protips.html')


def game(request):
    return render(request, 'colorfulDomination_app/game.html')