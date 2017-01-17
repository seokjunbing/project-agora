import React from 'react';
import {Header, Input, Label, Container, Button, Grid, Divider, Form, Checkbox} from 'semantic-ui-react';

class VerifyEmail extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      var style_centered = {
        textAlign: 'center',
      }

      var email_size = {
        textAlign: 'center',
        width: '150px'
      }

      var style_block = {
        display: 'block'
      }

      var vertical_offset = {
        marginTop: '30px'
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
                      <input style={email_size} placeholder='your.name' type='text' />
                      <Label>@dartmouth.edu</Label>
                    </Input>
                  </Form.Field>
                  <Form.Field>
                    <label style={vertical_offset}>Username</label>
                    <Input style= {field_length}>
                      <input style={style_centered} placeholder='DartMan' type='text' />
                    </Input>
                  </Form.Field>
                  <Form.Field>
                    <label style={vertical_offset}>Password</label>
                    <Input style= {field_length}>
                      <input style={style_centered} placeholder='XXXXXXXXXXXXX' type='password' />
                    </Input>
                  </Form.Field>
                  <Form.Field>
                    <label style={vertical_offset}>Verify Password</label>
                    <Input style= {field_length}>
                      <input style={style_centered} placeholder='XXXXXXXXXXXXX' type='password' />
                    </Input>
                  </Form.Field>
                  <Button style={button_style} color='teal' content='Create Account' />
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
                    <label style={vertical_offset}>Username</label>
                    <Input style= {field_length}>
                      <input style={style_centered} placeholder='DartMan' type='text' />
                    </Input>
                  </Form.Field>
                  <Form.Field>
                    <label style={vertical_offset}>Password</label>
                    <Input style= {field_length}>
                      <input style={style_centered} placeholder='XXXXXXXXXXXXX' type='password' />
                    </Input>
                  </Form.Field>
                  <Button style={button_style} color='teal' content='log in' />
                </Form>
              </Container>
            </Grid.Column>
          </Grid>
        );
    }
}

export default (VerifyEmail);
