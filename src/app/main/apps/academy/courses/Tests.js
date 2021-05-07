import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import _ from '@lodash';
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
import { useDispatch, useSelector } from 'react-redux';
import reducer from '../store';
import { getCategories, selectCategories } from '../store/categoriesSlice';
import { getCourses, selectCourses } from '../store/coursesSlice';
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
	const dispatch = useDispatch();
	const courses = useSelector(selectCourses);
	const categories = useSelector(selectCategories);

	const classes = useStyles(props);
	// const theme = useTheme();
	const [filteredData, setFilteredData] = useState(null);
	const [searchText] = useState('');
	const [selectedCategory] = useState('all');
	const [imageModalShow, setImageModalShow] = useState(false);
	const [imageModalStartTime, setImageModalStartTime] = useState('');
	const [imageModalEndTime, setImageModalEndTime] = useState('');
	const [questionModalShow, setQuestionModalShow] = useState(false);
	const [questionModalStartTime, setQuestionModalStartTime] = useState('');
	const [questionModalEndTime, setQuestionModalEndTime] = useState('');
	// const [selectedCard, setSelectedCard] = useState({imageURL:'',id:''});
	// Handle image showing time
	const handleImageModalOpen = (url, id) => {
		setImageModalStartTime(new Date());
		// setSelectedCard({url, id})
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
	const handleQuestionModalOpen = () => {
		setQuestionModalStartTime(new Date());
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

	useEffect(() => {
		dispatch(getCategories());
		dispatch(getCourses());
	}, [dispatch]);

	useEffect(() => {
		function getFilteredArray() {
			if (searchText.length === 0 && selectedCategory === 'all') {
				return courses;
			}

			return _.filter(courses, item => {
				if (selectedCategory !== 'all' && item.category !== selectedCategory) {
					return false;
				}
				return item.title.toLowerCase().includes(searchText.toLowerCase());
			});
		}

		if (courses) {
			setFilteredData(getFilteredArray());
		}
	}, [courses, searchText, selectedCategory]);

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
						filteredData &&
						(filteredData.length > 0 ? (
							<FuseAnimateGroup
								enter={{
									animation: 'transition.slideUpBigIn'
								}}
								className="flex flex-wrap py-24"
							>
								{filteredData.map(course => {
									const category = categories.find(_cat => _cat.value === course.category);
									return (
										<div className="w-full pb-24 sm:w-1/2 lg:w-1/3 sm:p-16" key={course.id}>
											<Card className="flex flex-col h-256 rounded-8 shadow" onClick={handleImageModalOpen}>
												<div
													className="flex flex-shrink-0 items-center justify-between px-24 h-40"
													style={{
														background: '#607d8b',
														color: '#FFFFFF'
														// background: category.color,
														// color: theme.palette.getContrastText(category.color)
													}}
												>
													<Typography className="font-medium truncate" color="inherit">
														{category.label}
													</Typography>
												</div>
												<CardMedia
													className={classes.media}
													image="assets/images/calendar/autumn.jpg"
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
														onClick={handleQuestionModalOpen}
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
					[categories, filteredData, classes.media]
				)}
			</div>
			{/* image modal */}
			<ImageDialog
				open={imageModalShow} 
				onClose={handleImageModalClose}
				// imageURL={selectedCard.imageURL}
			/>
			{/* question modal */}
			<QuestionDialog
				open={questionModalShow}
				onClose={handleQuestionModalClose}
			/>
		</div>
	);
}

export default withReducer('academyApp', reducer)(Tests);
