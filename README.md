# braingames

[![Build Status](https://img.shields.io/travis/mozilla/braingames/master.svg)](https://travis-ci.org/mozilla/braingames)

A set of brain games

## Game Development

Each game must have its own directory under the [`games`](games/) folder. The
name of the directory serves as the game URL, e.g. the game inside directory
`foobar` can be loaded via `/game/foobar/` URL.

In each directory *must* contain a template named `game.jinja`. The template
*must* extend `braingames/basegame.jinja` and the game's JavaScript code must
go in the `game_script` block. For convenience, instead of adding JavaScript code
inside the `game_script` block, you can `include` a JavaScript file.
See [`example-game`](games/example_game/game.jinja).

Note:
 - If you rename a directory, the game's URL will change.
 - If you delete a directory, the game will no longer be available, but the collected
   experiment data will remain in the database.

### Collecting the results

Each game has its own data-collection endpoint under the `datacollector/` URL,
for example `game/example-game/datacollector`. The view is expecting a POST via
an Ajax Request with JSON data in the body. You can use the following code to
post data:

```javascript
var csrf = "{% csrf_token %}";
jsPsych.init({
    timeline: timeline,
    on_finish: function() {
        $.ajax({
            type: 'post',
            cache: false,
            url: 'datacollector/',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            headers: {
                'X-CSRFToken': '{{  csrf_token }}'
            },
            data: jsPsych.data.dataAsJSON(),
            success: function(output) { console.log(output); }
        });
    }
});
```

Do not forget to set the `csrf_token` as shown.

## Getting the results from the Database

Log into Django Admin (`/admin/`) and select `Results`. You can optionally
filter the results to a game and/or a time period using the filters on the
right. Click the `Export` button on the upper right when you're done filtering
to download the results.

## Application Development

You'll need Python 3, virtualenv and sqlite3:

 1. Set up virtualenv
 2. Install packages from `requirements.txt`
 3. Configure app by copying and optionally editing `.env-example` to `.env`.
 4. Develop!


Alternatively, you can use [Docker](http://docker.com/):

 1. pip install docker-compose
 2. Configure app by copying and optionally editing `.env-example` to `.env`.
 3. docker-compose up
 4. Develop!


## Deployment

This app runs on Heroku. Commits to the `mozilla/braingames` `master` branch get
automatically deployed
to [`moz-braingames-stage`](https://moz-braingames-stage.herokuapp.com) if the
Travis-CI tests pass.

Via the Heroku UI and the `moz-braingames` pipeline, releases can be promoted
from Staging to Production
at [`moz-braingames`](https://moz-braingames.herokuapp.com).
