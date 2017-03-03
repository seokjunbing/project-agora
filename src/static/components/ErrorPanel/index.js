import React from 'react';
import { Segment } from 'semantic-ui-react'


class ErrorPanel extends React.Component {
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
      }

        return (
          <Segment style={center_style} padded='very' size='big' inverted color = 'red'>
            Cannot display content! Verify your account and log in!
          </Segment>
        )
      }
    }

export default(ErrorPanel);
