'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('registration', {
            event_id:{
                allowNull:false,
                type:Sequelize.INTEGER
            },
            registration_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            first_name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            last_name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            nickname: {
                type: Sequelize.STRING,
                allowNull: false
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false
            },
            line_id: {
                type: Sequelize.STRING,
                allowNull: true
            },
            phone_num: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            company_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            company_name: {
                allowNull: false,
                type: Sequelize.STRING
            },ref:{
                allowNull:false,
                type:Sequelize.STRING
            },
            created_stamp:{
                allowNull:false,
                type:Sequelize.DATE,
                defaultValue:Sequelize.NOW
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('registration',);
    }
};
