import FuseAnimate from '@fuse/core/FuseAnimate';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { TextFieldFormsy, SelectFormsy } from '@fuse/core/formsy';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import Formsy from 'formsy-react';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submitRegister } from 'app/auth/store/registerSlice';

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
		background: `linear-gradient(to left, ${theme.palette.primary.dark} 0%, ${darken(
			theme.palette.primary.dark,
			0.5
		)} 100%)`,
		color: theme.palette.primary.contrastText
	}
}));

function Register() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const register = useSelector(({ auth }) => auth.register);

	const [isFormValid, setIsFormValid] = useState(false);
	const formRef = useRef(null);

	useEffect(() => {
		if (register.error && (register.error.username || register.error.password || register.error.email)) {
			formRef.current.updateInputsWithError({
				...register.error
			});
			disableButton();
		}
	}, [register.error]);

	function disableButton() {
		setIsFormValid(false);
	}

	function enableButton() {
		setIsFormValid(true);
	}

	function handleSubmit(model) {
		dispatch(submitRegister(model));
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
								<div className="flex items-center justify-center mb-32">
									<img className="logo-icon w-100" src="assets/images/logos/fuse.png" alt="logo" />
								</div>
							</FuseAnimate>
							<div className="w-full">
								<div className="flex items-center justify-center mb-8">
									<h1>Sign Up</h1>
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
										name="displayName"
										label="Display name"
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
														person
													</Icon>
												</InputAdornment>
											)
										}}
										variant="outlined"
										required
									/>

									<TextFieldFormsy
										className="mb-16"
										type="text"
										name="email"
										label="Email"
										validations="isEmail"
										validationErrors={{
											isEmail: 'Please enter a valid email'
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
										validations="equalsField:password-confirm"
										validationErrors={{
											equalsField: 'Passwords do not match'
										}}
										InputProps={{
											endAdornment: (
												<InputAdornment position="end">
													<Icon className="text-20" color="action">
														vpn_key
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
										name="password-confirm"
										label="Confirm Password"
										validations="equalsField:password"
										validationErrors={{
											equalsField: 'Passwords do not match'
										}}
										InputProps={{
											endAdornment: (
												<InputAdornment position="end">
													<Icon className="text-20" color="action">
														vpn_key
													</Icon>
												</InputAdornment>
											)
										}}
										variant="outlined"
										required
									/>

									<SelectFormsy
										className="my-16"
										name="related-outlined"
										label="Who Are You"
										value="none"
										// validations="equals:none"
										// validationError="Must be None"
										variant="outlined"
									>
										<MenuItem value="none">
											<em>Please click here</em>
										</MenuItem>
										<MenuItem value="training">I am a Pathologist in training (resident or fellow)</MenuItem>
										<MenuItem value="general">I am a general Pathologist</MenuItem>
										<MenuItem value="pulmonary">I am a pulmonary Pathologist</MenuItem>
									</SelectFormsy>

									<Button
										type="submit"
										variant="contained"
										color="primary"
										className="w-full mx-auto mt-16"
										aria-label="REGISTER"
										disabled={!isFormValid}
										value="legacy"
									>
										Register
									</Button>
								</Formsy>
							</div>

						</CardContent>

						<div className="flex flex-col items-center justify-center pb-32">
							<div>
								<span className="font-medium mr-8">Already have an account?</span>
								<Link className="font-medium" to="/login">
									Login
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

export default Register;
