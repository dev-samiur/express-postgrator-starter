import Sequelize from 'sequelize';
import db from '../index';

export const defaultFields = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false,
        field: 'id',
    },
    name: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: true,
        field: 'name',
    },
    active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        field: 'active',
    },
    order_num: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'order_num',
    },
    enable_edit: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        field: 'enable_edit',
    },
};


export const UserRole = db.define('user_role', {
    ...defaultFields,
    enable_edit: {
        ...defaultFields.enable_edit,
        defaultValue: false,
    },
    type: {
        type: Sequelize.ENUM(
            'super_administrator',
            'administrator',
            'operator',
            'maintaner',
            'guest'
        ),
        allowNull: false,
        field: 'type'
    }
}, {
    freezeTableName: true,
    tableName: 'user_role',
    deletedAt: false,
    createdAt: false,
    updatedAt: false,
});

export default UserRole;
