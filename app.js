const express = require ('express');
const app = express ();
const mrouter = require ('./router/mrouter.js');
const path = require ('path');
const bodyParser = require ('body-parser');
const session = require ('express-session');

app.engine ('html', require ('express-art-template'));

app.use ('/public/', express.static (path.join (__dirname, './public/')));

app.use ('/node_modules', express.static (path.join (__dirname, './node_modules/')));

app.use(bodyParser.urlencoded ({extended: false}));
app.use(bodyParser.json());

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}));

app.use (mrouter);

app.listen (5000, () => {
    console.log ('The app is running...');
})