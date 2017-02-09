from django.apps import AppConfig
from django.contrib import admin

import session_csrf


class BaseAppConfig(AppConfig):
    name = 'braingames.base'

    def ready(self):
        # The app is now ready. Include any monkey patches here.

        admin.site.site_header = 'Brain Games Administration'
        admin.site.site_title = 'Mozilla Brain Games'

        # Monkey patch CSRF to switch to session based CSRF. Session
        # based CSRF will prevent attacks from apps under the same
        # domain. If you're planning to host your app under it's own
        # domain you can remove session_csrf and use Django's CSRF
        # library. See also
        # https://github.com/mozilla/sugardough/issues/38
        session_csrf.monkeypatch()
