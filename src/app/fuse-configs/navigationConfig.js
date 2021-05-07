import { authRoles } from 'app/auth';
import i18next from 'i18next';

import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
	{
		id: 'applications',
		title: 'Have a test',
		translate: 'Have a test',
		type: 'group',
		auth: authRoles.staff,
		icon: 'apps',
		url: '/apps/test'
	},
	{
		id: 'adminPage',
		title: 'Data Management',
		type: 'group',
		auth: authRoles.admin,
		icon: 'pages',
		children: [
			{
				id: 'case',
				title: 'Case',
				type: 'collapse',
				icon: 'lock',
				url: '/admin/cases',
				children: [
					{
						id: 'caseDetail',
						title: 'Cases',
						type: 'item',
						url: '/admin/cases/items',
						exact: true
					},
					{
						id: 'caseAdd',
						title: 'Add New Case',
						type: 'item',
						url: '/admin/cases/items/new',
						exact: true
					}
				]
			},
			{
				id: 'question1',
				title: 'Question1',
				type: 'collapse',
				icon: 'error',
				children: [
					{
						id: '404',
						title: 'Questions1',
						type: 'item',
						url: '/pages/errors/error-404',
						exact: true
					},
					{
						id: '500',
						title: 'Add New Question1',
						type: 'item',
						url: '/pages/errors/error-500',
						exact: true
					}
				]
			},
			{
				id: 'question2',
				title: 'Quesion2',
				type: 'collapse',
				icon: 'receipt',
				children: [
					{
						id: 'modern',
						title: 'Questions2',
						type: 'item',
						url: '/pages/invoices/modern'
					},
					{
						id: 'compact',
						title: 'Add New Question2',
						type: 'item',
						url: '/pages/invoices/compact'
					}
				]
			}			
		]
	},
	{
		id: 'result',
		title: 'Study Result',
		type: 'group',
		icon: 'person',
		auth: authRoles.admin,
		url: '/pages/profile'
	}
];

export default navigationConfig;
