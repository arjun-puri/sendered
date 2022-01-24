const express = require('express');
const serverless = require('serverless-http');
const mongoose = require('mongoose');
require('dotenv').config()

// MONGODB
const Schema = mongoose.Schema;

const OfferSchema = new Schema({
    data: JSON,
});

const Offer = mongoose.models.Offer || mongoose.model('Offer', OfferSchema);

// Express
const app = express();
const router = express.Router()

app.use(express.json())
app.use('/.netlify/functions/', router)
// app.use('/', router)

// router.get('/', (req, res) => {
//     res.writeHead(200, { 'Content-Type': 'text/html' });
//     res.write('<h1>Hello from Express.js!</h1>');
//     res.end();
// });

// router.get('/createOffer', (req, res) => {
//     console.log('someone connected!');
//     res.status(200).json({"message": 'kappa'});
// })

router.post('/createOffer', (req, res) => {
    // connect to mongodb
    mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@sendered.potvt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, { useNewUrlParser: true });
    const db = mongoose.connection;
    // await its opening
    db.once('open', async () => {
        // create new offer obj
        const offer = new Offer({
            data: req.body.offer,
        })
        // save the offer obj on the db
        await offer.save((err, doc) => {
            if(err) console.error(err);
            console.log(doc);
        })
        res.status(200).json({message: "offer created!"});
    })
})

module.exports = app;
module.exports.handler = serverless(app);