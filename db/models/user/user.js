import bcrypt from 'bcryptjs';
import _ from 'lodash';
import Sequelize from 'sequelize';
import db from '../index';
import UserRole from './user_role';

const User = db.define('user', {
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
        field: 'name',
    },
    role_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'role_id',
        references: {
            model: UserRole,
            key: 'id',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
        },
    },
    position: {
        type: Sequelize.TEXT,
        allowNull: false,
        field: 'position',
    },
    phone: {
        type: Sequelize.TEXT,
        allowNull: false,
        field: 'phone',
    },
    email: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: true,
        field: 'email',
    },
    login: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: true,
        field: 'login',
    },
    password: {
        type: Sequelize.TEXT,
        allowNull: false,
        field: 'password',
    },
    photo_url: {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: null,
        field: 'photo_url',
    },
    active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        field: 'active',
    },
    guid: {
        type: Sequelize.TEXT,
        allowNull: true,
        field: 'guid',
    },
    registration_date: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'registration_date',
    },
    created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'created_at',
    },
    updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
        field: 'updated_at',
    },
    deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
        field: 'deleted_at',
    },
}, {
    freezeTableName: true,
    tableName: 'user',
    deletedAt: 'deleted_at',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    paranoid: true,

    hooks: {
        beforeCreate: (user) => {
            user.password = bcrypt.hashSync(user.password, 10);
        },
        beforeUpdate: (user) => {
            if (!_.isEmpty(user.password) && user.changed('password')) {
                user.password = bcrypt.hashSync(user.password, 10);
            } else {
                user.password = user.previous('password');
            }
        },
    },
});


User.checkExistedUser = (email, login) => User.findOne({ where: { [Sequelize.Op.or]: [{ email }, { login }] }, raw: true });

export default User;
