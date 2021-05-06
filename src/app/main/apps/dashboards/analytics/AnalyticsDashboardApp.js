import FuseAnimate from '@fuse/core/FuseAnimate';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from './store';

function AnalyticsDashboardApp() {


	return (
		<div className="w-full" 
			style={{backgroundImage:"url('assets/images/backgrounds/background1.png')",
				height:'100%',
				backgroundPosition:'center',
				backgroundRepeat:'no-repeat',
				backgroundSize:'cover'
		}}>
			<FuseAnimate animation="transition.slideUpIn" delay={200}>
				<div className="flex flex-col md:flex-row sm:p-8 container">
					<div className="flex flex-1 flex-col min-w-0">
						<FuseAnimate delay={600}>
							<Typography className="p-16 pb-8 m-60 text-64 font-300 text-red">
								Welcome<br/>to the<br/>ILDexpert Pilot Study!
							</Typography>
						</FuseAnimate>
					</div>
				</div>
			</FuseAnimate>
		</div>
	);
}

export default withReducer('analyticsDashboardApp', reducer)(AnalyticsDashboardApp);
