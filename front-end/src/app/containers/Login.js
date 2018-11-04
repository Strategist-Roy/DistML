import Login from '../components/Login';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

//import action-creators
import { login } from '../../actions';

const mapStateToProps = (state, props) => ({
});

const mapDispatchToProps = dispatch => ({
	onLogin(credentials, history) {    //pass history api for redirect
		dispatch(
			login(credentials, history)
		)
	},
});

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login);
export default withRouter(LoginContainer);
