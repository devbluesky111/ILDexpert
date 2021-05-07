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
import { submitLogin } from 'app/auth/store/loginSlice';

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

	function handleSubmit(model) {
		dispatch(submitLogin(model));
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
										value="admin"
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
										value="admin"
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
{/* 
								<table className="text-center w-full mt-32">
									<thead>
										<tr>
											<th>
												<Typography className="font-600" color="textSecondary">
													Role
												</Typography>
											</th>
											<th>
												<Typography className="font-600" color="textSecondary">
													Username
												</Typography>
											</th>
											<th>
												<Typography className="font-600" color="textSecondary">
													Password
												</Typography>
											</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>
												<Typography className="font-600" color="textSecondary">
													Admin
												</Typography>
											</td>
											<td>
												<Typography>admin</Typography>
											</td>
											<td>
												<Typography>admin</Typography>
											</td>
										</tr>
										<tr>
											<td>
												<Typography className="font-600" color="textSecondary">
													Staff
												</Typography>
											</td>
											<td>
												<Typography>staff</Typography>
											</td>
											<td>
												<Typography>staff</Typography>
											</td>
										</tr>
									</tbody>
								</table> */}
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
