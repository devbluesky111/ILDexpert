import React from 'react';

const ResultsAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/admin/result',
			component: React.lazy(() => import('./ResultsApp'))
		}
	]
};

export default ResultsAppConfig;
