import React from 'react';
import { connect } from 'react-redux';
import { Segment, Image, Grid, Label, Progress, Header } from 'semantic-ui-react';
import signUpPromptReducer from '../../reducers/signUpPromptReducer';
import logInReducers from '../../reducers/logInReducers';


class WelcomeBanner extends React.Component {

  constructor(props) {
      super(props);
  }

    render() {

      var center_style = {
        textAlign: 'center',
        fontSize: 17,
      }

      var paragraph_style = {
        //textAlign: 'left',
      }

      var error_color = {
        color: 'Red'
      }

        return (
            <div>
              <Grid>
                <Grid.Column width={3}>
                </Grid.Column>
                <Grid.Column width={10}>
                  <Segment>

                    <Header size='huge'>Welcome to Agora!</Header>

                    <p>The exclusive online marketplace for Dartmouth students.</p>

                    <p>Going on an FSP and not sure what to do with that (gently) used futon<b>?</b></p>

                    <p>Looking to rent a parking spot at Chi Gam for 17S<b>?</b></p>

                    <p>Tired of blitzing out to campus on behalf of your student business<b>?</b></p>

                    <p>Sick of selling back $200 textbooks for 50 cents in town<b>?</b></p>

                    <Header size='large' color='teal'> Agora is here to help </Header>

                    <p><label style= {paragraph_style}> Instead of abandoning your beloved AC units, TVs, textbooks
                    fridges, rent them to another student for the term.</label></p>

                    <p>Feel free to explore current listings, but make sure to sign up
                    with your <b>Dartmouth email </b> in order to buy and sell.</p>

                  </Segment>
                </Grid.Column>
                <Grid.Column width={3}>
                </Grid.Column>
              </Grid>
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
