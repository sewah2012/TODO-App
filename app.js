const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const date =  require(__dirname+'/date.js');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

const items = [];
const works = [];

app.get('/',(req, res)=>{
	const day = date.getDate();
	res.render('list',{day:day, items: items})
});

app.get('/work',(req, res)=>{
	res.render('list',{day:"work", items:works});
});

app.post('/',(req, res)=>{
	var item = req.body.newitem;
	if (req.body.button==="work") {
		works.push(item);
		res.redirect('/work');
		
	} else {
		items.push(item);
		res.redirect('/');
		
	}
});

app.get('/about',(req, res)=>{
	res.render('about')
});

app.listen(3000, ()=>console.log('server started on port 3000'));