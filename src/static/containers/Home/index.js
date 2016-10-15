import React from 'react';
import { connect } from 'react-redux';
import ReactDom from 'react-dom';
import NavBar from '../../components/NavBar';
import WelcomeBanner from '../../components/WelcomeBanner';

class HomeView extends React.Component {

    static propTypes = {
        statusText: React.PropTypes.string
    };

    componentDidMount() {
        $(ReactDom.findDOMNode(this.refs.dropdown)).dropdown();
    }

    componentDidUpdate() {
        $(ReactDom.findDOMNode(this.refs.dropdown)).dropdown('refresh');
    }

    render() {
        return (
            <div>
                <NavBar/>
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
