import FuseAnimate from '@fuse/core/FuseAnimate';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import React from 'react';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import reducer from './store';

function AnalyticsDashboardApp() {


	return (
		<div className="w-full" 
			style={{
				// backgroundImage:"url('assets/images/backgrounds/background1.png')",
				height:'100%',
				// backgroundPosition:'center',
				// backgroundRepeat:'no-repeat',
				// backgroundSize:'cover',
				backgroundColor:'#1B9E85'
		}}>
			<FuseAnimate animation="transition.slideUpIn" delay={200}>
				<div className="flex p-60 container">
					<div className="flex flex-1 flex-col min-w-0">
						<FuseAnimate delay={600}>
							<Typography className="p-16 pb-8 text-48 font-300">
								Welcome<br/>to the<br/>ILDexpert Pilot Study!
							</Typography>
						</FuseAnimate>
						<FuseAnimate delay={600}>
							<Typography className="p-16 pb-8 text-24 font-300">
								Please register (or login) and review the 10 ILD Aperio cases. If you are a study participant, please review all 10 cases and answer the case questions (Pretest) before downloading the ILDexpert app on your mobile device. On the second review of the 10 cases (Posttest) you will use the app to guide you to the best diagnosis. Please try to complete any given case analysis without interruption, if possible.
							</Typography>
						</FuseAnimate>
					</div>

					<div className="flex w-400 m-auto p-8">
						<div className="w-3/4 mx-auto align-items-center">
							<FuseAnimate delay={600}>
								<Button
									type="button"
									variant="contained"
									color="secondary"
									size="large"
									className="w-full mx-auto my-8"
									aria-label="login button"
									endIcon={<Icon>send</Icon>}
									value="legacy"
									onClick={() => {window.location.href = process.env.PUBLIC_URL + "/apps/test";}}
								>
									<span style={{fontSize:"24px"}}>Begin or resume case analysis</span>
								</Button>
							</FuseAnimate>
						</div>
					</div>
				</div>
			</FuseAnimate>
		</div>
	);
}

export default withReducer('analyticsDashboardApp', reducer)(AnalyticsDashboardApp);
