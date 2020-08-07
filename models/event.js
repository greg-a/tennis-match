module.exports = function(sequelize, DataTypes) {
    var Event = sequelize.define("Event", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        start: {
            type: DataTypes.STRING,
            allowNull: false
        },
        end: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });

    // will need to associate to the users dates db

    return Event;
};