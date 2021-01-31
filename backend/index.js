const app = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoClient = require('mongodb').MongoClient;
const PORT = process.env.PORT || 3000;
const dotEnv = require('dotenv');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const dbUrl =  "mongodb://127.0.0.1:27017"
dotEnv.config();
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(PORT , ()=> console.log(`running on ${PORT}`));

const {generateRandomString} = require('./helper');


// app.get('/:extURl', async (req, res) => {
//     try {
//         let url = `https://arcane-oasis-81949.herokuapp.com${req.originalUrl}`;
//         let client = await mongoClient.connect(process.env.DB_URL1, { useNewUrlParser: true, useUnifiedTopology: true });
//         let db = client.db('urldb');
//         let result = await db.collection('urls').findOne({ 'shortUrl': url });
//         let mainUrl = result.longURl;
//         res.redirect(mainUrl);
//     } catch (err) {
//         res.status(500).json({ 'message': 'internal server error' });
//     }
// })
app.post('/register', async (req, res) => {
    try {
        let client = await mongoClient.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        let db = client.db('pinterest-user');
        let { password, email, firstName, lastName } = req.body;
        let salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(password, salt);
        await db.collection('users').insertOne({ 'firstName':firstName, 'lastName' : lastName, 'email': email.toUpperCase(), "password": hash, "accountActivated": false });

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'admarian95@gmail.com',
                pass: 'HALAMADRIDISTA'
            }
        })

        const mailOptions = {
            from: 'admarian95@gmail.com',
            to: email,
            subject: 'Verify account !',
            html: `<a> Login using : http://localhost:3000/${req.body.email}/verify </a>`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
                res.status(200).json({ 'message': 'user inserted .. check mail for activation link !' })
            }
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({ 'message': err });
    }
});

app.get('/:email/verify', async (req, res) => {
    const { email } = req.params;
    try {
        let client = await mongoClient.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        let db = client.db('pinterest-user');
        await db.collection('users').findOneAndUpdate({ 'email': email.toUpperCase() }, { $set: { 'accountActivated': true } });
        res.redirect('http://localhost:3001/login'); // redirect to login page react vaala ..
    } catch (err) {
        console.log(err);
        res.status(500);
    }
});

app.get('/:email/tempStringVerify', (req, res) => {
   res.redirect('http://localhost:3001/newPass/' + req.params.email)
});

app.get('/getPosts', async (req,res)=>{
    try{
    let client = await mongoClient.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    let db = client.db('pinterest-user');
    let result = await db.collection('posts').find().toArray();
    res.status(200).json({ 'posts': result });
    }catch(e){
        res.status(500).json({'error':e});
    }   
})

app.post('/login', async (req, res) => {
    try {
        let client = await mongoClient.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        let db = client.db('pinterest-user');
        let { password, email } = req.body;
        console.log(req.body);
        let result = await db.collection('users').findOne({ 'email': email.toUpperCase() });
        console.log(result);
        let hash = result.password;
        let accountActivated = result.accountActivated;
        let comp = await bcrypt.compare(password , hash);
        console.log(comp);
        if (comp && accountActivated) {
            let token = jwt.sign(
                {
                    userId: result._id,
                    email: result.email
                },
                process.env.JWT_SECRET,
                { expiresIn: '5min' }
            )
            console.log(token)
            res.status(200).json({ 'token': token });

        } else if (!accountActivated) {
            res.status(404).json({ 'message': 'account not activated' });
        }
        else {
            res.status(404).json({ 'message': 'invalid creds!' });
        }
    } catch (err) {
        res.status(500);
    }
});



app.post('/accessRoute', (req, res) => {
    let token = req.headers.authorization;
    jwt.verify(token, process.env.JWT_SECRET , (err, dec) => {
        if (dec)
            res.send('valide user');
        else
            res.send('invalid user');
    }
    )
});

// app.post('/shortenURL', isTokenValid, async (req, res) => {
//     let baseUrl = 'http://localhost:3000/';
//     let addUrl = generateRandomString(10);
//     baseUrl += addUrl;
//     try {
//         let { url } = req.body;
//         let client = await mongoClient.connect(process.env.DB_URL1, { useNewUrlParser: true, useUnifiedTopology: true });
//         let db = client.db('urldb');
//         await db.collection('urls').insertOne({ "longURl": url, "shortUrl": baseUrl, "date": new Date() });
//         res.status(200).json({ 'message': baseUrl });
//     } catch (err) {
//         res.status(500).json({ 'message': "internal server error" });
//     }
// })

app.post('/forgotPwdTempStringCreate', async (req, res) => {
    try {
        let client = await mongoClient.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        let db = client.db('pinterest-user');
        // check if user exists 

        let user = await db.collection('users').findOne({ 'email': req.body.email.toUpperCase() });
        if (user.accountActivated) {
            let tempString = await generateRandomString(10);
            console.log(tempString)
            let salt = await bcrypt.genSalt(10);
            let hash = await bcrypt.hash(tempString, salt);
            await db.collection('users').findOneAndUpdate({ 'email': req.body.email.toUpperCase() }, { $set: { 'tempString': hash } });
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'admarian95@gmail.com',
                    pass: 'HALAMADRIDISTA'
                }
            })

            const mailOptions = {
                from: 'admarian95@gmail.com',
                to: req.body.email,
                subject: 'BLAH',
                html: `<p> tempString  : <b> ${tempString} </b>
            <p><a> Login using : http://localhost:3000/${req.body.email}/tempStringVerify </a></p>` //enter netlify URL for temp String verification
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                    res.status(404).json({ 'message': 'error occurred !' });
                } else {
                    console.log('Email sent: ' + info.response);
                    res.status(200).json({ 'message': 'user verified and check mail for activation link' });
                }
            });
        }
    } catch (err) {
        res.status(500).json({ 'message': 'error with DB' });
    }
})

app.post('/:email/tempStringVerify', async (req, res) => {
    try {

        let client = await mongoClient.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        let db = client.db('pinterest-user');
        let { tempString } = req.body;
        let { email } = req.params;
        let result = await db.collection('users').findOne({ 'email': email.toUpperCase() });
        let tempStringDB = result.tempString;
        let comp = await bcrypt.compare(tempString, tempStringDB);
        console.log(comp)
        if (comp) {
            res.status(200).json({ 'message': 'verified' });
        } else {
            res.status(404).json({ 'message': 'not verified' });
        }
    } catch (err) {
        res.status(500).json({ 'message': 'internal server error' });
    }
})

app.post('/createNewPassword', async (req, res) => {
console.log('hi')
    try {
        let client = await mongoClient.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        let db = client.db('pinterest-user');
        let {password,user} = req.body;
        let salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(password,salt);

        await db.collection('users').findOneAndUpdate({ 'email': user.toUpperCase() }, { $set: { 'password': hash } });
        res.status(200).json({'message':'password updated'});
    }catch(err){
        res.status(404).json({'message':'cannot update'});
    }
})

app.post('/addPost', async (req,res)=>{
    let { imgSrc , title , description} = req.body ; 
    try{
    let client = await mongoClient.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    let db = client.db('pinterest-user');
    let result = await db.collection('posts').insertOne({imgSrc , "postHeading" : title , "postDescription" :description});
    res.status(200).json({ 'message': 'inserted!' });
    }catch(e){
        res.status(500).json({'error':'error occurred'});
    }   
})