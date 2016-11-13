# django-react-redux-jwt-heroku-boilerplate

This is a fork of Seedstars' brilliant [django-react-redux-jwt-base boilerplate project](https://github.com/Seedstars/django-react-redux-jwt-base). It is adapted to be deployed on Heroku. There's a couple other changes I've made based on my preferences. I didn't make a formal fork because it's different enough to merit its own repo.

Here are the major changes:

1. Added `Procfile` 
2. Added `runtime.txt`
3. Added another target to `package.json` called `postinstall`. Heroku runs this after deployment.
4. Heroku expects a `requirements.txt` in the root. I've copied over `py-requirements/base.txt` to it.
5. The local environment now uses a postgres instance rather than SQLite. See `dev.py` in the settings folder to see all credentials.
6. Semantic-UI is included. For an example, see the `ProtectedView`. I've decided to check a compiled version into the `static/` folder so user beware. Long term, this should be replaced with a library of React components for Semantic.
7. Sentry logging is turned off on production and replaced with standard local logging.
8. Not using `scripts/static_validate_backend.sh`. Just using pep8 through vim.
9. Stripped out the UI components so it looks ugly on first load.

Make sure to setup postgres on Heroku and have your buildpacks in order:
```
heroku buildpacks:add --index 1 heroku/nodejs
heroku buildpacks:add --index 2 heroku/python
```

And set the `DJANGO_SETTINGS_MODULE` environment variable:

```
heroku config:set DJANGO_SETTINGS_MODULE=djangoreactredux.settings.prod
```

Hope it helps.

## Architecture

## Setup
Use setup instructions found on [django-react-redux-jwt-base boilerplate project](https://github.com/Seedstars/django-react-redux-jwt-base)

## Deployment

## Authors
Seok Jun Bing, Jasper Bingham, Elizabeth Brissie, Audyn Curless, Odon Orzsik, Juan Torres

## Note

For some reason, Heroku doesn't like the node & npm versions set on the first commit. The `postinstall` command will fail. So on the first commit, comment those out. Put them back in (and make sure they match the versions on your dev environment) from the second commit onwards.

## Current progress and TODO

### Backend

#### API endpoints

At this moment, the following API endpoints are accepting either GET or POST requests. They are still in a provisional
state and are likely to change somewhat. We strive to not rename fields in our responses as to maintain
some backwards compatibility, but this is not guaranteed.

```
{
    "listings": "http://[ site_url ]/api/listings/",
    "categories": "http://[ site_url ]/api/categories/",
    "messages": "http://[ site_url ]/api/messages/",
    "conversations": "http://[ site_url ]/api/conversations/",
    "users": "http://[ site_url ]/api/users/"
    "auth-token": "http://[ site_url ]/api/auth-token/"
}
```

### Models

We have so far focused on creating working models for `Listing` and `User` so as to implement core functionality in our
 site. We have removed some fields provisionally so as to make development and front-end integration easier.
 
### Upgrading to Django 1.10

1. Update your python packages: run `pip install -r requirements.txt` in the repository's root folder.
2. You _might_ have to migrate: `python manage.py makemigrations && python manage.py migrate` 
If that doesn't work, run `python manage.py makemigrations agora` and `python manage.py migrate agora`.

### Changelog

1. Added user sign-in endpoint: `[ site_url ]/api/auth-token` that returns a token if the username and password combination
are valid. To make a request, send a `POST` request with `username` and `password` fields to the url. With `curl`,
 for instance, do 
 ```curl --data "username=value1&username=value2" https://[ site_url ]/api/auth-token```. 
 For now this sends the password in plain text, but it should work for the demo.
2. Modified user creation endpoint. Now, you need a @dartmouth.edu email to sign up and it no longer requires a username, 
which is instead derived from the Dartmouth email. If you need a user's username (for authentication, for instance), for
now use `get_username()` in `serializers.py`.

### TODO

- s3
- cloudfront
- Figure out image storing: db? store in s3 and store file url? 