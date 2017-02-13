from unittest.mock import patch

from django.test import TestCase
from django.test.utils import override_settings

from braingames.base import utils


class ListGamesTests(TestCase):
    @override_settings(DEBUG=False)
    def test_cache(self):
        with patch('braingames.base.utils.cache') as cache_mock:
            cache_mock.get.side_effect = [
                None,
                ['foo', 'bar']
            ]
            utils.list_games()
            assert cache_mock.set.called

            games = utils.list_games()
            assert games == ['foo', 'bar']

    @override_settings(DEBUG=True)
    def test_no_cache(self):
        with patch('braingames.base.utils.cache') as cache_mock:
            utils.list_games()
        assert not cache_mock.get.called
