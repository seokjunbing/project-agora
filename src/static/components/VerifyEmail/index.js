import React from 'react';
import {Header, Input, Label, Container, Button, Grid, Divider, Form, Checkbox} from 'semantic-ui-react';
import axios from 'axios';

class VerifyEmail extends React.Component {
    constructor(props) {
      super(props);

      // user sign up state variables
      this.state = {
        emailAddressSU: '',
        firstName: '',
        lastName: '',
        passwordSU: '',
        verifyPasswordSU: '',
        passwordErrorText1: '',
        passwordErrorText2: '',

        // login credential state variables
        logInEmail: '',
        logInPassword: '',

        // boolean flags to determine if input is sufficient
        emailOK: '0',
        firstNameOK: '0',
        lastNameOK: '0',
        passwordOK: '0'
      };

    }

    // update the value of the email sign up state variable
    onChangeEmailSU = (e) => {
      e.preventDefault();
      this.setState({ emailAddressSU : e.target.value });
      console.log(this.state.emailAddressSU)
    }

    // update the value of the firstName state variable
    onChangeFirstName = (e) => {
      e.preventDefault();
      this.setState({ firstName : e.target.value });
      console.log(this.state.emailAddressSU)
    }

    // update the value of the lastName state variable
    onChangeLastName = (e) => {
      e.preventDefault();
      this.setState({ lastName : e.target.value });
      console.log(e.target.value)
    }

    // update the value of the passwordSU state variable
    onChangePasswordSU = (e) => {
      e.preventDefault();
      this.setState({ passwordSU : e.target.value });
      console.log(e.target.value)

      // password should be between 6 to 15 characters long
      if ((e.target.value.length >= 6) && (e.target.value.length <= 15)){

        // set the error message if the passwords don't match
        if (e.target.value != this.state.verifyPasswordSU) {
          this.setState({ passwordErrorText1 : "" });
          this.setState({ passwordErrorText2 : "Password doesn't match!" });
          this.setState({ passwordOK: '0' });
        }
        else {
          // passwords match
          this.setState({ passwordErrorText1 : "" });
          this.setState({ passwordErrorText2 : "" });
          this.setState({ passwordOK: '1' });
        }
      }
      else {
        // passwords too long or too short
        this.setState({ passwordOK: '0' });

        if (e.target.value.length == 0){
          this.setState({ passwordErrorText1 : "Password required!" });
          this.setState({ passwordErrorText2 : "" });
        }
        else {
          this.setState({ passwordErrorText1 : "Password should be 6 to 15 characters long!" });
          this.setState({ passwordErrorText2 : "" });
        }
      }
    }

    // update the value of the verifypasswordSU state variable
    onChangeVerifyPasswordSU = (e) => {
      e.preventDefault();
      this.setState({ verifyPasswordSU : e.target.value });
      console.log(e.target.value)

      // password should be between 6 to 15 characters long
      if ((e.target.value.length >= 6) && (e.target.value.length <= 15)){

        // set the error message if the passwords don't match
        if (e.target.value != this.state.passwordSU) {
          this.setState({ passwordErrorText1 : "Password doesn't match!" });
          this.setState({ passwordErrorText2 : "" });
          this.setState({ passwordOK: '0' });
        }
        else {
          this.setState({ passwordErrorText1 : "" });
          this.setState({ passwordErrorText2 : "" });
          this.setState({ passwordOK: '1' });
        }
      }
      else {
        // passwords too long or too short
        this.setState({ passwordOK: '0' });

        if (e.target.value.length == 0){
          this.setState({ passwordErrorText2 : "Password required!" });
          this.setState({ passwordErrorText1 : "" });
        }
        else {
          this.setState({ passwordErrorText2 : "Password should be 6 to 15 characters long!" });
          this.setState({ passwordErrorText1 : "" });
        }
      }
    }

    // handle the onClick event for account creation
    onSignUpClick = (e) => {
      e.preventDefault();
      console.log("sign up clicked!")

      // check boolean flags

      // post the data to the API url if everything is good
      this.props.userSignupRequest(this.state);

    }

    // log in fields

    // update the value of the email state variable for Log In
    onChangeSignInEmail = (e) => {
      e.preventDefault();
      this.setState({ logInEmail : e.target.value });
      console.log(this.state.logInEmail)
    }

    // update the value of the password state variable for Log in
    onChangeSignInPassword = (e) => {
      e.preventDefault();
      this.setState({ logInPassword : e.target.value });
      console.log(this.state.logInPassword)
    }

    // handle the onClick event for account Log In
    onLogInClick = (e) => {
      e.preventDefault();
      console.log("Log In clicked!")

      // post the data to the API to get the auth token back
      this.props.userLogInRequest(this.state);

    }


    render() {
      var style_centered = {
        textAlign: 'center'
      }

      var label_color = {
        color: 'Red'
      }

      var email_size = {
        textAlign: 'center',
        width: '150px'
      }

      var style_block = {
        display: 'block'
      }

      var vertical_offset = {
        marginTop: '25px'
      }

      var field_length = {
        width: '279px'
      }

      var button_style = {
        marginTop: '30px',
        textAlign: 'center'
      }

        return (

          <Grid columns={2} relaxed>
            <Grid.Column>
              <Container textAlign='center'>
                <Header style={style_centered}>
                  Sign up for Agora:
                </Header>
                <Form>
                  <Form.Field>
                    <label style={vertical_offset}>Email</label>
                    <Input style= {style_block} labelPosition='right'>
                      <input style={email_size} type='text' onChange={this.onChangeEmailSU.bind(this)} name= 'emailAddressSU' placeholder='e.g. phil.j.hanlon.77'/>
                      <Label>@dartmouth.edu</Label>
                    </Input>
                  </Form.Field>
                  <Form.Field>
                    <label style={vertical_offset}>First Name</label>
                    <Input style= {field_length}>
                      <input style={style_centered} onChange={this.onChangeFirstName.bind(this)} name= 'firstName' placeholder='e.g. Phil' type='text' />
                    </Input>
                  </Form.Field>
                  <Form.Field>
                    <label style={vertical_offset}>Last Name</label>
                    <Input style= {field_length}>
                      <input style={style_centered} onChange={this.onChangeLastName.bind(this)} name= 'lastName' placeholder='e.g. Hanlon' type='text' />
                    </Input>
                  </Form.Field>
                  <Form.Field>
                    <label style={vertical_offset}>Password</label>
                    <Input style= {field_length}>
                      <input style={style_centered} onChange={this.onChangePasswordSU.bind(this)} name= 'passwordSU' placeholder='XXXXXXXXXXXXX' type='password' />
                    </Input>
                    <label style={label_color}>{this.state.passwordErrorText1}</label>
                  </Form.Field>
                  <Form.Field>
                    <label style={vertical_offset}>Verify Password</label>
                    <Input style= {field_length}>
                      <input style={style_centered} onChange={this.onChangeVerifyPasswordSU.bind(this)} name= 'verifyPasswordSU' placeholder='XXXXXXXXXXXXX' type='password' />
                    </Input>
                    <label style={label_color}>{this.state.passwordErrorText2}</label>
                  </Form.Field>
                  <Button style={button_style} onClick={this.onSignUpClick.bind(this)} color='teal' content='Create Account' />
                </Form>
              </Container>
            </Grid.Column>

            <Grid.Column>
              <Container textAlign='center'>
              <Header style={style_centered}>
                Log in:
              </Header>
                <Form>
                  <Form.Field>
                    <label style={vertical_offset}>Email</label>
                    <Input style= {style_block} labelPosition='right'>
                      <input style={email_size} onChange={this.onChangeSignInEmail.bind(this)} name= 'logInEmail' placeholder='e.g. phil.j.hanlon.77' type='text' />
                      <Label>@dartmouth.edu</Label>
                    </Input>
                  </Form.Field>
                  <Form.Field>
                    <label style={vertical_offset}>Password</label>
                    <Input style= {field_length}>
                      <input style={style_centered} onChange={this.onChangeSignInPassword.bind(this)} name= 'logInPassword' placeholder='XXXXXXXXXXXXX' type='password' />
                    </Input>
                  </Form.Field>
                  <Button style={button_style} onClick={this.onLogInClick.bind(this)} color='teal' content='log in' />
                </Form>
              </Container>
            </Grid.Column>
          </Grid>
        );
    }
}

// Sign Up and Log In functions
VerifyEmail.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired,
  userLogInRequest: React.PropTypes.func.isRequired
}

export default (VerifyEmail);
