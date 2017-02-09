import os

from django.conf import settings
from django.http import Http404
from django.shortcuts import render

from session_csrf import anonymous_csrf


@anonymous_csrf
def home(request):
    return render(request, 'braingames/home.jinja')


def game(request, game):
    for item in os.listdir(settings.GAMES_DIRECTORY):
        if item.startswith("{}-".format(game)) and item.endswith('.jinja'):
            break
    else:
        item = None

    if not item:
        raise Http404("Poll does not exist")

    return render(request, item)
