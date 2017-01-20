"""colorfulDomination_app URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^play', views.play, name='play'),
    url(r'^basics', views.basics, name='basics'),
    url(r'^protips', views.protips, name='protips'),
    url(r'^register', views.register, name='register'),
    url(r'^login_user', views.login_user, name='login_user'),
    url(r'^login_guest', views.login_guest, name='login_guest'),
    url(r'^logout', views.logout_view, name='logout'),
    url(r'^game', views.game, name='game'),
]