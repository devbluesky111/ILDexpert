import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Icon from '@material-ui/core/Icon';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import clsx from 'clsx';
import React, { useEffect, useMemo, useState } from 'react';
import reducer from '../store';
import Backend from '@utils/BackendUrl';
import axios from 'axios';
import ImageDialog from './ImageDialog';
import QuestionDialog from './QuestionDialog';


const useStyles = makeStyles(theme => ({
	header: {
		background: `linear-gradient(to left, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
		color: theme.palette.getContrastText(theme.palette.primary.main)
	},
	headerIcon: {
		position: 'absolute',
		top: -64,
		left: 0,
		opacity: 0.04,
		fontSize: 512,
		width: 512,
		height: 512,
		pointerEvents: 'none'
	},
	media: {
		height: 0,
		paddingTop: '64.25%', // 16:9
	},
}));

function Tests(props) {

	const classes = useStyles(props);
	const [imageModalShow, setImageModalShow] = useState(false);
	const [imageModalStartTime, setImageModalStartTime] = useState('');
	const [imageModalEndTime, setImageModalEndTime] = useState('');
	const [questionModalShow, setQuestionModalShow] = useState(false);
	const [questionModalStartTime, setQuestionModalStartTime] = useState('');
	const [questionModalEndTime, setQuestionModalEndTime] = useState('');
	const [cases, setCases] = useState([]);
	const [selectedCard, setSelectedCard] = useState({selectedId:'',selectedSubject:'',selectedApiURL:''});
	const [selectedButton, setSelectedButton] = useState({selectedButtonId:'',selectedButtonSubject:''});
	const [questionOnes, setQuestionOnes] = useState([]);
	const [questionTwos, setQuestionTwos] = useState([]);


	const init = async () => {
		// setLoading(true);
		const res = await axios.post(Backend.URL + '/get_cases', { withCredentials: true, headers: {"Access-Control-Allow-Origin": "*"} });
		const res_one = await axios.post(Backend.URL + '/get_question_one', { withCredentials: true, headers: {"Access-Control-Allow-Origin": "*"} });
		const res_two = await axios.post(Backend.URL + '/get_question_two', { withCredentials: true, headers: {"Access-Control-Allow-Origin": "*"} });
		setCases(res.data);
		setQuestionOnes(res_one.data);
		setQuestionTwos(res_two.data);
		// setLoading(false);
	}
	// console.log('question_one', questionOnes);
	// console.log('question_two', questionTwos);

	useEffect(() => {
		init();
	}, []);

	// Handle image showing time
	const handleImageModalOpen = (selectedId, selectedSubject, selectedApiURL) => {
		setImageModalStartTime(new Date());
		setSelectedCard({...selectedId, ...selectedSubject, ...selectedApiURL});
		setImageModalShow(true);
	};
	const handleImageModalClose = () => {
		setImageModalEndTime(new Date());
		setImageModalShow(false);

	};
	if(imageModalStartTime && imageModalEndTime) {
		let imageInterval = imageModalEndTime - imageModalStartTime;
		console.log('image_interval', imageInterval);
		setImageModalStartTime(null);
		setImageModalEndTime(null);
	}

	// Handle multi-choice modal showing time
	const handleQuestionModalOpen = (selectedButtonId, selectedButtonSubject) => {
		setQuestionModalStartTime(new Date());
		setSelectedButton({...selectedButtonId, ...selectedButtonSubject});
		setQuestionModalShow(true);
	};
	const handleQuestionModalClose = () => {
		setQuestionModalEndTime(new Date());
		setQuestionModalShow(false);
	};
	if(questionModalStartTime && questionModalEndTime) {
		let questionInterval = questionModalEndTime - questionModalStartTime;
		console.log('question_interval', questionInterval);
		setQuestionModalStartTime(null);
		setQuestionModalEndTime(null);
	}

	return (
		<div className="flex flex-col flex-auto flex-shrink-0 w-full">
			<div
				className={clsx(
					classes.header,
					'relative overflow-hidden flex flex-col flex-shrink-0 items-center justify-center text-center p-16 sm:p-24 h-200 sm:h-288'
				)}
			>
				<FuseAnimate animation="transition.slideUpIn" duration={400} delay={100}>
					<Typography color="inherit" className="text-24 sm:text-40 font-light">
						WELCOME TO ILDexpert Pilot Study!
					</Typography>
				</FuseAnimate>
				<FuseAnimate duration={400} delay={600}>
					<Typography variant="subtitle1" color="inherit" className="mt-8 sm:mt-16 mx-auto max-w-512">
						<span className="opacity-75">
							Click the thumbnails to see the full image and then click the button below to see multiple choice questionaire.							
						</span>
					</Typography>
				</FuseAnimate>
				<Icon className={classes.headerIcon}> school </Icon>
			</div>
			<div className="flex flex-col flex-1 max-w-2xl w-full mx-auto px-8 sm:px-16 py-24">
				{useMemo(
					() =>
						cases &&
						(cases.length > 0 ? (
							<FuseAnimateGroup
								enter={{
									animation: 'transition.slideUpBigIn'
								}}
								className="flex flex-wrap py-24"
							>
								{cases.map(course => {
									return (
										<div className="w-full pb-24 sm:w-1/2 lg:w-1/3 sm:p-16" key={course.id}>
											<Card className="flex flex-col h-256 rounded-8 shadow" onClick={() => handleImageModalOpen({selectedId:course.id, selectedSubject:course.subject, selectedApiURL:course.apiURL})}>
												<div
													className="flex flex-shrink-0 items-center justify-between px-24 h-40"
													style={{
														background: '#607d8b',
														color: '#FFFFFF'
													}}
												>
													<Typography className="font-medium truncate" color="inherit">
														{course.subject}
													</Typography>
												</div>
												<CardMedia
													className={classes.media}
													image={Backend.URL +'/cases/' + course.thumbnailURL}
													title="Paella dish"
													alt="product"
												/>
												<LinearProgress
													className="w-full"
													variant="determinate"
													value={100}
													color="secondary"
												/>
											</Card>
											<div
												className="flex items-center justify-center px-2 pt-20"
											>
												<FuseAnimate animation="transition.slideRightIn" delay={300}>
													<Button
														className="whitespace-nowrap w-full"
														variant="contained"
														color="secondary"
														onClick={() => handleQuestionModalOpen({selectedButtonId:course.id, selectedButtonSubject:course.subject})}
													>
														<span>DIAGNOSIS</span>
													</Button>
												</FuseAnimate>
											</div>
										</div>
									);
								})}
							</FuseAnimateGroup>
						) : (
							<div className="flex flex-1 items-center justify-center">
								<Typography color="textSecondary" className="text-24 my-24">
									No courses found!
								</Typography>
							</div>
						)),
					[cases, classes.media]
				)}
			</div>
			{/* image modal */}
			<ImageDialog
				open={imageModalShow} 
				onClose={handleImageModalClose}
				selected={selectedCard}
			/>
			{/* question modal */}
			<QuestionDialog
				open={questionModalShow}
				onClose={handleQuestionModalClose}
				questionOneData={questionOnes}
				questionTwoData={questionTwos}
				selected={selectedButton}
			/>
		</div>
	);
}

export default withReducer('academyApp', reducer)(Tests);
