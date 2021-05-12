import AppBar from '@material-ui/core/AppBar';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Divider from '@material-ui/core/Divider';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { useMemo, useRef, useState } from 'react';
import { RadioGroupFormsy } from '@fuse/core/formsy';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Formsy from 'formsy-react';
import Button from '@material-ui/core/Button';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import Backend from '@utils/BackendUrl';
import axios from 'axios';

function QuestionDialog(props) {

	const [isFormValid, setIsFormValid] = useState(false);
	const formRef = useRef(null);

	function disableButton() {
		setIsFormValid(false);
	}

	function enableButton() {
		setIsFormValid(true);
	}

	function handleSubmit(model) {
		console.log('model===>', model, props.inserted);
		axios.post(Backend.URL + '/add_selected_questions', {'id': props.inserted, 'selectedQuestions':model }, { withCredentials: true, headers: {"Access-Control-Allow-Origin": "*"} })
		.then(() => {
			console.log('Selected questions inserted successfully');
		})
		.catch((err) => {
			console.log(err);
		});
		props.onClose(props.selected.selectedButtonId);
		
	}


	return (
		<Dialog
			open={props.open}
			onClose={props.onClose}
			fullWidth
			maxWidth="xl"
			classes={{
				paper: 'rounded-8'
			}}
		>
			<AppBar position="static" className="shadow-md">
				<Toolbar className="flex w-full">
					<Typography variant="subtitle1" color="inherit" className="text-28">
						ILDexpert Multiple Choice Questions
					</Typography>
				</Toolbar>
			</AppBar>

			<DialogContent classes={{ root: 'p-16' }}>
				<div className="mb-16">
					<div className="mx-32">
						<Formsy
							onValidSubmit={handleSubmit}
							onValid={enableButton}
							onInvalid={disableButton}
							ref={formRef}
							className="flex flex-col justify-center w-full"
						>
							<div className="text-20">
								What is your favored diagnosis for {props.selected.selectedButtonSubject}?			
							</div>
							<RadioGroupFormsy
								className="mb-4"
								name="question_one"
								variant="outlined"
								color="primary"
								value="Alveolar proteinosis"
								required
							>
								{useMemo(
									() =>
										props.questionOneData &&
										(props.questionOneData.length > 0 ? (
											<FuseAnimateGroup
												enter={{
													animation: 'transition.slideUpBigIn'
												}}
												className="flex flex-wrap pt-6 pb-24"
											>
												<div className="grid grid-cols-3 gap-4 my-2">
													{props.questionOneData.map(question => {
														return (
															<div key={question.id}>
																<FormControlLabel value={question.question_one} control={<Radio color="primary"/>} label={question.question_one} />
															</div>
														);
													})}
												</div>
											</FuseAnimateGroup>
										) : (
											<div className="flex flex-1 items-center justify-center">
												<Typography color="textSecondary" className="text-24 my-24">
													No questions found!
												</Typography>
											</div>
										)),
									[props]
								)}
							</RadioGroupFormsy>

							<div className="text-20 mt-4">
								What is your level of diagnostic confidence for {props.selected.selectedButtonSubject}? 
							</div>
							<RadioGroupFormsy
								className="my-4"
								name="question_two"
								variant="outlined"
								color="primary"
								value="Medium"
								required
							>
								{useMemo(
									() =>
										props.questionTwoData &&
										(props.questionTwoData.length > 0 ? (
											<FuseAnimateGroup
												enter={{
													animation: 'transition.slideUpBigIn'
												}}
												className="flex flex-wrap pt-6 pb-12"
											>
												<div className="grid grid-cols-3 gap-4 my-2">
													{props.questionTwoData.map(question => {
														return (
															<div key={question.id}>
																<FormControlLabel value={question.question_two} control={<Radio color="primary"/>} label={question.question_two} />
															</div>
														);
													})}
												</div>
											</FuseAnimateGroup>
										) : (
											<div className="flex flex-1 items-center justify-center">
												<Typography color="textSecondary" className="text-24 my-24">
													No questions found!
												</Typography>
											</div>
										)),
									[props]
								)}
							</RadioGroupFormsy>

							<Button
								type="submit"
								variant="contained"
								color="primary"
								className="w-full mx-auto my-8"
								aria-label="REGISTER"
								disabled={!isFormValid}
								value="legacy"
							>
								Submit
							</Button>
						</Formsy>
					</div>
					<Divider className="mx-24" />
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default QuestionDialog;
