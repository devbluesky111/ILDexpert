import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectFooterTheme } from 'app/store/fuse/settingsSlice';
import { Icon } from '@material-ui/core';

function FooterLayout2(props) {
	const footerTheme = useSelector(selectFooterTheme);

	return (
		<ThemeProvider theme={footerTheme}>
			<AppBar
				id="fuse-footer"
				className="relative z-10 shadow-md"
				color="default"
				style={{ backgroundColor: footerTheme.palette.background.paper }}
			>
				<Toolbar className="min-h-48 md:min-h-64 px-8 sm:px-12 py-0 flex items-center overflow-x-auto">
					<div className="flex flex-grow flex-shrink-0">
						<a href="https://www.6patterns.org/" style={{textDecoration:'none',color:'#42A5F5'}}>Go to 6patterns.org</a>
					</div>

					<div className="flex flex-grow flex-shrink-0 px-12 justify-end">
						<a href="mailto:kolesliemd@gmail.com"><Icon style={{color:'#42A5F5'}}>email</Icon></a>
					</div>
				</Toolbar>
			</AppBar>
		</ThemeProvider>
	);
}

export default React.memo(FooterLayout2);
