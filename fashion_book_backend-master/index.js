const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./api/routers/user.router');
const categoryRouter = require('./api/routers/categoy.router');
const publisherRouter = require('./api/routers/publisher.router');
const bookRouter = require('./api/routers/book.router');
const authorRouter = require('./api/routers/author.router');
const commentRouter = require('./api/routers/comment.router');
const billRouter = require('./api/routers/bill.router');
const cartRouter = require('./api/routers/cart.router');
const adminRouter = require('./api/routers/admin.router');
const addressVnRouter = require('./api/routers/addres.vn.router');
const captchaRouter = require('./api/routers/captcha.router');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://ledoanngocn:ngocnam141203@cluster0.8ynomfs.mongodb.net/bookshop?retryWrites=true&w=majority&appName=Cluster0');
const address = require('./api/models/address.vn.model');
const test = () => {
    Object.keys(data).forEach( function(k){
        var _dic = [];
        var _ward = [];
         Object.keys(data[k].district).forEach(function(j) {
            Object.keys(data[k].district[j].ward).forEach( function(l) {
                _ward.push({
                    name: data[k].district[j].ward[l].name,
                    code: data[k].district[j].ward[l].code,
                })
            });
            _dic.push({
                name: data[k].district[j].name,
                code: data[k].district[j].code,
                ward: _ward
            })
            
        });
        const new_address = new address({
            city: data[k].name,
            district: _dic,
            code: data[k].code
        })
        try {
            new_address.save()
        }
        catch(Err) {
            console.log(Err)
        }
    });
}
// test();
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'], // cho phép nhiều domain
    credentials: true,  // cho phép gửi cookie/session
}));

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

app.use(session({
    secret: 'some-secret-key',
    resave: false,
    saveUninitialized: true ,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 300000
    }, // có thể cấu hình thêm
}));
captchaRouter(app);
userRouter(app);
categoryRouter(app);
publisherRouter(app);
bookRouter(app);
authorRouter(app);
commentRouter(app)
billRouter(app);
cartRouter(app);
adminRouter(app);
addressVnRouter(app);

app.get('/', (req, res) => {res.send('welcome to fashtion_book')})

app.listen(port, () => console.log("server running on port " + port));