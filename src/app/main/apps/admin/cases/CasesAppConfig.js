import React from 'react';
import { Redirect } from 'react-router-dom';

const CasesAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/admin/cases/items/:caseId',
			component: React.lazy(() => import('./CaseDetail'))
		},
		{
			path: '/admin/cases/items',
			component: React.lazy(() => import('./CasesApp'))
		},
		{
			path: '/admin/cases',
			component: () => <Redirect to="/admin/cases/items" />
		}
	]
};

export default CasesAppConfig;
