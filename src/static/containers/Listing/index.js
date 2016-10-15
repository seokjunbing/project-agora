import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/auth';
import classNames from 'classnames';
import { push } from 'react-router-redux';
import Listing from '../../components/Listing';


class ListingView extends React.Component {

    render() {
        return (
          <div>
            <Listing/>
          </div>
        );
    }
}

const mapDispatchToProps = () => {
    return {};
};

var count=0;
function incrementCount(){
    $('#main1').text('You have been logged in for: ' + count + ' seconds!')
    count++;
}
setInterval(function() { incrementCount() }, 1000);

export default connect(mapDispatchToProps)(ListingView);
export { ListingView as ListingViewNotConnected };
