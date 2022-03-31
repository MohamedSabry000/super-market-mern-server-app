const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require("dotenv");

const userRoutes = require('./routes/user')
const productRoutes = require('./routes/product')

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/product', productRoutes);

// const CONNECTION_URL = "mongodb+srv://123:1234@cluster0.esv2k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";


const { HOST, CONNECTION_URL, PORT } = process.env;
// mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
//     .catch((error) => console.log(error));


mongoose
    .connect(CONNECTION_URL)
    .then(() => {
        console.log('DB connected');
    })
    .catch((err) => {
        console.error('connection failed =>', err);
    });

app.listen(PORT, HOST, () => {
    console.log('server is running');
});
// mongoose.set('useUnifiedTopology', false);