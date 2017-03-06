import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './app';
import { HomeView, EditListingView, ContactAdminView, ListingView, ProfilePageView, AccountView, AboutUsView, ProtectedView, NotFoundView, VerifyEmailView, CreateListingView, MessagingView, ConfirmationPageView } from './containers';
import { requireAuthentication } from './utils/requireAuthentication';

export default(
    <Route path="/" component={App}>
        <IndexRoute component={ListingView}/>
        <Route path="verify" component={VerifyEmailView}/>
        <Route path="createlisting" component={CreateListingView}/>
        <Route path="listing" component={ListingView}/>
        <Route path="messaging" component={MessagingView}/>
        <Route path="confirmed" component={ConfirmationPageView}/>
        <Route path="about" component={AboutUsView}/>
        <Route path="profile" component={ProfilePageView}/>
        <Route path="edit" component={EditListingView}/>
        <Route path="contactAdmin" component={ContactAdminView}/>
        <Route path="protected" component={requireAuthentication(ProtectedView)}/>
    </Route>
);
