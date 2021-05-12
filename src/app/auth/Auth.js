import FuseSplashScreen from '@fuse/core/FuseSplashScreen';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { hideMessage, showMessage } from 'app/store/fuse/messageSlice';
// import Backend from '@utils/BackendUrl';
// import axios from 'axios';
import { setUserData, logoutUser } from './store/userSlice';

class Auth extends Component {
	state = {
		waitAuthCheck: false
	};

	// componentDidMount() {
	// 	return Promise.all([
	// 		this.loginCheck()
	// 	]).then(() => {
	// 		this.setState({ waitAuthCheck: false });
	// 	});
	// }

	loginCheck = () =>
		new Promise(resolve => {
			const init = async () => {
				const loggedInUser = localStorage.getItem("user");
				if (loggedInUser) {
					resolve();
				} else {
					console.log('goto login page');
				}
				// const res = await axios.post(Backend.URL + '/check_login', {params: 'check_login'} , { withCredentials: true, headers: {"Access-Control-Allow-Origin": "*"} });
				// if(res.status === 'success') {
				// 	console.log('the data after login check===>',res.data);
				// 	this.props.setUserData(res.data.user);
				// 	resolve();
				// 	this.props.showMessage({ message: 'Logged in with Session' });
				// } else {
				// 	this.props.showMessage({ message: res.status.message });
				// 	console.log('Not logged in');
				// 	resolve();
				// }
			}
			init();
		});

	render() {
		return this.state.waitAuthCheck ? <FuseSplashScreen /> : <>{this.props.children}</>;
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			logout: logoutUser,
			setUserData,
			showMessage,
			hideMessage
		},
		dispatch
	);
}

export default connect(null, mapDispatchToProps)(Auth);
