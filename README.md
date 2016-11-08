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
}
```

### Models

We have so far focused on creating working models for `Listing` and `User` so as to implement core functionality in our
 site. We have removed some fields provisionally so as to make development and front-end integration easier.
 


Though the URLs are probably
### TODO

- s3
- cloudfront
- Figure out image storing: db? store in s3 and store file url? 