require('dotenv').config();
const PORT = process.env.PORT || 5005;

const app = require('./app');

app.listen(PORT,()=>{
    console.log(`example app is listening at http://localhost:${PORT}`);

})
