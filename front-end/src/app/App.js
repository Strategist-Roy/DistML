import React from 'react';
import { 
    BrowserRouter,
    Route,
    Switch
} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import { 
    Login,
    Dashboard 
} from './containers';

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/login" component={Login} />
                    <PrivateRoute path="/" component={Dashboard} />
                </Switch>
            </BrowserRouter>
        )
    }
}

export default App;