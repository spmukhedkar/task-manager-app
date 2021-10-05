module.exports = {
    HOST: process.env.DB_TEST_HOST,
    USER: process.env.DB_TEST_User,
    PASSWORD: process.env.DB_TEST_Password,
    DB: process.env.DB_TEST_Name,
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}