require('dotenv').config();
const mongoose = require('mongoose');

async function connect() {
    try {
        if(
            process.env.MONGO_PASSWORD == '' || process.env.MONGO_PASSWORD == undefined ||
            process.env.MONGO_USERNAME == '' || process.env.MONGO_USERNAME == undefined
            ) {
                await mongoose.connect(process.env.MONGO_URI);
                console.log({message: 'connected without authentication'});
        } else {
            await mongoose.connect(`mongodb://${process.env.MONGO_HOSTS}/${process.env.MONGO_AUTH_SOURCE}?${process.env.MONGO_OPTIONS}`
            ,
                {
                    auth: {
                        authSource: process.env.MONGO_AUTH_SOURCE
                    },
                    user: process.env.MONGO_USERNAME,
                    pass: process.env.MONGO_PASSWORD,
                    dbName: process.env.MONGO_DB
                }
            );
            console.log({message: 'connected with authentication'});
        }
    } catch(error) {
        console.error({message: 'Error while connecting mongo', error});
    }
}

module.exports = {
    connect
}
