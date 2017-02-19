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
        emailErrorText: '',
        firstNameErrorText: '',
        lastNameErrorText: '',

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
      // set it automatically to lowercase
      this.setState({ emailAddressSU : e.target.value.toLowerCase() });

      // basic error checking
      if ((e.target.value.length < 4) || (e.target.value.length >= 40)){
        this.setState({ emailErrorText : "Email should be 4 to 40 characters long!" });
        this.setState({ emailOK: '0' });
      }
      else if (e.target.value.includes(" ")){
        this.setState({ emailErrorText : "Whitespace not allowed" });
        this.setState({ emailOK: '0' });
      }
      else if (e.target.value.includes("@")){
        this.setState({ emailErrorText : "'@' not allowed" });
        this.setState({ emailOK: '0' });
      }
      else {
        this.setState({ emailErrorText : "" });
        this.setState({ emailOK: '1' });
      }
    }

    // update the value of the firstName state variable
    onChangeFirstName = (e) => {
      e.preventDefault();
      this.setState({ firstName : e.target.value });

      if ((e.target.value.length < 2) || (e.target.value.length > 25)){
        this.setState({ firstNameErrorText : "First name should be 2 to 25 characters long!" });
        this.setState({ firstNameOK: '0' });
      }
      else if (!(/^[A-Za-z]+$/.test(e.target.value))){
        this.setState({ firstNameErrorText : "Only letters allowed!" });
        this.setState({ firstNameOK: '0' });
      }
      else {
        this.setState({ firstNameErrorText : "" });
        this.setState({ firstNameOK: '1' });
      }
    }

    // update the value of the lastName state variable
    onChangeLastName = (e) => {
      e.preventDefault();
      this.setState({ lastName : e.target.value });

      if ((e.target.value.length < 2) || (e.target.value.length > 25)){
        this.setState({ lastNameErrorText : "Last name should be 2 to 25 characters long!" });
        this.setState({ lastNameOK: '0' });
      }
      else if (!(/^[A-Za-z]+$/.test(e.target.value))){
        this.setState({ lastNameErrorText : "Only letters allowed!" });
        this.setState({ lastNameOK: '0' });
      }
      else {
        this.setState({ lastNameErrorText : "" });
        this.setState({ lastNameOK: '1' });
      }
    }

    // update the value of the passwordSU state variable
    onChangePasswordSU = (e) => {
      e.preventDefault();
      this.setState({ passwordSU : e.target.value });

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

      // check boolean flags
      if ((this.state.emailOK == 1) && (this.state.firstNameOK == 1) && (this.state.lastNameOK == 1) && (this.state.passwordOK == 1)){
        // post the data to the API url if everything is good
        this.props.userSignupRequest(this.state);
      }
      else {
        // set error messages
        if ((this.state.emailOK == 0)){
          this.setState({ emailErrorText : "This field is required" });
        }
        if ((this.state.firstNameOK == 0)){
          this.setState({ firstNameErrorText : "This field is required" });
        }
        if ((this.state.lastNameOK == 0)){
          this.setState({ lastNameErrorText : "This field is required" });
        }
        if ((this.state.passwordOK == 0)){
          this.setState({ passwordErrorText1 : "This field is required" });
          this.setState({ passwordErrorText2 : "This field is required" });
        }
      }
    }

    // update the value of the email state variable for Log In
    onChangeSignInEmail = (e) => {
      e.preventDefault();
      // automatically convert it to lowercase
      this.setState({ logInEmail : e.target.value.toLowerCase() });
    }

    // update the value of the password state variable for Log in
    onChangeSignInPassword = (e) => {
      e.preventDefault();
      this.setState({ logInPassword : e.target.value });
    }

    // handle the onClick event for account Log In
    onLogInClick = (e) => {
      e.preventDefault();

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
        marginTop: '20px',
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
                    <label style={label_color}>{this.state.emailErrorText}</label>
                  </Form.Field>
                  <Form.Field>
                    <label style={vertical_offset}>First Name</label>
                    <Input style= {field_length}>
                      <input style={style_centered} onChange={this.onChangeFirstName.bind(this)} name= 'firstName' placeholder='e.g. Phil' type='text' />
                    </Input>
                    <label style={label_color}>{this.state.firstNameErrorText}</label>
                  </Form.Field>
                  <Form.Field>
                    <label style={vertical_offset}>Last Name</label>
                    <Input style= {field_length}>
                      <input style={style_centered} onChange={this.onChangeLastName.bind(this)} name= 'lastName' placeholder='e.g. Hanlon' type='text' />
                    </Input>
                    <label style={label_color}>{this.state.lastNameErrorText}</label>
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
