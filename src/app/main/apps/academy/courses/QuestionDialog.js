import AppBar from '@material-ui/core/AppBar';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Divider from '@material-ui/core/Divider';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { useRef, useState } from 'react';
import { RadioGroupFormsy } from '@fuse/core/formsy';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Formsy from 'formsy-react';
import Button from '@material-ui/core/Button';

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
		console.log('modal', model);
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

			<DialogContent classes={{ root: 'p-32' }}>
				<div className="mb-16">
					<div className="m-32">
						<Formsy
							onValidSubmit={handleSubmit}
							onValid={enableButton}
							onInvalid={disableButton}
							ref={formRef}
							className="flex flex-col justify-center w-full"
						>
							<div className="text-24 mb-8">
								What is your favored diagnosis for Case XX?			
							</div>
							<RadioGroupFormsy
								className="my-8"
								name="question_2"
								variant="outlined"
								color="primary"
								value="Alveolar proteinosis"
								required
							>
								<div className="grid grid-flow-col grid-cols-4 grid-rows-6 gap-4">
									<FormControlLabel value="Alveolar proteinosis" control={<Radio color="primary"/>} label="Alveolar proteinosis"/>
									<FormControlLabel value="Aspiration" control={<Radio color="primary"/>} label="Aspiration"/>
									<FormControlLabel value="Autoimmune diseas" control={<Radio color="primary"/>} label="Autoimmune diseas"/>
									<FormControlLabel value="Constrictive bronchiolitis" control={<Radio color="primary"/>} label="Constrictive bronchiolitis"/>
									<FormControlLabel value="DIffuse alveolar damage ddx" control={<Radio color="primary"/>} label="DIffuse alveolar damage ddx"/>
									<FormControlLabel value="DIffuse alveolar hemorrhage ddx" control={<Radio color="primary"/>} label="DIffuse alveolar hemorrhage ddx"/>
									<FormControlLabel value="DIffuse amyloidosis" control={<Radio color="primary"/>} label="DIffuse amyloidosis"/>
									<FormControlLabel value="Drug/medication toxicity" control={<Radio color="primary"/>} label="Drug/medication toxicity"/>
									<FormControlLabel value="Eosinophilic granulomatosis with polyangiitis (Churg-Strauss)" control={<Radio color="primary"/>} label="Eosinophilic granulomatosis with polyangiitis (Churg-Strauss)"/>
									<FormControlLabel value="Granulomatosis with polyangiitis (Wegener)" control={<Radio color="primary"/>} label="Granulomatosis with polyangiitis (Wegener)"/>
									<FormControlLabel value="Granulomatous lymphocytic interstitial pneumonia" control={<Radio color="primary"/>} label="Granulomatous lymphocytic interstitial pneumonia"/>
									<FormControlLabel value="Hot tub lung" control={<Radio color="primary"/>} label="Hot tub lung"/>
									<FormControlLabel value="Hypersensitivity pneumonitis, cellular form" control={<Radio color="primary"/>} label="Hypersensitivity pneumonitis, cellular form"/>
									<FormControlLabel value="Hypersensitivity pneumonitis, fibrotic form" control={<Radio color="primary"/>} label="Hypersensitivity pneumonitis, fibrotic form"/>
									<FormControlLabel value="IgG4 related disease" control={<Radio color="primary"/>} label="IgG4 related disease"/>
									<FormControlLabel value="Infection" control={<Radio color="primary"/>} label="Infection"/>
									<FormControlLabel value="Langerhans cell histiocytosis, cellular" control={<Radio color="primary"/>} label="Langerhans cell histiocytosis, cellular"/>
									<FormControlLabel value="Langerhans cell histiocytosis, fibrotic" control={<Radio color="primary"/>} label="Langerhans cell histiocytosis, fibrotic"/>
									<FormControlLabel value="Nonspecific interstitial pneumonia (NSIP), cellular" control={<Radio color="primary"/>} label="Nonspecific interstitial pneumonia (NSIP), cellular"/>
									<FormControlLabel value="Nonspecific interstitial pneumonia (NSIP), fibrotic" control={<Radio color="primary"/>} label="Nonspecific interstitial pneumonia (NSIP), fibrotic"/>
									<FormControlLabel value="Pulmonary arterial hypertension" control={<Radio color="primary"/>} label="Pulmonary arterial hypertension"/>
									<FormControlLabel value="Sarcoidosis" control={<Radio color="primary"/>} label="Sarcoidosis"/>
									<FormControlLabel value="Usual interstitial pneumonia (UIP)" control={<Radio color="primary"/>} label="Usual interstitial pneumonia (UIP)"/>
									<FormControlLabel value="Other" control={<Radio color="primary"/>} label="Other"/>
								</div>
								
							</RadioGroupFormsy>

							<div className="text-24 mt-16">
								What is your level of diagnostic confidence for Case xx? 
							</div>
							<RadioGroupFormsy
								className="my-8"
								name="question_2"
								variant="outlined"
								color="primary"
								value="medium"
								// validations="equals:female"
								// validationError="Only ladies are accepted"
								required
							>
								<FormControlLabel value="low" control={<Radio color="primary"/>} label="Low"/>
								<FormControlLabel value="medium" control={<Radio color="primary"/>} label="Medium"/>
								<FormControlLabel value="high" control={<Radio color="primary"/>} label="High"/>
							</RadioGroupFormsy>

							<Button
								type="submit"
								variant="contained"
								color="primary"
								className="w-full mx-auto mt-16"
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
