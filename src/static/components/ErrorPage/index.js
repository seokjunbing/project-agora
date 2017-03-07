import React from 'react';
import { Segment, Button } from 'semantic-ui-react'
import { connect } from 'react-redux';
import signUpPromptReducer from '../../reducers/signUpPromptReducer';
import logInReducers from '../../reducers/logInReducers';


class ErrorPage extends React.Component {


  render() {

    var center_style = {
      textAlign: 'center',
      width: '570px',
      height: '120px',
      position: 'absolute',
      left: '50%',
      top: '50%',
      marginTop: '-100px', // half of height
      marginLeft: '-300px',
      color: 'Red',
    }

    var button_style = {
      marginTop: '40px',
      textAlign: 'center'
    }

      return (
        <Segment style={center_style} padded='very' size='big'>
          { this.props.promptMessage }
        </Segment>
        )
    }
}

const mapStateToProps = (state) => {
  return {
    promptMessage : state.verificationPrompt.promptMessage
    };
};

export default connect(mapStateToProps, null)(ErrorPage);
