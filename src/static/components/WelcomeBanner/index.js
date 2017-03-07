import React from 'react';
import { connect } from 'react-redux';
import signUpPromptReducer from '../../reducers/signUpPromptReducer';
import logInReducers from '../../reducers/logInReducers';


class WelcomeBanner extends React.Component {

  constructor(props) {
      super(props);
  }

    render() {

      var center_style = {
        textAlign: 'center',
        fontSize: 19,
      }

      var agora_help_style = {
        color: 'teal',
        fontWeight: 'bold',
        fontSize: 22,
      }

      var testing_style = {
        color: 'teal',
        fontWeight: 'bold',
      }

      var paragraph_style = {
        textAlign: 'left',
      }

      var error_color = {
        color: 'Red'
      }

        return (
            <div style= {center_style} className="ui raised padded text container segment">
              <h0 className="ui header">Welcome to Agora!</h0>
              <p> </p>

              <p>The <label style= {testing_style}>exclusive </label>
              marketplace for Dartmouth students.</p>

              <p>Going on an FSP and not sure what to do with that (gently) used futon<b>?</b></p>

              <p>Looking to rent a parking spot at Chi Gam for 17S<b>?</b></p>

              <p>Tired of blitzing out to campus on behalf of your student business<b>?</b></p>

              <p>Sick of selling back $200 textbooks for 50 cents in town<b>?</b></p>

              <p><label style= {agora_help_style}> Agora is here to help </label></p>

              <p><label style= {paragraph_style}> Instead of abandoning your beloved AC units, TVs, textbooks
              fridges, rent them to another student for the term.</label></p>

              <p>Feel free to explore current listings, but make sure to sign up
              with your <label style= {testing_style}><b>Dartmouth email </b></label>
              in order to buy and sell.</p>

              <label style= {error_color}>{this.props.promptMessage}</label>
            </div>
        );
    }
}

// token saved as prop
const mapStateToProps = (state) => {
    return {
        promptMessage : state.verificationPrompt.promptMessage,
        sessionToken: state.user.auth_token,
    };
};

export default connect(mapStateToProps, null)(WelcomeBanner);
