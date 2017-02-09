from django.db import models


class Result(models.Model):
    game = models.CharField(max_length=255)
    data = models.TextField()

    def __str__(self):
        return '{} @ {}'.format(self.id, self.game)
