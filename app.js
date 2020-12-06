let express = require('express');
let app = express();
let mongoose = require("mongoose");
let Post = require("./model/post").Post;
let CallbackRequest = require("./model/callback-requests").CallbackRequest;
let Email = require("./model/email").Email;
let multer = require('multer');
let uniqid = require('uniqid');
const post = require('./model/post');
const callbackRequest = require('./model/callback-requests');
const email = require('./model/email');

let imageStorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null,'public/images'),
    filename:(req, file, cb) => cb(null, file.originalname)
})
app.use(multer({storage: imageStorage}).single('imageFile'));
app.use(express.json());

mongoose.connect('mongodb://localhost/travels',{ useUnifiedTopology: true });

app.get('/posts', async (req, resp) => {
    let posts = await Post.find();
    resp.send(posts);
})
app.post('/posts', async (req, resp) => {
    let reqBody = req.body;
    let imgPath;
    if(reqBody.imageUrl){
        imgPath = reqBody.imageUrl;
    }else{
        imgPath = req.file.path.substring(7, req.file.path.length);
        // console.log(imgPath);
    }
    
    let newPost = new Post({
        id:uniqid(),
        title:reqBody.title,
        date:new Date(),
        description:reqBody.description,
        text:reqBody.text,
        country:reqBody.country,
        imageUrl:imgPath
    });
    await newPost.save();
    resp.send('created');
})
app.delete('/posts/:id', async (req, resp) => {
    let id = req.params.id;
    await Post.deleteOne({id: id});
    resp.send('deleted');
    // console.log('deleted');
})

app.get('/posts/:id', async (req, resp) => {
    let id = req.params.id;
    let post = await Post.findOne({id: id});
    resp.send(post);
    // console.log('deleted');
})

app.put('/posts/:id', async (req, resp) => {
    let id = req.params.id;
    await Post.updateOne({id: id}, req.body);
    resp.send('deleted');
    // console.log('deleted');
})

app.get('/callback-requests', async (req,resp) => {
    resp.send(await CallbackRequest.find());
})

app.post('/callback-requests', async (req,resp) => {
    let reqBody = req.body;
    let newRequest = new CallbackRequest({
        id:uniqid(),
        phoneNumber:reqBody.phoneNumber,
        date:new Date()
    });
    await newRequest.save();
    resp.send('accepted');
})

app.delete('/callback-requests/:id', async (req, resp) => {
    let id = req.params.id;
    await CallbackRequest.deleteOne({id: id});
    resp.send('deleted');
})

app.get('/emails', async (req,resp) => {
    resp.send(await Email.find());
})

app.post('/emails', async (req,resp) => {
    let reqBody = req.body;
    let newEmail = new Email({
        id:uniqid(),
        email:reqBody.email,
        name:reqBody.name,
        text:reqBody.text,
        date:new Date()
    });
    
    await newEmail.save();
    resp.send('accepted');
})

app.delete('/emails/:id', async (req, resp) => {
    let id = req.params.id;
    await Email.deleteOne({id: id});
    resp.send('deleted');
})

app.use(express.static("public"));

app.listen(3000, () => console.log("listening 3000..."));