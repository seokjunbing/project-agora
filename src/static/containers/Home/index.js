import React from 'react';
import { connect } from 'react-redux';
import ReactDom from 'react-dom';
import WelcomeBanner from '../../components/WelcomeBanner';
import ListingTile from '../../components/ListingTile';

class HomeView extends React.Component {

    static propTypes = {
        statusText: React.PropTypes.string
    };

    render() {
        return (
            <div>
                <WelcomeBanner/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        statusText: state.auth.statusText
    };
};

export default connect(mapStateToProps)(HomeView);
export { HomeView as HomeViewNotConnected };
