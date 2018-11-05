import React from 'react';
import { 
    BrowserRouter
} from 'react-router-dom';

import PageContent from './PageContent';
import {
    TopBar,
    NavBar
} from './containers';

export default () => (
    <div>
        <BrowserRouter>
            <div>
                <TopBar />        {/* The top app-bar which ought to be present globally */}
                <NavBar />        {/* The left-side drawer which ought to be present globally */}
                <PageContent />   {/* Loads component based on Routing */}
            </div>
        </BrowserRouter>
    </div>
);