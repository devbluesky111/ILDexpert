import AppBar from '@material-ui/core/AppBar';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Divider from '@material-ui/core/Divider';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
// import RadioGroup from '@material-ui/core/RadioGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Radio from '@material-ui/core/Radio';
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
						{props.selected.selectedSubject}
					</Typography>
					<IconButton
						className="min-w-auto"
						onClick={() => props.onClose(props.selected.selectedId)}
					>
						<Icon>close</Icon>
					</IconButton>
				</Toolbar>
			</AppBar>

			<DialogContent classes={{ root: 'p-0' }}>
				<div className="mb-16">
					<div className="p-6">
						<div className="flex justify-center">
							<iframe src={props.selected.selectedApiURL} title={props.selected.selectedSubject} style={{width:'100%',height:'780px'}}></iframe>							
						</div>
					</div>
					<Divider className="mx-24" />
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default ImageDialog;
