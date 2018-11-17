"use strict"

import React from 'react';
import {
    BrowserRouter,
    Route
} from 'react-router-dom';
import { connect } from 'react-redux';

import DashboardPage from '../DashboardPage/DashboardPage'
import TopNav from '../TopNav/TopNav';
import TopNavLogin from '../TopNav/TopNavLogin';
import Footer from '../Footer/Footer';

import 'bootstrap/dist/css/bootstrap.min.css';


class MainPage extends React.Component {
    render() {

        return (

            <div>
                <Route path="/dashboard" component={DashboardPage} />
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {

    };
}
export default connect(mapStateToProps)(MainPage);