import os
from urllib.parse import urljoin

from django.conf import settings
from django.contrib.staticfiles.storage import staticfiles_storage
from django.core.cache import cache


def list_games():
    if not settings.DEBUG:
        games = cache.get('games')
        if games is not None:
            return games

    games = []
    for item in os.scandir(settings.GAMES_DIRECTORY):
        if item.is_dir():
            games.append(item.name)

    if not settings.DEBUG:
        cache.set('games', games, None)

    return games


def gamestatic(game, path):
    path = urljoin('games/{}/'.format(game), path)
    return staticfiles_storage.url(path)
