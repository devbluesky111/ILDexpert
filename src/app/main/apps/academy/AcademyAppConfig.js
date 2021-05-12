import React from 'react';
import { Redirect } from 'react-router-dom';

const AcademyAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/apps/test/courses',
			component: React.lazy(() => import('./courses/Tests'))
		},
		{
			path: '/apps/test',
			component: () => <Redirect to="/apps/test/courses" />
		}
	]
};

export default AcademyAppConfig;
