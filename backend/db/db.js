const mongoos = require('mongoose');
const connectDB = async()=>{
    try {
        await mongoos.connect('mongodb://127.0.0.1:27017/techbridge')
            console.log("Connected!!!")
    } catch (error) {
        console.log("Not Connected!!")
    }
}
module.exports = connectDB