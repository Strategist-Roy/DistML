import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import Authenticate from '../components/authenticate/Main';

//import action-creators
import { loginAction } from '../../actions';

const mapStateToProps = (state, props) => ({
});

const mapDispatchToProps = dispatch => ({
	onLogin(credentials, history) {    //pass history api for redirect
		dispatch(
			loginAction(credentials, history)
		)
	},
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Authenticate));
