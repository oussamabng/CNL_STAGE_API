const {sequelize} = require("./models/index");

const reset_db = ()=>{
    sequelize.sync({force:true}).then(()=>{
        return console.log("DB CLEARED")
    })
}
module.exports = reset_db;

