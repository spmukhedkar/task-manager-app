module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define("task", {
        description: {
            type: Sequelize.STRING,
            allowNull: false
        },
        status: {
            type: Sequelize.ENUM,
            values: ['not-started', 'in-progress', 'completed', 'archive'],
            defaultValue: 'not-started',
            allowNull: false
        }
    });
    
    return Task;
};