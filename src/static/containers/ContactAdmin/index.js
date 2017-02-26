import React from 'react';
import ContactAdmin from '../../components/ContactAdmin';
import { browserHistory } from 'react-router';
import { Router } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';



class ContactAdminView extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
      return (
        <div>
          <ContactAdmin/>
        </div>
      );
  }
}

const mapDispatchToProps = () => {
    return {};
};

export default connect(mapDispatchToProps)(ContactAdminView);
export { ContactAdminView as ContactAdminViewNotConnected };
