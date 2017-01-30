# Agora Student marketplace

This is the source code for Agora, a trusted student marketplace for Dartmouth students. 

This is a fork of Seedstars' brilliant [django-react-redux-jwt-base boilerplate project](https://github.com/Seedstars/django-react-redux-jwt-base).
It is adapted to be deployed on Heroku. There's a couple other changes I've made based on my preferences.

## Architecture

We're using Django for our backend with a Postgres local database (on Heroku), and then react-redux for our frontend component. We have also implemented an Amazon S3 bucket for image storage related to listings.

## Setup
Use setup instructions found on [django-react-redux-jwt-base boilerplate project](https://github.com/Seedstars/django-react-redux-jwt-base)


Make sure to setup postgres on Heroku and have your buildpacks in order:
```
heroku buildpacks:add --index 1 heroku/nodejs
heroku buildpacks:add --index 2 heroku/python
```

And set the `DJANGO_SETTINGS_MODULE` environment variable:

```
heroku config:set DJANGO_SETTINGS_MODULE=djangoreactredux.settings.prod
```


## Deployment

## Authors
Seok Jun Bing, Jasper Bingham, Elizabeth Brissie, Audyn Curless, Odon Orzsik, Juan Torres

## Note

For some reason, Heroku doesn't like the node & npm versions set on the first commit. The `postinstall` command will fail. So on the first commit, comment those out. Put them back in (and make sure they match the versions on your dev environment) from the second commit onwards.

## Documentation

### Backend

#### API endpoints

At this moment, the following API endpoints are accepting either GET or POST requests. They are still in a provisional
state and are likely to change somewhat. We strive to not rename fields in our responses as to maintain
some backwards compatibility, but this is not guaranteed.

##### Listings
`http://[ site_url ]/api/listings/`

Lists the listings made by users on the site.
 
##### Categories
`http://[ site_url ]/api/categories/`

Lists the available categories for users to post items on.

##### Messages
`http://[ site_url ]/api/messages/`

Lists the messages on the site's database.

##### Conversations
`http://[ site_url ]/api/conversations/`

Lists the conversations on the site's database.

##### Users
`http://[ site_url ]/api/users/`

Lists the users on the site's database and allows for the creation of new users.

###### Creating users

Make a POST request with the following fields: `email`, `password`, `first_name`, `last_name`.
###### Retrieving users

Make a GET request. You will receive the following fields: `id`, `username`, `email`, `first_name`, `last_name`. `password`
is, naturally, a read-only field. 

##### auth-token

`http://[ site_url ]/api/auth-token/`

**Accepts POST requests only**. Send a POST request containing the following fields: `username` and `password` to try to
authenticate a user. If the user is successfully authenticated, you will receive a `token`. For now, this endpoint
requires `username`, but the plan is to either transition to requiring `email` or to remove this endpoint
altogether. You can derive a `username` from an email for now by using `get_username()` in `serializers.py`.

### Models

We have so far focused on creating working models for `Listing`, `User`, `Message`, and `conversations`. We have removed some fields provisionally so as to make development and front-end integration easier.
 
## Troubleshooting

### Upgrading to Django 1.10

1. Update your python packages: run `pip install -r requirements.txt` in the repository's root folder.
2. You _might_ have to migrate: `python manage.py makemigrations && python manage.py migrate`.
If that doesn't work, run `python manage.py makemigrations agora` and `python manage.py migrate agora`.

## Changelog

1. Added user sign-in endpoint: `[ site_url ]/api/auth-token` that returns a token if the username and password combination
are valid. To make a request, send a `POST` request with `username` and `password` fields to the url. With `curl`,
 for instance, do 
 ```curl --data "username=value1&password=value2" https://[ site_url ]/api/auth-token```. 
 For now this sends the password in plain text, but it should work for the demo.
2. Modified user creation endpoint. Now, you need a @dartmouth.edu email to sign up and it no longer requires a username, 
which is instead derived from the Dartmouth email. If you need a user's username (for authentication, for instance), for
now use `get_username()` in `serializers.py`.

### TODO

- Authentication (User Creation and Log-in)
- Messaging (conversation style about listings)
- Image upload (multiple images)
- Caching
- Wishlist Feature
- Anonymity of Home Page
