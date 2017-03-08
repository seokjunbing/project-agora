import React from 'react';
import { Button } from 'semantic-ui-react';



class ConfirmationPage extends React.Component {

  constructor(props) {
      super(props);
  }

    render() {

      var center_style = {
        textAlign: 'center'
      }

      var button_style = {
        marginTop: '5px',
        textAlign: 'center'
      }

        return (
            <div style= {center_style} className="ui raised very padded text container segment">
              <h2 className="ui header">Thank you for verifying your account!</h2>
              <p>We are happy to have you!</p>
              <Button href="/" style={button_style} color='teal' content='Explore Agora' />
            </div>
        );
    }
}

export default (ConfirmationPage);
