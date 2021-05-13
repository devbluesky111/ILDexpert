import FuseSplashScreen from '@fuse/core/FuseSplashScreen';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { hideMessage, showMessage } from 'app/store/fuse/messageSlice';
import Backend from '@utils/BackendUrl';
import axios from 'axios';
import { setUserData, logoutUser } from './store/userSlice';

class Auth extends Component {
	state = {
		waitAuthCheck: true
	};

	componentDidMount() {
		const init = async () => {
			console.log('init function');
			const res = await axios.post(Backend.URL + '/check_login', {params: 'check_login'} , { withCredentials: true, headers: {"Access-Control-Allow-Origin": "*"} });
			if(res.data.status === 'success') {
				let user_data, user;
				user_data = res.data.data[0];
				if(user_data.role === 'staff') {
					user = {
						password: user_data.password,
						role: 'staff',
						data: {
							displayName: user_data.name,
							photoURL: 'assets/images/avatars/avatar.png',
							email: user_data.email,
							settings: {
							layout: {
								style: 'layout2',
								config: {
								mode: 'fullwidth',
								scroll: 'content',
								navbar: {
									display: true
								},
								toolbar: {
									display: true,
									position: 'below'
								},
								footer: {
									display: true,
									style: 'fixed'
								}
								}
							},
							customScrollbars: true,
							theme: {
								main: 'greeny',
								navbar: 'mainThemeDark',
								toolbar: 'mainThemeDark',
								footer: 'mainThemeDark'
							}
							},
							shortcuts: ['calendar', 'mail', 'contacts', 'todo']
						}
					}
				}
				if(user_data.role === 'admin') {
					user = {
						password: user_data.password,
						role: 'admin',
						data: {
							displayName: user_data.name,
							photoURL: 'assets/images/avatars/avatar.png',
							email: user_data.email,
							settings: {
							layout: {
								style: 'layout2',
								config: {
								mode: 'fullwidth',
								scroll: 'content',
								navbar: {
									display: true
								},
								toolbar: {
									display: true,
									position: 'below'
								},
								footer: {
									display: true,
									style: 'fixed'
								}
								}
							},
							customScrollbars: true,
							theme: {
								main: 'greeny',
								navbar: 'mainThemeDark',
								toolbar: 'mainThemeDark',
								footer: 'mainThemeDark'
							}
							},
							shortcuts: ['calendar', 'mail', 'contacts', 'todo']
						}
					}		
				}
				this.props.setUserData(user);
				// this.props.showMessage({ message: 'Logged in with Session' });
			} else {
				this.props.logout();
				// this.props.showMessage({ message: res.status.message });
				
			}
			this.setState({ waitAuthCheck: false });
		}
		init();
	}
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
