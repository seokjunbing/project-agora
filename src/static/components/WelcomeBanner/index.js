import React from 'react';
import { connect } from 'react-redux';
import signUpPromptReducer from '../../reducers/signUpPromptReducer';


class WelcomeBanner extends React.Component {

  constructor(props) {
      super(props);
  }

    render() {

      var center_style = {
        textAlign: 'center'
      }

      var error_color = {
        color: 'Red'
      }

        return (
            <div style= {center_style} className="ui raised very padded text container segment">
              <h2 className="ui header">Welcome to Agora!</h2>
              <p>The Dartmouth student marketplace</p>
              <label style= {error_color}>{this.props.promptMessage}</label>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        promptMessage : state.verificationPrompt.promptMessage,
    };
};

export default connect(mapStateToProps, null)(WelcomeBanner);
