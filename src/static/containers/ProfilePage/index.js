import React from 'react';
import ProfilePage from '../../components/ProfilePage';


class ProfilePageView extends React.Component {

  render() {
      return (
        <div>
          <ProfilePage/>
        </div>
      );
  }
}

export default (ProfilePageView);
export { ProfilePageView as ProfilePageViewNotConnected };
