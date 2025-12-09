const mongoos = require('mongoose');
const connectDB = async()=>{
    try {
        await mongoos.connect('mongodb+srv://anmolyadav639944_db_user:lB0d7lA3ZfXjL9Kc@cluster0.vjcmzfa.mongodb.net/techbridge')
            console.log("Connected!!!")
    } catch (error) {
        console.log("Not Connected!!")
    }
}
module.exports = connectDB
