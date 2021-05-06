import AppBar from '@material-ui/core/AppBar';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Divider from '@material-ui/core/Divider';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import React from 'react';

function ImageDialog(props) {

	return (
		<Dialog
			open={props.open}
			onClose={props.onClose}
			fullWidth
			maxWidth="xl"
			fullScreen
			classes={{
				paper: 'rounded-8'
			}}
		>
			<AppBar position="static" className="shadow-md">
				<Toolbar className="flex w-full justify-between">
					<Typography variant="subtitle1" color="inherit">
						Case One
					</Typography>
					<IconButton
						className="min-w-auto"
					>
						<Icon>close</Icon>
					</IconButton>
				</Toolbar>
			</AppBar>

			<DialogContent classes={{ root: 'p-0' }}>
				<div className="mb-16">
					<div className="flex items-center justify-content-center p-12">
						<div className="flex justify-content-center">
							<img src="assets/images/calendar/autumn.jpg" alt="autumn.jpg" style={{width:'auto',height:'800px',margin:'auto'}}/>
						</div>
					</div>
					<Divider className="mx-24" />
				</div>

				<div className="px-16 sm:px-24">
					Content 2 here....					
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default ImageDialog;
