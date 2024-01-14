const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5000;
const axios = require('axios');
require('dotenv').config()

app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://HUMAYUNTRADERS:Zhmi32pkpOyjAWkk@cluster0.tdvw5wt.mongodb.net/HumayunDB?retryWrites=true&w=majority`;

mongoose.connect(uri, {
});

const db = mongoose.connection;

db.on('error', (err) => {
    console.error(`Error connecting to MongoDB: ${err}`);
});

db.once('open', () => {
    console.log('Connected to MongoDB');
});

const userCollection = mongoose.model('userCollection', new mongoose.Schema({}, { strict: false }));

const productSchema = {
    "email": "user@example.com",
    "photoURL": "https://example.com/profile.jpg",
    "displayName": "John Doe",
    "userRole": "customer",
    "totalBuy": 5000,
    "due": 200,
    "address": "123 Main Street, Cityville",
    "nidCardNumber": "1234567890123456",
    "phoneNumber": "+1 123-456-7890",
    "reference": "Friend's name",
    "code": 12345678,
    "agentDealingInfo": {
        "perDeal": 100,
        "monthly": 800,
        "yearly": 9600
    },
    "productBuyInfo": [
        {
            "productName": "Product A",
            "quantity": 2,
            "date": "2024-01-13",
            "productDetails": "Details about Product A",
            "productPrice": 50,
            "paymentMethod": "Credit Card"
        },
        {
            "productName": "Product B",
            "quantity": 1,
            "date": "2024-01-14",
            "productDetails": "Details about Product B",
            "productPrice": 30,
            "paymentMethod": "Cash"
        }
    ]
}


// -------------------------delarCollection------------------------------

app.get('/getUser', async (req, res) => {
    const dealerId = req.query.dealerId;
    const dealer = await userCollection.findById(dealerId);
    res.send(dealer);
})

app.post('/createUser', async (req, res) => {
    const dealer = req.body;
    const create = await userCollection.create(dealer);
    res.send(create)
})

app.post('/updateUser', async (req, res) => {
    const dealerId = req.query.dealerId;
    const {email, photoURL, displayName, userRole, totalBuy, due, address, nidCardNumber, phoneNumber, reference, code } = req.body;

    const update = await userCollection.updateOne(
        { _id: new Object(id) },
        { $set: { email: email, photoURL: photoURL, displayName: displayName, userRole: userRole, totalBuy: totalBuy, due: due, address: address, nidCardNumber: nidCardNumber, phoneNumber: phoneNumber, reference: reference, code: code } },
    );
    res.send(update)
})

app.delete('/deleteUser', async (req, res) => {
    const id = req.query.dealerId;
    const result = await userCollection.deleteOne({ _id: new Object(id) });
    res.send(result)
})


// --------------------------------------localApi-------------------------------------------

app.get('/', (req, res) => {
    res.send('Humayur traders server running');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});