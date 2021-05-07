import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import Button from '@material-ui/core/Button';
import { orange } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Backend from '@utils/BackendUrl';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
	caseImageFeaturedStar: {
		position: 'absolute',
		top: 0,
		right: 0,
		color: orange[400],
		opacity: 0
	},
	caseImageUpload: {
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut
	},
	caseImageItem: {
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut,
		'&:hover': {
			'& $caseImageFeaturedStar': {
				opacity: 0.8
			}
		},
		'&.featured': {
			pointerEvents: 'none',
			boxShadow: theme.shadows[3],
			'& $caseImageFeaturedStar': {
				opacity: 1
			},
			'&:hover $caseImageFeaturedStar': {
				opacity: 1
			}
		}
	}
}));

function CaseDetail(props) {
	const routeParams = useParams();
	const theme = useTheme();
	const classes = useStyles(props);
	const [tabValue, setTabValue] = useState(0);	
	const [noProduct, setNoProduct] = useState(false);
	const [loading, setLoading] = useState(true);
	const [status, setStatus] = useState('new');

	const [form, setForm] = useState({
		id: 0,
		subject: "",
		apiURL: "",
		thumbnailURL: "",
		created: ""
	});	

	useEffect(()=>{
		const init = async () => {
			setLoading(true);

			if (routeParams.caseId === 'new') {
				setForm({
					id: 0,
					subject: "",
					apiURL: "",
					thumbnailURL: "",
					created: ""
				});
				setStatus('new');
				setNoProduct(false);
				setTabValue(0);
			} else {
				const resp = await axios.post(Backend.URL + '/get_case_id', {id: routeParams.caseId}, { withCredentials: true, headers: {"Access-Control-Allow-Origin": "*"} });
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

	async function handleUploadChange(e) {
		const file = e.target.files[0];
		const name = e.target.name;
		if (!file) {
			return;
		}

		let formData = new FormData();
		formData.append("file", file);
		formData.append("id", form.id);
		formData.append("name", name);

		const res = await axios.post(Backend.URL + '/upload_case', formData, { withCredentials: true, headers: {"Access-Control-Allow-Origin": "*", 'Content-Type': 'multipart/form-data'} } );

		if(res.data.file) {
			let temp = form;
			temp[name] = res.data.file;
			setForm({...temp});
		}
	}

	function canBeSubmitted() {
		return form.subject && form.subject.length > 0;
	}

	function saveCase() {
		if(status === 'new') {
			axios.post(Backend.URL + '/add_case', form, { withCredentials: true, headers: {"Access-Control-Allow-Origin": "*"} }).then(function(resp){
				if(resp.data.id) {
					props.history.push(`/admin/cases/items`);
				} else {
					alert('failed');
				}
			}).catch(function(err){
				console.log(err);
			});
		} else {
			axios.post(Backend.URL + '/edit_case', form, { withCredentials: true, headers: {"Access-Control-Allow-Origin": "*"} }).then(function(resp){
				if(resp.data.id) {
					props.history.push(`/admin/cases/items`);
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
						There is no such Cases!
					</Typography>
					<Button
						className="mt-24"
						component={Link}
						variant="outlined"
						to="/apps/cases/posts"
						color="inherit"
					>
						Go to Case Posts Page
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
									to="/admin/cases/items"
									color="inherit"
								>
									<Icon className="text-20">
										{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
									</Icon>
									<span className="mx-4">Cases</span>
								</Typography>
							</FuseAnimate>

							<div className="flex items-center max-w-full">
								<FuseAnimate animation="transition.expandIn" delay={300}>
									{form.thumbnailURL ? (
										<img
											className="w-32 sm:w-48 rounded"
											src={Backend.URL + `/cases/` + form.thumbnailURL}
											alt={form.subject}
										/>
									) : (
										<img
											className="w-32 sm:w-48 rounded"
											src="assets/images/ecommerce/product-image-placeholder.png"
											alt={form.subject}
										/>
									)}
								</FuseAnimate>
								<div className="flex flex-col min-w-0 mx-8 sm:mc-16">
									<FuseAnimate animation="transition.slideLeftIn" delay={300}>
										<Typography className="text-16 sm:text-20 truncate">
											{form.subject ? form.subject : 'New Case'}
										</Typography>
									</FuseAnimate>
									<FuseAnimate animation="transition.slideLeftIn" delay={300}>
										<Typography variant="caption">Case Detail</Typography>
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
								onClick={saveCase}
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
				<Tab className="h-64" label="Subject & API URL" />
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
				<Tab className="h-64" label="Subject & API URL" />
				<Tab className="h-64" label="Thumbnail" />
			</Tabs>
			}
			content={
				form && (
					<div className="p-16 sm:p-24 max-w-2xl">
						{tabValue === 0 && (
							<div>
								<TextField
									className="mt-8 mb-16"
									error={form.subject === ''}
									required
									label="Subject"
									color="secondary"
									autoFocus
									id="subject"
									name="subject"
									value={form.subject}
									onChange={(e)=>{setForm({...form, subject:e.target.value})}}
									type="text"
									variant="outlined"
									fullWidth
								/>
								<TextField
									className="mt-8 mb-16"
									label="API URL"
									color="secondary"
									id="apiURL"
									name="apiURL"
									value={form.apiURL}
									onChange={(e)=>{setForm({...form, apiURL:e.target.value})}}
									type="text"
									variant="outlined"
									fullWidth
								/>
							</div>
						)}
						{tabValue === 1 && (
							<div className="flex justify-center sm:justify-start flex-wrap -mx-8">
								{form.thumbnailURL ? 
									<div
										tabIndex={0}
										className='flex items-center justify-center relative w-128 h-128 rounded-8 mx-8 mb-16 overflow-hidden outline-none shadow hover:shadow-lg'
									>
										<Icon 
											className={classes.caseImageFeaturedStar} 
											style={{color: '#333', opacity: 1, cursor: 'pointer'}} 
											onClick={()=>{setForm({...form, thumbnailURL: ''})}}
										>
											delete
										</Icon>
										<img className="max-w-none w-auto h-full" src={Backend.URL + `/cases/` + form.thumbnailURL} alt={form.subject} />
									</div>
								:
									<label
										htmlFor="button-file"
										className={clsx(
											classes.caseImageUpload,
											'flex items-center justify-center relative w-128 h-128 rounded-8 mx-8 mb-16 overflow-hidden cursor-pointer shadow hover:shadow-lg'
										)}
									>
										<input
											accept="image/*"
											className="hidden"
											id="button-file"
											type="file"
											name="thumbnailURL"
											onChange={handleUploadChange}
										/>
										<Icon fontSize="large" color="action">
											cloud_upload
										</Icon>
									</label>
								}
							</div>
						)}
					</div>
				)
			}
			innerScroll
		/>
	);
}

export default withRouter(CaseDetail);
