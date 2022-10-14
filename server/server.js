const express = require('express');
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(express.urlencoded({extended: true}))
require('./config/mongoose.config');
require('./routes/user.routes')(app);

require('./routes/expense.routes')(app);
require('jsonwebtoken');

app.listen(8000, () => {
    console.log("Listening to port 8000")
})