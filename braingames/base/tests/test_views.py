from unittest.mock import patch

from django.core.urlresolvers import reverse
from django.http import HttpResponseBadRequest, HttpResponseNotAllowed
from django.test import TestCase


class HomeTests(TestCase):
    def test_base(self):
        self.client.get(reverse('home'))


class GameTests(TestCase):
    def test_game_not_found(self):
        response = self.client.get(reverse('game', kwargs={'game': 'foo'}))
        self.assertEqual(response.status_code, 404)


class DataCollectorTests(TestCase):
    @classmethod
    def setUpClass(cls):
        cls.url = reverse('datacollector', kwargs={'game': 'foo'})
        super(DataCollectorTests, cls).setUpClass()

    def test_base(self):
        with patch('braingames.base.views.utils.list_games') as list_games_mock:
            with patch('braingames.base.views.Result') as ResultMock:

                list_games_mock.return_value = ['foo']
                response = self.client.post(
                    self.url,
                    content_type='application/json',
                    data='{}',
                    HTTP_X_REQUESTED_WITH='XMLHttpRequest')
                assert response.status_code == 200
                assert response.content == b'OK'

                ResultMock.objects.create.assert_called_with(game='foo', data='{}')

    def test_no_body(self):
        response = self.client.post(
            self.url,
            content_type='application/json',
            data='',
            HTTP_X_REQUESTED_WITH='XMLHttpRequest')
        assert response.status_code == HttpResponseBadRequest.status_code
        assert response.content == b'Invalid request.'

    def test_not_ajax(self):
        response = self.client.post(
            self.url,
            content_type='application/json',
            data='{}')
        assert response.status_code == HttpResponseBadRequest.status_code
        assert response.content == b'Invalid request.'

    def test_not_post(self):
        response = self.client.get(self.url)
        assert response.status_code == HttpResponseNotAllowed.status_code

    def test_invalid_game(self):
        with patch('braingames.base.views.utils.list_games') as list_games_mock:
            list_games_mock.return_value = []

            response = self.client.post(
                self.url,
                content_type='application/json',
                data='{}',
                HTTP_X_REQUESTED_WITH='XMLHttpRequest')
            assert response.status_code == HttpResponseBadRequest.status_code
            assert response.content == b'Invalid game.'

    def test_invalid_data(self):
        with patch('braingames.base.views.utils.list_games') as list_games_mock:
            list_games_mock.return_value = ['foo']

            response = self.client.post(
                self.url,
                content_type='application/json',
                data='foo',
                HTTP_X_REQUESTED_WITH='XMLHttpRequest')
            assert response.status_code == HttpResponseBadRequest.status_code
            assert response.content == b'Invalid JSON data.'


class ListGamesTests(TestCase):
    def test_base(self):
        url = reverse('list_games')
        response = self.client.get(url)
        assert response.status_code == 200
