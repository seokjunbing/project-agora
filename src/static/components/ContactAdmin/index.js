import React from 'react';
import {Header, Input, Label, Container, Button, Grid, Divider, Form, TextArea} from 'semantic-ui-react';
import classNames from 'classnames';
import axios from 'axios';


class ContactAdmin extends React.Component {

  constructor(props) {
      super(props);

      // user sign up state variables
      this.state = {
        userEmail: '',
        userName: '',
        issueTitle: '',
        issueText: '',

        // error texts
        emailErrorText: '',
        nameErrorText: '',
        issueErrorText: '',
        textErrorText: '',

        // boolean flags
        emailOK: '0',
        nameOK: '0',
        titleOK: '0',
        textOK: '0'
      };

  }

  // update the value of the userEmail state variable for contact
  onChangeUserEmail = (e) => {
    e.preventDefault();
    // automatically convert it to lowercase
    this.setState({ userEmail : e.target.value.toLowerCase() });

    // basic error checking
    if ((e.target.value.length < 10) || (e.target.value.length >= 40)){
      this.setState({ emailErrorText : "Email should be 10 to 40 characters long!" });
      this.setState({ emailOK: '0' });
    }
    else if (e.target.value.includes(" ")){
      this.setState({ emailErrorText : "Whitespace not allowed" });
      this.setState({ emailOK: '0' });
    }
    else if (!(e.target.value.includes("@"))){
      this.setState({ emailErrorText : "Not a valid address" });
      this.setState({ emailOK: '0' });
    }
    else {
      this.setState({ emailErrorText : "" });
      this.setState({ emailOK: '1' });
    }
  }

  // update the value of the userName state variable for contact
  onChangeUserName = (e) => {
    e.preventDefault();
    // automatically convert it to lowercase
    this.setState({ userName : e.target.value.toLowerCase() });
    // accept name
    this.setState({ nameOK : '1' });
  }

  // update the value of the issueTitle state variable for contact
  onChangeIssueTitle = (e) => {
    e.preventDefault();
    // automatically convert it to lowercase
    this.setState({ issueTitle : e.target.value.toLowerCase() });
    // accept issue title
    this.setState({ titleOK : '1' });
  }

  // update the value of the issueText state variable for contact
  onChangeIssueText = (e) => {
    e.preventDefault();
    // automatically convert it to lowercase
    this.setState({ issueText : e.target.value.toLowerCase() });
    // accept issue text
    this.setState({ textOK : '1' });
  }

  // handle the onClick event for Contact
  onContactClick = (e) => {
    e.preventDefault();

    // check boolean flags
    if ((this.state.emailOK == 1) && (this.state.nameOK == 1) && (this.state.titleOK == 1) && (this.state.textOK == 1)){
      // post the data to the API url if everything is good
      this.props.adminContactRequest(this.state);
    }
    else {
      // set error messages
      if ((this.state.emailOK == 0)){
        this.setState({ emailErrorText : "This field is required" });
      }
      if ((this.state.nameOK == 0)){
        this.setState({ nameErrorText : "This field is required" });
      }
      if ((this.state.titleOK == 0)){
        this.setState({ issueErrorText : "This field is required" });
      }
      if ((this.state.textOK == 0)){
        this.setState({ textErrorText : "This field is required" });
      }
    }

  }

    render() {

      var style_centered = {
        textAlign: 'center'
      }

      var style_header = {
        textAlign: 'center',
        height: '110px'
      }

      var button_style = {
        marginTop: '5px',
        textAlign: 'center',
        marginBottom: '20px'
      }

      var vertical_offset = {
        marginTop: '15px'
      }

      var style_block = {
        display: 'block'
      }

      var box_size = {
        textAlign: 'center',
        width: '280px'
      }

      var text_box_size = {
        width: '280px'
      }

      var label_color = {
        color: 'Red'
      }

        return (
            // contact form
            <Container textAlign='center'>
            <div style= {style_header} className="ui raised padded text container segment">
              <h2 className="ui header">Have a question?</h2>
              <p>Get in touch!</p>
            </div>
              <Form>
                <Form.Field>
                  <label style={vertical_offset}>Personal Email</label>
                  <Input style= {style_block}>
                    <input style={box_size} type='text' onChange={this.onChangeUserEmail.bind(this)} name= 'userEmail' placeholder='e.g. dead.pikachu2002@hotmail.com'/>
                  </Input>
                  <label style={label_color}>{this.state.emailErrorText}</label>
                </Form.Field>
                <Form.Field>
                  <label style={vertical_offset}>Name</label>
                  <Input style= {box_size}>
                    <input style={style_centered} onChange={this.onChangeUserName.bind(this)} name= 'userName' placeholder='e.g. John Doe' type='text' />
                  </Input>
                  <label style={label_color}>{this.state.nameErrorText}</label>
                </Form.Field>
                <Form.Field>
                  <label style={vertical_offset}>Subject</label>
                  <Input style= {box_size}>
                    <input style={style_centered} onChange={this.onChangeIssueTitle.bind(this)} name= 'issueTitle' placeholder="e.g. Can't create listings" type='text' />
                  </Input>
                  <label style={label_color}>{this.state.issueErrorText}</label>
                </Form.Field>
                <Form.Field>
                  <label style={vertical_offset}>Questions/Comments/Concerns</label>
                  <TextArea onChange={this.onChangeIssueText.bind(this)} name= 'issueText' style={text_box_size} placeholder="Let us hear from you..." />
                  <label style={label_color}>{this.state.textErrorText}</label>
                </Form.Field>
                <Button style={button_style} onClick={this.onContactClick.bind(this)} color='teal' content='Contact Us' />
                </Form>
            </Container>
        );
    }
}

// contact function
ContactAdmin.propTypes = {
  adminContactRequest: React.PropTypes.func.isRequired
}

export default (ContactAdmin);
