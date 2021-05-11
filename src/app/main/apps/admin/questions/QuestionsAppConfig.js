import React from 'react';
import { Redirect } from 'react-router-dom';

const QuestionsAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/admin/question/items/:questionId',
			component: React.lazy(() => import('./QuestionDetail'))
		},
		{
			path: '/admin/question/items',
			component: React.lazy(() => import('./QuestionsApp'))
		},
		{
			path: '/admin/question',
			component: () => <Redirect to="/admin/question/items" />
		}
	]
};

export default QuestionsAppConfig;
