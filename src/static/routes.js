import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './app';

import { HomeView, ListingView, AccountView, AboutView, ProtectedView, NotFoundView } from './containers';

import { requireAuthentication } from './utils/requireAuthentication';

export default(
    <Route path="/" component={App}>
        <IndexRoute component={HomeView}/>
        <Route path="listing" component={ListingView}/>
        <Route path="account" component={AccountView}/>
        <Route path="about" component={AboutView}/>
        <Route path="protected" component={requireAuthentication(ProtectedView)}/>
    </Route>
);
