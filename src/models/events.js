'user strict'
module.exports  = (sequelize, DataTypes) => {
    const event_info = sequelize.define('event_info', {
                event_id: {autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER},
                event_name:DataTypes.STRING,
                location:DataTypes.STRING,
                type:DataTypes.STRING,
                open_start_date:DataTypes.DATE,
                open_end_date:DataTypes.DATE,
                event_start_date:DataTypes.DATE,
                event_end_date:DataTypes.DATE,
                created_stamp:DataTypes.DATE,
                update_stamp:DataTypes.DATE,
                event_gallery:DataTypes.STRING,
                primary_banner:DataTypes.STRING,
                second_banner:DataTypes.STRING
    }, {
            classMethods: {
                associate: function (models) {

                }
            },
        });
    return event_info
}