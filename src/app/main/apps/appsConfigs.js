import AcademyAppConfig from './academy/AcademyAppConfig';
import AnalyticsDashboardAppConfig from './dashboards/analytics/AnalyticsDashboardAppConfig';
import CasesAppConfig from './admin/cases/CasesAppConfig';
import QuestionsAppConfig from './admin/questions/QuestionsAppConfig';
import ResultsAppConfig from './admin/results/ResultsAppConfig';

const appsConfigs = [
	AnalyticsDashboardAppConfig,
	AcademyAppConfig,
	CasesAppConfig,
	QuestionsAppConfig,
	ResultsAppConfig
];

export default appsConfigs;
