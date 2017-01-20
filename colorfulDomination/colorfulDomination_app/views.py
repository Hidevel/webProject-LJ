from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django.shortcuts import render, redirect
from django.urls import reverse

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required

import logging
import sys

from .models import News, Statistics

# Create your views here.

app_name = 'colorfulDomination_app'


# Get an instance of a logger
logger = logging.getLogger(__name__)


def index(request):
    """The landing page

    This is the landing page of Colorful Domination. It contains
    the latest news about the game and the menu.

    Keyword arguments:
    request -- the django request object
    """
    # Redirect authenticated user to the game page
    if request.user.is_authenticated():
        return redirect(reverse('game'))

    # Get the 4 latest news and display them on the index page
    context = {'news_list': News.objects.order_by('-publish_date')[:4]}
    return render(request, 'colorfulDomination_app/index.html', context)


def play(request):
    """The page before actually playing

    This is the authentication page of Colorful Domination. It contains
    the login form, the signup form and the play as a guest option.

    Keyword arguments:
    request -- the django request object
    """
    # Redirect authenticated user to the game page
    if request.user.is_authenticated():
        return redirect(reverse('game'))

    context = {'signin_form': AuthenticationForm(),
               'signup_form': UserCreationForm()
    }
    return render(request, 'colorfulDomination_app/play.html', context)


def register(request):
    """The view that registers the player

    This is the user log-in view of Colorful Domination.

    Keyword arguments:
    request -- the django request object
    """
    # Redirect authenticated user to the game page
    if request.user.is_authenticated():
        return redirect(reverse('game'))

    signup_form = UserCreationForm()

    # Only interact with post methods
    if request.method == 'POST':
        signup_form = UserCreationForm(data=request.POST)

        # Validate the login form
        if signup_form.is_valid():

            # Save this profile to the database
            signup_form.save()

            # Log this registration
            logger.info('User %s registered as a customer.', signup_form.cleaned_data['username'])

            # Login user
            user = authenticate(username=signup_form.cleaned_data['username'],
                                    password=signup_form.cleaned_data['password1'])
            login(request, user)

            # Also log the login
            logger.info('User %s logged in.', signup_form.cleaned_data['username'])

            # Enter to play mode
            context = {
                'player_name': user.username
            }

            return render(request, 'colorfulDomination_app/game.html', context)

    # Invalid access, redirecting to play page
    signin_form = AuthenticationForm()
    context = {
        'signup_form': signup_form,
        'signin_form': signin_form
    }
    return render(request, 'colorfulDomination_app/play.html', context)


def login_user(request):
    """The view that transports to the play-game page

    This is the user log-in view of Colorful Domination.

    Keyword arguments:
    request -- the django request object
    """

    # Redirect authenticated user to the game page
    if request.user.is_authenticated():
        return redirect(reverse('game'))

    signin_form = AuthenticationForm()

    # Only interact with post methods
    if request.method == 'POST':
        signin_form = AuthenticationForm(data=request.POST)

        # Validate the login form
        if signin_form.is_valid():

            # Check submitted user data
            user = authenticate(username=signin_form.cleaned_data['username'],
                                password=signin_form.cleaned_data['password'])
            if user is not None:
                # Login user
                login(request, user)

                # Log this successful login
                logger.info('User %s logged in.', user.username)

                # Enter to play mode
                context = {
                    'player_name': user.username
                }

                return render(request, 'colorfulDomination_app/game.html', context)
            else:
                # Log this failed login attempt
                logger.info('Failed login for user %s.', signin_form.cleaned_data['username'])

    # Invalid access, redirecting to play page
    signup_form = UserCreationForm()
    context = {
        'signup_form': signup_form,
        'signin_form': signin_form
    }
    return render(request, 'colorfulDomination_app/play.html', context)


def login_guest(request):
    """The view that transports to the play-game page

    This is the user log-in view of Colorful Domination.

    Keyword arguments:
    request -- the django request object
    """
    # Redirect authenticated user to the game page
    if request.user.is_authenticated():
        return redirect(reverse('game'))

    # Invalid access, redirecting to play page
    context = {
        'player_name': 'Guest'
    }

    return render(request, 'colorfulDomination_app/game.html', context)


def logout_view(request):
    """The logout page

    This is the logout page of Colorful Domination. It contains
    a see-you-later message.

    Keyword arguments:
    request -- the django request object
    """
    # If not guest access
    if request.user.is_authenticated():
        # Get the username of the current user
        username = request.user.username

        # Log out user
        logout(request)

        # Log the logout
        logger.info('User %s logged out.', username)

    return redirect(reverse('play'))


def basics(request):
    """The tutorial page

    This is the tutorial page of Colorful Domination. It contains
    the basics of the game.

    Keyword arguments:
    request -- the django request object
    """
    # Redirect authenticated user to the game page
    if request.user.is_authenticated():
        return redirect(reverse('game'))

    return render(request, 'colorfulDomination_app/basics.html')


def protips(request):
    """The tutorial page

    This is the professional tips page of Colorful Domination. It contains
    the best strategies and useful tips.

    Keyword arguments:
    request -- the django request object
    """
    # Redirect authenticated user to the game page
    if request.user.is_authenticated():
        return redirect(reverse('game'))

    return render(request, 'colorfulDomination_app/protips.html')


@login_required
def game(request):
    """The tutorial page

    This is Colorful Domination. It contains the
    the game.

    Keyword arguments:
    request -- the django request object
    """
    return render(request, 'colorfulDomination_app/game.html')
