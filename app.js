const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

var items = [];
let works = [];

app.get('/',(req, res)=>{
	const today = new Date();
	var option = {
		day: "numeric",
		month:"long",
		year: "numeric",
		weekday: "long"
	}
	const day = today.toLocaleDateString('en-US',option);

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

app.listen(3000, ()=>console.log('server started on port 3000'));