const mongoose = require('mongoose');
const _=require('lodash');
mongoose.connect('mongodb://localhost/todoListDB',{useNewUrlParser: true, useUnifiedTopology: true});
const itemSchama={
	name: {
		type: String,
		required: true,
	}
}
const Item = mongoose.model('Item',itemSchama);

const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
// const date =  require(__dirname+'/date.js');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');



// const items = [];
// const works = [];

const item1 = new Item({
	name:'Cook Rice',
});

const item2 = new Item({
	name:'Cook soup',
});

const item3 = new Item({
	name:'Eat rice & soup',
});

const defaultItem = [item1, item2, item3];

const listSchema = mongoose.Schema({
	name:String,
	items:[itemSchama]
});

const List = mongoose.model('List', listSchema);


app.get('/',(req, res)=>{
	// const day = date.getDate();

		Item.find({},(err,results)=>{
			if(results.length ===0){
				Item.insertMany(defaultItem,(err)=>{
					if(err){
						console.log(err);
					}else{
						console.log('Data saved successfully');
					}
				});
				res.redirect('/');
			}else{
				res.render('list',{day:'Today', items: results});	
			}		
	});

	
});

app.post('/',(req, res)=>{
	const item = req.body.newitem;
	const listName = req.body.button;

	const newItem = new Item({
		name: item
	});

	if(listName==='Today'){
		newItem.save();
		res.redirect('/');
	}else{
		List.findOne({name:listName},(err, foundList)=>{
			foundList.items.push(newItem);
			foundList.save();
			res.redirect('/'+listName);
		});
	}
		
});

app.post('/delete',(req, res)=>{
	const checkItem = req.body.check;
	const listName  = req.body.listName;
	
	if(listName==='Today'){
		Item.deleteOne({_id:checkItem},(err)=>{
			if(!err){
				console.log('Deleted Successfully')
			}
		});
		res.redirect('/');
	}else{
		List.findOneAndUpdate(
			{name:listName},
			{$pull:{items:{_id:checkItem}}},
			(err, result)=>{
				if(!err){
					res.redirect('/'+listName);
				}
			}
		);
	}
	
});

app.get('/about',(req, res)=>{
	res.render('about');
});



app.get('/:param',(req,res)=>{
	const customListName = _.capitalize(req.params.param);
	List.findOne({name:customListName},(err,foundList)=>{
		if(!err){
			if(!foundList){
				//create a new list
				const list = new List({
					name: customListName,
					items: defaultItem,
				});
				list.save();
				res.redirect('/'+customListName);
			} else{
				//display existing list
				res.render('list',{day:customListName, items: foundList.items});
			}
		}
	});
	
	
})





app.listen(3000, ()=>console.log('server started on port 3000'));