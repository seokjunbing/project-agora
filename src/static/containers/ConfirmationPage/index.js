import React from 'react';
import ConfirmationPage from '../../components/ConfirmationPage';


class ConfirmationPageView extends React.Component {

  render() {
      return (
        <div>
          <ConfirmationPage/>
        </div>
      );
  }
}

export default (ConfirmationPageView);
export { ConfirmationPageView as ConfirmationPageViewNotConnected };
