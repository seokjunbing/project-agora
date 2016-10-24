import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/auth';
import classNames from 'classnames';
import { push } from 'react-router-redux';
import Account from '../../components/Account';
import Category_dd_menu from '../../components/Category_dd_menu';


class AccountView extends React.Component {

    render() {
        return (
          <div>
            <Account/>
            <Category_dd_menu/>
          </div>
        );
    }
}

const mapDispatchToProps = () => {
    return {};
};



export default connect(mapDispatchToProps)(AccountView);
export { AccountView as AccountViewNotConnected };
