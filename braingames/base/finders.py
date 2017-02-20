import os
from collections import OrderedDict

from django.conf import settings
from django.core.files.storage import FileSystemStorage
from django.contrib.staticfiles.finders import FileSystemFinder


class GameFinder(FileSystemFinder):
    def __init__(self, *args, **kwargs):
        self.storages = OrderedDict()
        self.locations = []

        for item in os.scandir(settings.GAMES_DIRECTORY):
            if item.is_dir():
                root = os.path.join(item.path, 'static')
                prefix = os.path.join('games', item.name)
                self.locations.append((prefix, root))

                filesystem_storage = FileSystemStorage(location=root)
                filesystem_storage.prefix = prefix
                self.storages[root] = filesystem_storage
