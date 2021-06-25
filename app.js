let express = require('express');
let app = express();
let mongoose = require("mongoose");
let bcrypt = require("bcrypt");
let Post = require("./model/post").Post;
let CallbackRequest = require("./model/callback-requests").CallbackRequest;
let Email = require("./model/email").Email;
let User = require("./model/user").User;
let multer = require('multer');
let uniqid = require('uniqid');
const post = require('./model/post');
const callbackRequest = require('./model/callback-requests');
const email = require('./model/email');
let auth = require('./controllers/auth');
let cookieParser = require("cookie-parser");
//let authMiddleware = require("./middleware/auth");


let imageStorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null,'public/images'),
    filename:(req, file, cb) => cb(null, file.originalname)
})
app.use(multer({storage: imageStorage}).single('imageFile'));
app.use(express.json());
app.use(cookieParser());
app.set('views', './public/views');
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost/travels',{ useUnifiedTopology: true });

app.get('/posts', async (req, resp) => {
    let posts = await Post.find();
    resp.send(posts);
});
app.post('/posts', async (req, resp) => {
    let reqBody = req.body;
    let imgPath;
    if (reqBody.imageUrl) {
        imgPath = reqBody.imageUrl;
    } else {
        imgPath = req.file.path.substring(7, req.file.path.length);
        // console.log(imgPath);
    }

    let newPost = new Post({
        id: uniqid(),
        title: reqBody.title,
        date: new Date(),
        description: reqBody.description,
        text: reqBody.text,
        country: reqBody.country,
        imageUrl: imgPath
    });
    await newPost.save();
    resp.send('created');
});

let authMiddleware = function checkAuth(req, resp, next) {
    let token = req.cookies['auth_token'];
    if (token && auth.checkToken(token)) {
        next();
    } else {
        resp.status(400);
        resp.send("Not authorized");
    }
}


app.delete('/posts/:id', authMiddleware, async (req, resp) => {
    let id = req.params.id;
    await Post.deleteOne({ id: id });
    resp.send('deleted');
    // console.log('deleted');
});

app.get('/posts/:id', async (req, resp) => {
    let id = req.params.id;
    let post = await Post.findOne({ id: id });
    resp.send(post);
    // console.log('deleted');
});

app.put('/posts/:id', async (req, resp) => {
    let id = req.params.id;
    await Post.updateOne({ id: id }, req.body);
    resp.send('deleted');
    // console.log('deleted');
});

app.get('/callback-requests', authMiddleware, async (req, resp) => {
    resp.send(await CallbackRequest.find());
});

app.post('/callback-requests', async (req, resp) => {
    let reqBody = req.body;
    let newRequest = new CallbackRequest({
        id: uniqid(),
        phoneNumber: reqBody.phoneNumber,
        date: new Date()
    });
    await newRequest.save();
    resp.send('accepted');
});

app.delete('/callback-requests/:id', authMiddleware, async (req, resp) => {
    let id = req.params.id;
    await CallbackRequest.deleteOne({id: id});
    resp.send('deleted');
})

app.get('/emails', authMiddleware, async (req, resp) => {
    resp.send(await Email.find());
});

app.post('/emails', async (req, resp) => {
    let reqBody = req.body;
    let newEmail = new Email({
        id: uniqid(),
        email: reqBody.email,
        name: reqBody.name,
        text: reqBody.text,
        date: new Date()
    });

    await newEmail.save();
    resp.send('accepted');
});

app.delete('/emails/:id', authMiddleware, async (req, resp) => {
    let id = req.params.id;
    await Email.deleteOne({ id: id });
    resp.send('deleted');
});

app.get('/sight', async (req, resp) => {
    let id = req.query.id;
    let post = await Post.findOne({ id: id });
    resp.render('sight', {
        title: post.title,
        imageUrl: post.imageUrl,
        date: post.date,
        text: post.text
    })
});

app.post('/users/login', async (req, resp) => {
    let email = req.body.email;
    let password = req.body.password;
    let user = await User.find().where({ email: email });
    if (user.length > 0) {
        let comparisonResult = await bcrypt.compare(password, user[0].password);
        if (comparisonResult) {
            let token = auth.generateToken(user[0]);
            resp.cookie('auth_token', token);
            resp.send({
                redirectUrl: "/admin"
            });
        } else {
            resp.status(400);
            resp.send("rejected");
        }

    } else {
        resp.status(400);
        resp.send("rejected");
    }

});

app.post('/users/register', async (req, resp) => {
    let email = req.body.email;
    let password = req.body.password;
    let user = await User.find().where({ email: email }).where({ password: password });
    if (user.length === 0) {
        let encryptedPass = await bcrypt.hash(password, 12);
        let newUser = new User({
            email: email,
            password: encryptedPass
        })
        await newUser.save();
        resp.send("user added");
    } else {
        resp.send("rejected");
    }

});

//let isLoggedIn = false;
app.get('/admin', async (req, resp) => {
    let token = req.cookies['auth_token'];
    if (token && auth.checkToken(token)) {
        resp.render('admin');
    } else {
        resp.redirect('/login');
    }
});

app.get('/login', async (req, resp) => {
    resp.render('login');
});

app.use(express.static("public"));

app.listen(3000, () => console.log("listening 3000..."));