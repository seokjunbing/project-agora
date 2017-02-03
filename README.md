# Agora Student marketplace

This is the source code for Agora, a trusted student marketplace for Dartmouth students. 

This is a fork of Seedstars' brilliant [django-react-redux-jwt-base boilerplate project](https://github.com/Seedstars/django-react-redux-jwt-base).
It is adapted to be deployed on Heroku. There's a couple other changes I've made based on my preferences.

## Architecture

We're using Django for our backend with a Postgres local database (on Heroku), and then react-redux for our frontend component. We have also implemented an Amazon S3 bucket for image storage related to listings.

## Setup
Use setup instructions found on [django-react-redux-jwt-base boilerplate project](https://github.com/Seedstars/django-react-redux-jwt-base)

In addition, make sure to install postrges and jpeg in your virtualenv:

```
brew install jpeg
brew instlal postgres
```


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

Lists the listings made by users on the site. *Deleting* a listing can only be done by its author. 
Unauthenticated requests and requests coming from unverified users will not receive the `author` of a Listing so
 as to preserve anonymity and trust of users within the Dartmouth community.
 
##### Categories
`http://[ site_url ]/api/categories/`

Lists the available categories for users to post items on. This is a read-only endpoint. If you need to add categories,
do so via the admin site.

##### Messages
`http://[ site_url ]/api/messages/`

Lists the messages on the site's database.

##### Conversations
`http://[ site_url ]/api/conversations/`

Lists the conversations on the site's database.

##### Users
`http://[ site_url ]/api/users/`

Lists the users on the site's database and allows for the creation of new users. You will receive either a confirmation
in the form of the created `User` object or a response with a 4XX status code specifying why the request failed. 

###### Creating users

Make a POST request with the following fields: `email`, `password`, `first_name`, `last_name`.
###### Retrieving users

Make a GET request. You will receive the following fields: `id`, `username`, `email`, `first_name`, `last_name`. 
You will also receive a nested object, `profile`, containing a sole field, `verified`, specifying whether a user
 has verified their email. 

##### Authentication token

`http://[ site_url ]/api/auth-token/`

**Accepts POST requests only**. Send a POST request containing the following fields: `username` and `password` to try to
authenticate a user. If the user is successfully authenticated, you will receive a `token`, which you can use to 
authenticate a user. See **AUTH** section for more details on this.

##### Refreshing an authentication token

`http://[ site_url ]/api/token-refresh/`

**Accepts POST requests only**. Send a POST request containing the field `token`, which must be an **unexpired** user token.
You will receive a newer `token` in return.

##### Verifying user emails

`http://[ site_url ]/api/verify/`

In order to verify a user, a GET request should be made with the queries `email` and `code`, containing the user's email
 and verification code. A link of the form `http://[ site_url ]/api/verify/?email=<email>&code=<code>` is sent to the
 email specified by users at signup. If the `code` matches the verification code stored for a `user`, the user is then
  marked as verified and allowed to access the full features of the site.

## AUTH

In order to authenticate users to the API, you will need to provide a token that includes information about the user, such
as their id, email, etc. You should include the token in your requests whenever it is available, as it is the only way the API
knows a user is logged in and can authorize requests to view, modify, or delete restricted content.

### Getting a user token (JWT)
Send a POST request to `api/token-auth/` with the fields `username` and `password`. `username` should be a user's email.

    curl -X POST -H "Content-Type: application/json" -d '{"username":"user","password":"password"}' http://localhost:8000/api/token-auth/

### Making an authenticated request

Include the user token in your header for every request you make; for instance, to make an authenticated request to 
 the listings API endpoint, you might do

    curl -H "Authorization: JWT <token>" http://localhost:8000/api/listings/

### TODO

- Messaging (conversation style about listings)
- Image upload (multiple images)
- Caching
- Wishlist Feature
- Anonymity of Home Page (frontend)

## Troubleshooting

### Upgrading to Django 1.10

1. Update your python packages: run `pip install -r requirements.txt` in the repository's root folder.
2. You _might_ have to migrate: `python manage.py makemigrations && python manage.py migrate`.
If that doesn't work, run `python manage.py makemigrations agora` and `python manage.py migrate agora`.
