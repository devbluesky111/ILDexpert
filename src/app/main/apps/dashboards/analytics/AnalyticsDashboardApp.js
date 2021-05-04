import FuseAnimate from '@fuse/core/FuseAnimate';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from '@lodash';
import reducer from './store';
import { selectWidgetsEntities, getWidgets } from './store/widgetsSlice';
import Widget5 from './widgets/Widget5';
import Widget7 from './widgets/Widget7';

function AnalyticsDashboardApp() {
	const dispatch = useDispatch();
	const widgets = useSelector(selectWidgetsEntities);

	useEffect(() => {
		dispatch(getWidgets());
	}, [dispatch]);

	if (_.isEmpty(widgets)) {
		return null;
	}

	return (
		<div className="w-full">
			<div><span>Cover Images here!!!</span></div>
			<FuseAnimate animation="transition.slideUpIn" delay={200}>
				<div className="flex flex-col md:flex-row sm:p-8 container">
					<div className="flex flex-1 flex-col min-w-0">
						<FuseAnimate delay={600}>
							<Typography className="p-16 pb-8 text-18 font-300">
								Welcome to ILDexpert Pilot Study!
							</Typography>
						</FuseAnimate>

						<FuseAnimate delay={600}>
							<Typography className="px-16 pb-8 text-18 font-300">
								Welcome to ILDexpert Pilot Study!
							</Typography>
						</FuseAnimate>

						<div className="widget w-full p-16 pb-32">
							<Widget5 data={widgets.widget5} />
						</div>
					</div>

					<div className="flex flex-wrap w-full md:w-320 pt-16">
						<div className="mb-32 w-full sm:w-1/2 md:w-full">
							<FuseAnimate delay={600}>
								<Typography className="px-16 pb-8 text-18 font-300">
									Welcome to ILDexpert Pilot Study!
								</Typography>
							</FuseAnimate>

							<div className="widget w-full p-16">
								<Widget7 data={widgets.widget7} />
							</div>
						</div>
					</div>
				</div>
			</FuseAnimate>
		</div>
	);
}

export default withReducer('analyticsDashboardApp', reducer)(AnalyticsDashboardApp);
