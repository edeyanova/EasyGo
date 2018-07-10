var express = require("express");
var app = express();

app.set("view engine", "ejs");
app.set("views", "./views");

app.use('/public', express.static('./public'));
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(require('./middleware/authenticate'));

app.use('/users', require("./controllers/users/users"));
app.use('/logins', require("./controllers/logins/logins"));
app.use('/logout', require('./controllers/logout/logout'));
app.use('/trips', require('./controllers/trips/trips'));
app.use('/crawlers', require('./controllers/crawlers/crawlers'));
app.use('/statistics', require('./controllers/statistics/statistics'));
app.use('/feedback', require('./controllers/feedback/feedback'));
app.use('/converter', require('./controllers/converter/converter'));
app.use('/proxy', require('./controllers/proxy/proxy'));
app.use('/', require('./controllers/index/index'));

app.listen(process.env.PORT || 5000);
