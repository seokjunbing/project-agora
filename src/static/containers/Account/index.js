import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/auth';
import classNames from 'classnames';
import { push } from 'react-router-redux';
import Account from '../../components/Account';
import CategoryDropdown from '../../components/CategoryDropdown';


class AccountView extends React.Component {

    render() {
        return (
          <div>
            <Account/>
            <CategoryDropdown/>
          </div>
        );
    }
}

const mapDispatchToProps = () => {
    return {};
};



export default connect(mapDispatchToProps)(AccountView);
export { AccountView as AccountViewNotConnected };
