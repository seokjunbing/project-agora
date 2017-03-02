import React from 'react';
import ContactAdmin from '../../components/ContactAdmin';
import { browserHistory } from 'react-router';
import { Router } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import classNames from 'classnames';
import * as contactAdminActionCreators from '../../actions/contactActions';


class ContactAdminView extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
      return (
        <div>
          <ContactAdmin adminContactRequest={this.props.contactActions.adminContactRequest}/>
        </div>
      );
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        contactActions: bindActionCreators(contactAdminActionCreators, dispatch)
    };
};

export default connect(null, mapDispatchToProps)(ContactAdminView);
export { ContactAdminView as ContactAdminViewNotConnected };
