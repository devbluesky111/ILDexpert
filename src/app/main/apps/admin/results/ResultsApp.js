import FusePageCarded from '@fuse/core/FusePageCarded';
import React from 'react';
import ResultsHeader from './ResultsHeader';
import ResultsTable from './ResultsTable';

function Results() {
	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				contentCard: 'overflow-hidden',
				header: 'min-h-48 h-48 sm:h-80 sm:min-h-80'
			}}
			header={<ResultsHeader />}
			content={<ResultsTable />}
			innerScroll
		/>
	);
}

export default Results;
