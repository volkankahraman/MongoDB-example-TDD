const mongoose = require('mongoose');
require('dotenv').config();
//Connect to the db before tests run
before(async () => {
    await mongoose.connect('mongodb://localhost/testaroo', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    });

    mongoose.connection.once('open', function () {
        console.log('Connection has made');
    }).on('error', error => log('error ' + error));
    //drop the collection
    await mongoose.connection.collections.mariochars.drop();
});