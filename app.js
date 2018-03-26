const express	= require("express"),
	bodyParser	= require("body-parser"),
	mongoose	= require("mongoose"),
	app 		= express();
	

mongoose.connect("mongodb://localhost/yelp_camp");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

// DB schema
const campgroundsSchema = mongoose.Schema({
	name:String,
	image:String,
	description:String
});

// DB model 
const Campground = mongoose.model("campgrounds", campgroundsSchema);

// // first campground
// Campground.create({
// 	name:"big hells",
// 	image:"https://cdn.pixabay.com/photo/2017/10/07/01/01/bach-leek-2825197__340.jpg",
// 	description:"nice view and water. No bath rooms but beatfull nature"
	
// }, (err, camp)=> console.log(err ? err : camp ));


app.get("/", function(req, res){
	res.send("the main route '/'");
});

app.get("/campgrounds", function(req, res){
	// find campgrounds from DB
	Campground.find({}, (err, campgrounds)=>{
		if(err) return err ;
		res.render("index", {campgrounds});
	});
});

app.post("/campgrounds", function(req, res){
	//get data from form and add to campgrounds arrey
	let name = req.body.name;
	let image = req.body.image;
	let desc = req.body.descreption;
	// add campground to DB
	Campground.create({
		name:name,
		image:image
	}, (err, camp)=>console.log(err ? err : camp));
	
	//redirect back to campgrounds page
	res.redirect("/index");
});


app.get("/campgrounds/new", function(req, res){
	res.render("new");
});


app.get("/campgrounds/:id", function(req, res){
	let campgroundId = req.params.id; 
	Campground.findById(campgroundId, (err, foundCampground) =>{
		if (err) return err;
		console.log(foundCampground);
		res.render("show", { foundCampground });
	});
});


const port = process.env.PORT || 3000;
app.listen(port, () =>{
	console.log("the server has started");
});
