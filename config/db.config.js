module.exports = {
    HOST: process.env.DB_HOST,
    USER: process.env.DB_User,
    PASSWORD: process.env.DB_Password,
    DB: process.env.DB_Name,
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};