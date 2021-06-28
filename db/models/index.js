const User = require('./user/user');
const UserRole = require('./user/user_role');

User.belongsTo(UserRole, { foreignKey: 'role_id' });

module.exports = {
    User,
    UserRole
};
