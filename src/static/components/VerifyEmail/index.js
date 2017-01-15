import React from 'react';
import {Header, Input, Label, Container, Button, Grid, Divider, Form, Checkbox} from 'semantic-ui-react';

class VerifyEmail extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      var style_head = {
        textAlign: 'center',
      }

      var style_input = {
        display: 'block',
        textAlign: 'center',
        marginTop: '45px',
      }

      var label_email = {
        marginTop: '30px',
        marginLeft: '170px'
      }

      var label_email_style = {
        width: '150px',
        marginLeft: '170px'
      }

      var label_username_style = {
        width: '279px',
        marginLeft: '170px'
      }

      var label_password = {
        marginTop: '30px',
        marginRight: '219px'
      }

      var label_username_login = {
        width: '279px'
      }

      var button_style = {
        marginTop: '30px',
        marginLeft: '243',
        textAlign: 'center'
      }

      var button_style_login = {
        marginTop: '30px',
        textAlign: 'center'
      }

        return (

          <Grid columns={2} relaxed>
            <Grid.Column>
              <Container>
                <Header style={style_head}>
                  Sign up for Agora:
                </Header>
                <Form>
                  <Form.Field>
                    <label style={label_email}>Email</label>
                    <Input style= {label_email_style} labelPosition='right'>
                      <input style={style_head} placeholder='your.name' type='text' />
                      <Label>@dartmouth.edu</Label>
                    </Input>
                  </Form.Field>
                  <Form.Field>
                    <label style={label_email}>Username</label>
                    <Input style= {label_username_style}>
                      <input style={style_head} placeholder='DartMan' type='text' />
                    </Input>
                  </Form.Field>
                  <Form.Field>
                    <label style={label_email}>Password</label>
                    <Input style= {label_username_style}>
                      <input style={style_head} placeholder='XXXXXXXXXXXXX' type='password' />
                    </Input>
                  </Form.Field>
                  <Form.Field>
                    <label style={label_email}>Verify Password</label>
                    <Input style= {label_username_style}>
                      <input style={style_head} placeholder='XXXXXXXXXXXXX' type='password' />
                    </Input>
                  </Form.Field>
                  <Button style={button_style} color='teal' content='Create Account' />
                </Form>
              </Container>
            </Grid.Column>

            <Grid.Column>
              <Container textAlign='center'>
              <Header style={style_head}>
                Log in:
              </Header>
                <Form>
                  <Form.Field>
                    <label style={label_password}>Username</label>
                    <Input style= {label_username_login}>
                      <input style={style_head} placeholder='DartMan' type='text' />
                    </Input>
                  </Form.Field>
                  <Form.Field>
                    <label style={label_password}>Password</label>
                    <Input style= {label_username_login}>
                      <input style={style_head} placeholder='XXXXXXXXXXXXX' type='password' />
                    </Input>
                  </Form.Field>
                  <Button style={button_style_login} color='teal' content='log in' />
                </Form>
              </Container>
            </Grid.Column>
          </Grid>
        );
    }
}

export default (VerifyEmail);
