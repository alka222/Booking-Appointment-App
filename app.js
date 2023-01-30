const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./util/database');

const app = express();

app.use(bodyParser.json({extended: true}));

const userDetailRoutes = require('./routes/userDetail');

app.use(cors());

app.use('/user', userDetailRoutes);

sequelize.sync()
.then(result => {
    app.listen(3000);
})
.catch(err => console.log(err))

