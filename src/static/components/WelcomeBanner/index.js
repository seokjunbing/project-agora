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

      var error_color = {
        color: 'Red'
      }

      var header_style = {
        textAlign: 'center',
        paddingTop: '10px',
      }

        return (

            <div>
              <Grid>
                <Grid.Column width={3}>
                </Grid.Column>
                <Grid.Column width={10}>
                  <Segment color='teal' style={center_style}>

                    <Header size='huge' style={header_style}>Welcome to Agora!</Header>

                    <p>The online marketplace exclusively for Dartmouth students.</p>

                    <p>Going on an FSP and not sure what to do with that (gently) used futon?</p>

                    <p>Looking to rent a parking spot at Chi Gam for 17S?</p>

                    <p>Tired of blitzing out to campus on behalf of your student business?</p>
      
                    <p>Instead of abandoning your beloved AC units, TVs, textbooks
                    fridges, sell them or rent them to another student for the term.</p>

                    <Header size='medium' color='teal'> Agora is here to help</Header>

                    <p>The best thing about it?</p>

                    <Header size='medium' color='teal'>We will protect your privacy</Header>

                    <p>Only authenticated members of the Dartmouth community can contact sellers or list their own items.</p>

                    <p>Feel free to explore current listings, but make sure to sign up
                    with your Dartmouth email in order to take advantage of the non-creepy
                    campus marketplace.</p>

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
