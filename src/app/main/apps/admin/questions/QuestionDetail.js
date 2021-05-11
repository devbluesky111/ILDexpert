import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { useTheme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Backend from '@utils/BackendUrl';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

function QuestionDetail(props) {
	const routeParams = useParams();
	const theme = useTheme();
	const [tabValue, setTabValue] = useState(0);	
	const [noProduct, setNoProduct] = useState(false);
	const [loading, setLoading] = useState(true);
	const [status, setStatus] = useState('new');

	const [form, setForm] = useState({
		id: 0,
		question_one: "",
		created: ""
	});	

	useEffect(()=>{
		const init = async () => {
			setLoading(true);

			if (routeParams.questionId === 'new') {
				setForm({
					id: 0,
					question_one: "",
					created: ""
				});
				setStatus('new');
				setNoProduct(false);
				setTabValue(0);
			} else {
				const resp = await axios.post(Backend.URL + '/get_question_id', {id: routeParams.questionId}, { withCredentials: true, headers: {"Access-Control-Allow-Origin": "*"} });
				let data = resp.data[0];
				if (data) {
					setForm({...data});
					setNoProduct(false);
				} else {
					setNoProduct(true);
				}
				setStatus('old');
			}
			setLoading(false);
		}

		init();
	}, [routeParams]);

	function handleChangeTab(event, value) {
		setTabValue(value);
	}

	function canBeSubmitted() {
		return form.question_one && form.question_one.length > 0;
	}

	function saveQuestion() {
		if(status === 'new') {
			axios.post(Backend.URL + '/add_question', form, { withCredentials: true, headers: {"Access-Control-Allow-Origin": "*"} }).then(function(resp){
				if(resp.data.id) {
					props.history.push(`/admin/question/items`);
				} else {
					alert('failed');
				}
			}).catch(function(err){
				console.log(err);
			});
		} else {
			axios.post(Backend.URL + '/edit_question', form, { withCredentials: true, headers: {"Access-Control-Allow-Origin": "*"} }).then(function(resp){
				if(resp.data.id) {
					props.history.push(`/admin/question/items`);
				} else {
					alert('failed');
				}
			}).catch(function(err){
				console.log(err);
			});
		}
	}

	if (noProduct) {
		return (
			<FuseAnimate delay={100}>
				<div className="flex flex-col flex-1 items-center justify-center h-full">
					<Typography color="textSecondary" variant="h5">
						There is no such Questions!
					</Typography>
					<Button
						className="mt-24"
						component={Link}
						variant="outlined"
						to="/apps/question/items"
						color="inherit"
					>
						Go to New Question Page
					</Button>
				</div>
			</FuseAnimate>
		);
	}

	if (loading) {
		return <FuseLoading />;
	}

	return (
		<FusePageCarded
			classes={{
				toolbar: 'p-0',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={
				form && (
					<div className="flex flex-1 w-full items-center justify-between">
						<div className="flex flex-col items-start max-w-full">
							<FuseAnimate animation="transition.slideRightIn" delay={300}>
								<Typography
									className="flex items-center sm:mb-12"
									component={Link}
									role="button"
									to="/admin/question/items"
									color="inherit"
								>
									<Icon className="text-20">
										{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
									</Icon>
									<span className="mx-4">Questions</span>
								</Typography>
							</FuseAnimate>

							<div className="flex items-center max-w-full">
								<FuseAnimate animation="transition.expandIn" delay={300}>
									<img
										className="w-32 sm:w-48 rounded"
										src="assets/images/ecommerce/product-image-placeholder.png"
										alt={form.question_one}
									/>
								</FuseAnimate>
								<div className="flex flex-col min-w-0 mx-8 sm:mc-16">
									<FuseAnimate animation="transition.slideLeftIn" delay={300}>
										<Typography className="text-16 sm:text-20 truncate">
											{form.question_one ? form.question_one : 'New Question'}
										</Typography>
									</FuseAnimate>
									<FuseAnimate animation="transition.slideLeftIn" delay={300}>
										<Typography variant="caption">Question Detail</Typography>
									</FuseAnimate>
								</div>
							</div>
						</div>
						<FuseAnimate animation="transition.slideRightIn" delay={300}>
							<Button
								className="whitespace-nowrap"
								variant="contained"
								color="secondary"
								disabled={!canBeSubmitted()}
								onClick={saveQuestion}
							>
								Save
							</Button>
						</FuseAnimate>
					</div>
				)
			}
			contentToolbar={ status === 'new' ?
			<Tabs
				value={tabValue}
				onChange={handleChangeTab}
				indicatorColor="secondary"
				textColor="secondary"
				variant="scrollable"
				scrollButtons="auto"
				classes={{ root: 'w-full h-64' }}
			>
				<Tab className="h-64" label="New Question" />
			</Tabs>
			:
			<Tabs
				value={tabValue}
				onChange={handleChangeTab}
				indicatorColor="secondary"
				textColor="secondary"
				variant="scrollable"
				scrollButtons="auto"
				classes={{ root: 'w-full h-64' }}
			>
				<Tab className="h-64" label="Question Information" />
			</Tabs>
			}
			content={
				form && (
					<div className="p-16 sm:p-24 max-w-2xl">
						<div>
							<TextField
								className="mt-8 mb-16"
								error={form.question_one === ''}
								required
								label="Question"
								color="secondary"
								autoFocus
								id="question_one"
								name="question_one"
								value={form.question_one}
								onChange={(e)=>{setForm({...form, question_one:e.target.value})}}
								type="text"
								variant="outlined"
								fullWidth
							/>
						</div>
					</div>
				)
			}
			innerScroll
		/>
	);
}

export default withRouter(QuestionDetail);
