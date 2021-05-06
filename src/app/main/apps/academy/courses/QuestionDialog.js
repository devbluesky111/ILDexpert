import AppBar from '@material-ui/core/AppBar';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Divider from '@material-ui/core/Divider';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React from 'react';

function QuestionDialog(props) {

	return (
		<Dialog
			open={props.open}
			onClose={props.onClose}
			fullWidth
			maxWidth="md"
			classes={{
				paper: 'rounded-8'
			}}
		>
			<AppBar position="static" className="shadow-md">
				<Toolbar className="flex w-full">
					<Typography variant="subtitle1" color="inherit">
						Question Modal
					</Typography>
				</Toolbar>
			</AppBar>

			<DialogContent classes={{ root: 'p-0' }}>
				<div className="mb-16">
					<div className="flex items-center justify-between p-12">
						<div className="flex">
							Question Content 1 here....
						</div>
					</div>
					<Divider className="mx-24" />
				</div>

				<div className="px-16 sm:px-24">
					Question Content 2 here....					
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default QuestionDialog;
