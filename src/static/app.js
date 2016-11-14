import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { authLogoutAndRedirect } from './actions/auth';
import SideMenu from './components/SideMenu';
import NavBar from './components/NavBar';

// More needed here
import './styles/semantic/dist/semantic.min.css';

class App extends React.Component {

    static propTypes = {
        isAuthenticated: React.PropTypes.bool.isRequired,
        children: React.PropTypes.object.isRequired,
        dispatch: React.PropTypes.func.isRequired,
        pathName: React.PropTypes.string.isRequired
    };

    constructor(props) {
        super(props);
        this.sidebarWidthDesktop = 280;
        this.sidebarWidthMobile = 60;

        this.state = {
            containerWidth: 0
        };
    }

    componentDidMount() {
        window.addEventListener('resize', this.setContainerWidth);
        this.setContainerWidth();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.setContainerWidth);
    }

    setContainerWidth = () => {
        const sidebarWidth = document.body.clientWidth > 1200 ? this.sidebarWidthDesktop : this.sidebarWidthMobile;
        this.setState({
            containerWidth: document.body.clientWidth - sidebarWidth
        });
    };

    render() {
        // only show the sidebar for authenticated users
        let bodyContent = null;
        bodyContent = (
            <div>
                {this.props.children}
            </div>
        );

        return (
            <div className="app">
                <NavBar/>
                {bodyContent}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        pathName: ownProps.location.pathname
    };
};

export default connect(mapStateToProps)(App);
export { App as AppNotConnected };
