import React from 'react';
import { Button } from 'semantic-ui-react';
import classNames from 'classnames';


class ContactAdmin extends React.Component {

  constructor(props) {
      super(props);
  }

    render() {

      var center_style = {
        textAlign: 'center'
      }

      var button_style = {
        marginTop: '5px',
        textAlign: 'center'
      }

        return (
            <div style= {center_style} className="ui raised very padded text container segment">
              <h2 className="ui header">Contact Admin</h2>
            </div>
        );
    }
}

export default (ContactAdmin);
