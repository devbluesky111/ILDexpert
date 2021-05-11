import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React from 'react';

const useStyles = makeStyles(theme => ({
	root: {
		'& .logo-icon': {
			width: 100,
			height: 25,
			transition: theme.transitions.create(['width', 'height'], {
				duration: theme.transitions.duration.shortest,
				easing: theme.transitions.easing.easeInOut
			})
		},
		'& .react-badge, & .logo-text': {
			transition: theme.transitions.create('opacity', {
				duration: theme.transitions.duration.shortest,
				easing: theme.transitions.easing.easeInOut
			})
		}
	},
	reactBadge: {
		backgroundColor: '#121212',
		color: '#61DAFB'
	}
}));

function Logo() {
	const classes = useStyles();

	return (
		<div className={clsx(classes.root, 'flex items-center')}>
			<a href="/">
				<img className="logo-icon w-100" src="assets/images/logos/fuse.png" alt="logo" />
			</a>
		</div>
	);
}

export default Logo;
