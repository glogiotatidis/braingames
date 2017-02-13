import json
import os
from functools import partial
from django.http import Http404, HttpResponse, HttpResponseBadRequest
from django.shortcuts import render
from django.views.decorators.http import require_POST

from braingames.base import utils
from braingames.base.models import Result


def home(request):
    return render(request, 'braingames/home.jinja')


def game(request, game):
    if game not in utils.list_games():
        raise Http404('Game does not exist')

    template = os.path.join(game, 'game.jinja')
    return render(request, template, {'gamestatic': partial(utils.gamestatic, game)})


@require_POST
def datacollector(request, game):
    if not request.is_ajax() or not request.body:
        return HttpResponseBadRequest('Invalid request.')

    if game not in utils.list_games():
        return HttpResponseBadRequest('Invalid game.')

    data = request.body.decode('utf-8')

    try:
        json.loads(data)
    except ValueError:
        return HttpResponseBadRequest('Invalid JSON data.')

    Result.objects.create(game=game, data=data)

    return HttpResponse('OK')


def list_games(request):
    games = utils.list_games()
    return render(render, 'braingames/list_games.jinja', {'games': games})
