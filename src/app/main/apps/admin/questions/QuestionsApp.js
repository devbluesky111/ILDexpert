import FusePageCarded from '@fuse/core/FusePageCarded';
import React from 'react';
import QuestionsHeader from './QuestionsHeader';
import QuestionsTable from './QuestionsTable';

function Questions() {
	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				contentCard: 'overflow-hidden',
				header: 'min-h-48 h-48 sm:h-96 sm:min-h-96'
				
			}}
			header={<QuestionsHeader />}
			content={<QuestionsTable />}
			innerScroll
		/>
	);
}

export default Questions;
