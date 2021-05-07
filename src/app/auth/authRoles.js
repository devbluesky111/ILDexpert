/**
 * Authorization Roles
 */
const authRoles = {
	admin: ['admin'],
	staff: ['staff'],
	user: ['admin', 'staff', 'user'],
	onlyGuest: []
};

export default authRoles;
