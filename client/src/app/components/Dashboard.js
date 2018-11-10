import React from 'react';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        const { username } = this.props;

        return (
            <div>Hello { username }</div>
        );
    }
}

export default Dashboard;