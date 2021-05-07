import AppBar from '@material-ui/core/AppBar';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Divider from '@material-ui/core/Divider';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
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
						onClick={props.onClose}
					>
						<Icon>close</Icon>
					</IconButton>
				</Toolbar>
			</AppBar>

			<DialogContent classes={{ root: 'p-0' }}>
				<div className="mb-16">
					<div className="px-12">
						<div className="flex justify-center">
							<RadioGroup
								className="mt-16"
								name="reading case"
								variant="outlined"
								color="primary"
								row
								// validations="equals:female"
								// validationError="Only ladies are accepted"
								required
							>
								<FormControlLabel value="pretest" control={<Radio color="primary"/>} label="Pretest reading" style={{marginRight:"100px"}}/>
								<FormControlLabel value="posttest" control={<Radio color="primary"/>} label="Posttest reading"/>
							</RadioGroup>							
						</div>
					</div>
					<div className="p-6">
						<div className="flex justify-center">
							{/* <img src={props.imageURL} alt="autumn.jpg" style={{width:'auto',height:'780px'}}/> */}
							<img src="assets/images/calendar/autumn.jpg" alt="autumn.jpg" style={{width:'auto',height:'780px'}}/>
						</div>
					</div>
					<Divider className="mx-24" />
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default ImageDialog;