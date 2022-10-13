const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/expense-tracker", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Exstablished a connection to the database!"))
    .catch(err => console.log("Something went wrong when connecting to the db!", err));
