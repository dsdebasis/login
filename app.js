const express = require('express');
const app = express();
const authRouter = require('./router/authRoute');
const dbconnect = require('./config/databaseConfig');

dbconnect();
app.use(express.json());
app.use('/api/auth/',authRouter);

app.use('/',(req,res)=> {
   res.status(200).json({
    data:"jwt auth server updated"
   });
});

module.exports = app;