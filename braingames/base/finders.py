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
                path = os.path.join(item.path, 'static')
                self.locations.append(('games/{}'.format(item.name), path))

        for prefix, root in self.locations:
            filesystem_storage = FileSystemStorage(location=root)
            filesystem_storage.prefix = prefix
            self.storages[root] = filesystem_storage
