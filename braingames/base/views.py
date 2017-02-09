import json
import os
from functools import partial
from urllib.parse import urljoin

from django.conf import settings
from django.http import (Http404, HttpResponse,
                         HttpResponseBadRequest, HttpResponseRedirect)
from django.shortcuts import render
from django.contrib.staticfiles.storage import staticfiles_storage

from session_csrf import anonymous_csrf

from braingames.base.models import Result


@anonymous_csrf
def home(request):
    return render(request, 'braingames/home.jinja')


def gamestatic(game, path):
    path = urljoin('games/{}/'.format(game), path)
    return staticfiles_storage.url(path)


def game(request, game):
    for item in os.scandir(settings.GAMES_DIRECTORY):
        if item.is_dir() and item.name == game:
            break
    else:
        item = None

    if not item:
        raise Http404('Game does not exist')

    template = os.path.join(item.name, 'game.jinja')
    return render(request, template, {'gamestatic': partial(gamestatic, item.name)})


def datacollector(request, game):
    if not request.is_ajax or not request.POST:
        return HttpResponseRedirect('/')

    try:
        json.loads(request.POST['json'])
    except ValueError:
        return HttpResponseBadRequest('Not valid JSON data.')

    Result.objects.create(game=game, data=request.POST['json'])

    return HttpResponse('OK')
