import React from 'react';
import {Header, Input, Label, Container, Button, Grid, Divider} from 'semantic-ui-react';

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

      var label_style1 = {
        width: '150px',
        textAlign: 'left'
      }

      var label_style2 = {
        width: '150px',
        textAlign: 'right'
      }

      var button_style = {
        marginTop: '45px',
        textAlign: 'center',
      }

        return (

          <Grid columns={2} relaxed>
            <Grid.Column>
              <Container textAlign='center'>
                <Header style={style_head}>
                  Sign up for Agora today:
                </Header>
                <Input style={style_input} labelPosition='right'>
                  <input type='text' />
                  <Label style={label_style1}>@dartmouth.edu</Label>
                </Input>
                <Input style={style_input} labelPosition='left'>
                  <Label basic style={label_style2}>username:</Label>
                  <input type='text'/>
                </Input>
                <Input style={style_input} labelPosition='left'>
                  <Label basic style={label_style2}>password:</Label>
                  <input type='password'/>
                </Input>
                <Input style={style_input} labelPosition='left'>
                  <Label basic style={label_style2}>verify password:</Label>
                  <input type='password'/>
                </Input>
                <Button style={button_style} color='teal' content='Create Account' />
              </Container>
            </Grid.Column>

            <Grid.Column>
              <Container textAlign='center'>
              <Header style={style_head}>
                Log in:
              </Header>

              <Input style={style_input} labelPosition='left'>
                <Label basic style={label_style2}>username:</Label>
                <input type='text'/>
              </Input>

              <Input style={style_input} labelPosition='left'>
                <Label basic style={label_style2}>password:</Label>
                <input type='password'/>
              </Input>

              <Button style={button_style} color='teal' content='log in' />

              </Container>
            </Grid.Column>
          </Grid>
        );
    }
}

export default (VerifyEmail);
