var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');


//mongoose.connect("mongodb+srv://" + process.env.MONGO_CLIENT_USERNAME + ":" + process.env.MONGO_CLIENT_PASSWORD + "@homechef-ccbwp.mongodb.net/test?retryWrites=true", {auth:{authdb:"admin"}});
mongoose.connect("mongodb+srv://jainabhishek:jainabhishek@homechef-ccbwp.mongodb.net/test?retryWrites=true");
var productRoutes = require('./api/routes/products');
var userRoutes = require('./api/routes/users');
const port = process.env.PORT || 2323;
const app = express();


//app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method === 'OPTIONS'){
        res.header('Allow-Control-Access-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use('/products', productRoutes);
app.use('/user', userRoutes);

app.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'It works!'
    });
});

app.listen(port, function () {
    console.log("Express is listning at port: " + port);
});

process.on('unhandledRejection', err => {
    console.log(err);
});