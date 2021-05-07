import FusePageCarded from '@fuse/core/FusePageCarded';
import React from 'react';
import CasesHeader from './CasesHeader';
import CasesTable from './CasesTable';

function Cases() {
	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				contentCard: 'overflow-hidden',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
				
			}}
			header={<CasesHeader />}
			content={<CasesTable />}
			innerScroll
		/>
	);
}

export default Cases;
