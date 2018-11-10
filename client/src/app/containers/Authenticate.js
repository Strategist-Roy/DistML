import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import Authenticate from '../components/authenticate/Main';

//import action-creators
import { 
	loginAction,
	checkUsernameAvailableAction,
	registerAction
} from '../../actions';

const mapStateToProps = (state, props) => ({
	usernameAvailable: state.uiReducer.usernameAvailable
});

const mapDispatchToProps = dispatch => ({
	onLogin(credentials, history) {    //pass history api for redirect
		dispatch(
			loginAction(credentials, history)
		)
	},
	onRegister(userdata, history) {
		dispatch(
			registerAction(userdata, history)
		)
	},
	checkUsernameAvailable(username) {
		dispatch(
			checkUsernameAvailableAction(username)
		)
	},
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Authenticate));
