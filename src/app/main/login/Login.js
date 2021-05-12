import FuseAnimate from '@fuse/core/FuseAnimate';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { TextFieldFormsy } from '@fuse/core/formsy';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Formsy from 'formsy-react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from 'app/auth/store/userSlice';
import axios from 'axios';
import Backend from '@utils/BackendUrl';
import swal from 'sweetalert';

const useStyles = makeStyles(theme => ({
	root: {
		background: `linear-gradient(to left, ${theme.palette.primary.dark} 0%, ${darken(
			theme.palette.primary.dark,
			0.5
		)} 100%)`,
		color: theme.palette.primary.contrastText
	},
	leftSection: {},
	rightSection: {
		background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${darken(
			theme.palette.primary.dark,
			0.5
		)} 100%)`,
		color: theme.palette.primary.contrastText
	}
}));

function Login() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const login = useSelector(({ auth }) => auth.login);

	const [isFormValid, setIsFormValid] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const formRef = useRef(null);
	// const [user, setUser] = useState();

	useEffect(() => {
		if (login.error && (login.error.email || login.error.password)) {
			formRef.current.updateInputsWithError({
				...login.error
			});
			disableButton();
		}
	}, [login.error]);

	function disableButton() {
		setIsFormValid(false);
	}

	function enableButton() {
		setIsFormValid(true);
	}

	const handleSubmit = async (model) => {
		const res = await axios.post(Backend.URL + '/login', model, { withCredentials: true, headers: {"Access-Control-Allow-Origin": "*"} });
		if(res.data.status === 'fail') {
			swal("Sorry!", "Your email and password does not match. \n Please try again!", "warning");
		} else {
			let user_data, user;
			user_data = res.data.data[0];
			
			// set the state of the user
			// setUser(user_data);
			// store the user in localStorage
			// localStorage.setItem('user', user_data.email);

			if(user_data.role === 'user') {
				user = {
					password: user_data.password,
					role: 'user',
					data: {
						displayName: user_data.name,
						photoURL: 'assets/images/avatars/Arnold.jpg',
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
						photoURL: 'assets/images/avatars/Abbott.jpg',
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
			dispatch(setUserData(user));
		}
	}

	return (
		<div
			className={clsx(
				classes.root,
				'flex flex-col flex-auto items-center justify-center flex-shrink-0 p-16 md:p-24'
			)}
		>
			<FuseAnimate animation="transition.expandIn">
				<div className="flex w-full max-w-400 md:max-w-3xl rounded-12 shadow-2xl overflow-hidden">
					<Card
						className={clsx(
							classes.leftSection,
							'flex flex-col w-full max-w-sm items-center justify-center shadow-0'
						)}
						square
					>
						<CardContent className="flex flex-col items-center justify-center w-full py-96 max-w-320">
							<FuseAnimate delay={300}>
								<div className="flex items-center mb-32">
									<img className="logo-icon w-100" src="assets/images/logos/fuse.png" alt="logo" />
								</div>
							</FuseAnimate>

							<div className="w-full">
								<div className="flex items-center justify-center mb-8">
									<h1>Log in</h1>
								</div>
								<Formsy
									onValidSubmit={handleSubmit}
									onValid={enableButton}
									onInvalid={disableButton}
									ref={formRef}
									className="flex flex-col justify-center w-full"
								>
									<TextFieldFormsy
										className="mb-16"
										type="text"
										name="email"
										label="Username/Email"
										value="aaaa"
										validations={{
											minLength: 4
										}}
										validationErrors={{
											minLength: 'Min character length is 4'
										}}
										InputProps={{
											endAdornment: (
												<InputAdornment position="end">
													<Icon className="text-20" color="action">
														email
													</Icon>
												</InputAdornment>
											)
										}}
										variant="outlined"
										required
									/>

									<TextFieldFormsy
										className="mb-16"
										type="password"
										name="password"
										label="Password"
										value="123456789"
										validations={{
											minLength: 4
										}}
										validationErrors={{
											minLength: 'Min character length is 4'
										}}
										InputProps={{
											className: 'pr-2',
											type: showPassword ? 'text' : 'password',
											endAdornment: (
												<InputAdornment position="end">
													<IconButton onClick={() => setShowPassword(!showPassword)}>
														<Icon className="text-20" color="action">
															{showPassword ? 'visibility' : 'visibility_off'}
														</Icon>
													</IconButton>
												</InputAdornment>
											)
										}}
										variant="outlined"
										required
									/>

									<Button
										type="submit"
										variant="contained"
										color="primary"
										className="w-full mx-auto mt-16"
										aria-label="LOG IN"
										disabled={!isFormValid}
										value="legacy"
									>
										Login
									</Button>
								</Formsy>
							</div>

						</CardContent>

						<div className="flex flex-col items-center justify-center pb-32">
							<div>
								<span className="font-medium mr-8">Don't have an account?</span>
								<Link className="font-medium" to="/register">
									Register
								</Link>
							</div>
							<Link className="font-medium mt-8" to="/">
								Back to Dashboard
							</Link>
						</div>
					</Card>

					<div
						className={clsx(classes.rightSection, 'hidden md:flex flex-1 items-center justify-center p-64')}
					>
						<div className="max-w-500">
							<FuseAnimate animation="transition.slideUpIn" delay={400}>
								<Typography variant="h3" color="inherit" className="font-800 leading-tight">
									Welcome <br />
									to the <br /> ILDexpert Pilot Study!
								</Typography>
							</FuseAnimate>

							<FuseAnimate delay={500}>
								<Typography variant="subtitle1" color="inherit" className="mt-32">
									This study is designed to explore the value of a pattern-based algorithmic mobile application approach to ILD diagnosis.
								</Typography>
							</FuseAnimate>
						</div>
					</div>
				</div>
			</FuseAnimate>
		</div>
	);
}

export default Login;
