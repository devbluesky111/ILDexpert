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
		url: '/apps/academy'
	},
	{
		id: 'pages',
		title: 'Pages',
		type: 'group',
		auth: authRoles.admin,
		icon: 'pages',
		children: [
			{
				id: 'authentication',
				title: 'Authentication',
				type: 'collapse',
				icon: 'lock',
				badge: {
					title: 10,
					bg: '#525E8A',
					fg: '#FFFFFF'
				},
				children: [
					{
						id: 'authentication-login',
						title: 'Login',
						type: 'item',
						url: '/pages/auth/login'
					},
					{
						id: 'login-v2',
						title: 'Login v2',
						type: 'item',
						url: '/pages/auth/login-2'
					},
					{
						id: 'login-v3',
						title: 'Login v3',
						type: 'item',
						url: '/pages/auth/login-3'
					},
					{
						id: 'authentication-register',
						title: 'Register',
						type: 'item',
						url: '/pages/auth/register'
					},
					{
						id: 'authentication-register-v2',
						title: 'Register v2',
						type: 'item',
						url: '/pages/auth/register-2'
					},
					{
						id: 'authentication-register-v3',
						title: 'Register v3',
						type: 'item',
						url: '/pages/auth/register-3'
					},
					{
						id: 'authentication-forgot-password',
						title: 'Forgot Password',
						type: 'item',
						url: '/pages/auth/forgot-password'
					},
					{
						id: 'authentication-forgot-password-v2',
						title: 'Forgot Password v2',
						type: 'item',
						url: '/pages/auth/forgot-password-2'
					},
					{
						id: 'authentication-reset-password',
						title: 'Reset Password',
						type: 'item',
						url: '/pages/auth/reset-password'
					},
					{
						id: 'authentication-reset-password-v2',
						title: 'Reset Password v2',
						type: 'item',
						url: '/pages/auth/reset-password-2'
					},
					{
						id: 'authentication-lock-screen',
						title: 'Lock Screen',
						type: 'item',
						url: '/pages/auth/lock'
					},
					{
						id: 'authentication-mail-confirmation',
						title: 'Mail Confirmation',
						type: 'item',
						url: '/pages/auth/mail-confirm'
					}
				]
			},
			{
				id: 'coming-soon',
				title: 'Coming Soon',
				type: 'item',
				icon: 'alarm',
				url: '/pages/coming-soon'
			},
			{
				id: 'errors',
				title: 'Errors',
				type: 'collapse',
				icon: 'error',
				children: [
					{
						id: '404',
						title: '404',
						type: 'item',
						url: '/pages/errors/error-404'
					},
					{
						id: '500',
						title: '500',
						type: 'item',
						url: '/pages/errors/error-500'
					}
				]
			},
			{
				id: 'invoice',
				title: 'Invoice',
				type: 'collapse',
				icon: 'receipt',
				children: [
					{
						id: 'modern',
						title: 'Modern',
						type: 'item',
						url: '/pages/invoices/modern'
					},
					{
						id: 'compact',
						title: 'Compact',
						type: 'item',
						url: '/pages/invoices/compact'
					}
				]
			},
			{
				id: 'maintenance',
				title: 'Maintenance',
				type: 'item',
				icon: 'build',
				url: '/pages/maintenance'
			},
			{
				id: 'pricing',
				title: 'Pricing',
				type: 'collapse',
				icon: 'attach_money',
				children: [
					{
						id: 'style-1',
						title: 'Style 1',
						type: 'item',
						url: '/pages/pricing/style-1'
					},
					{
						id: 'style-2',
						title: 'Style 2',
						type: 'item',
						url: '/pages/pricing/style-2'
					},
					{
						id: 'style-3',
						title: 'Style 3',
						type: 'item',
						url: '/pages/pricing/style-3'
					}
				]
			},
			{
				id: 'profile',
				title: 'Profile',
				type: 'item',
				icon: 'person',
				url: '/pages/profile'
			},
			{
				id: 'search',
				title: 'Search',
				type: 'collapse',
				icon: 'search',
				children: [
					{
						id: 'classic-search',
						title: 'Classic Search',
						type: 'item',
						url: '/pages/search/classic'
					},
					{
						id: 'modern-search',
						title: 'Modern Search',
						type: 'item',
						url: '/pages/search/modern'
					}
				]
			},
			{
				id: 'faq',
				title: 'Faq',
				type: 'item',
				icon: 'help',
				url: '/pages/faq'
			},
			{
				id: 'knowledge-base',
				title: 'Knowledge Base',
				type: 'item',
				icon: 'import_contacts',
				url: '/pages/knowledge-base'
			}
		]
	},
	{
		id: 'auth',
		title: 'Join Us',
		type: 'group',
		icon: 'apps',
		auth: authRoles.onlyGuest,
		children: [
			{
				id: 'login',
				title: 'Login',
				type: 'item',
				url: '/login',
				auth: authRoles.onlyGuest,
				icon: 'lock'
			},
			{
				id: 'register',
				title: 'Register',
				type: 'item',
				url: '/register',
				auth: authRoles.onlyGuest,
				icon: 'person_add'
			},
			{
				id: 'logout',
				title: 'Logout',
				type: 'item',
				auth: authRoles.user,
				url: '/logout',
				icon: 'exit_to_app'
			},
			{
				id: 'auth-admin-example',
				title: 'Admin: Auth protected page',
				type: 'item',
				url: '/auth/admin-role-example',
				icon: 'security'
			},
			{
				id: 'only-admin-navigation-item',
				title: 'Nav item only for Admin',
				type: 'item',
				auth: authRoles.admin,
				url: '/auth/admin-role-example',
				icon: 'verified_user'
			},
			{
				id: 'auth-staff-example',
				title: 'Staff: Auth protected page',
				type: 'item',
				url: '/auth/staff-role-example',
				icon: 'security'
			},
			{
				id: 'only-staff-navigation-item',
				title: 'Nav item only for Staff',
				type: 'item',
				auth: authRoles.staff,
				url: '/auth/staff-role-example',
				icon: 'verified_user'
			},
			{
				id: 'auth-guest-example',
				title: 'Guest: Auth protected page',
				type: 'item',
				url: '/auth/guest-role-example',
				icon: 'security'
			},
			{
				id: 'only-guest-navigation-item',
				title: 'Nav item only for Guest',
				type: 'item',
				auth: authRoles.onlyGuest,
				url: '/auth/guest-role-example',
				icon: 'verified_user'
			}
		]
	}
];

export default navigationConfig;
