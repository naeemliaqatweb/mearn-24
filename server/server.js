require('dotenv').config();
const express = require('express');
const authRouter = require('./router/auth-router');
const contactRouter = require('./router/contact-router');
const serviceRoute = require('./router/service-route');
const connectDB = require('./utils/db');
const errorMiddleware = require('./middlewares/error-middleware');

// const cros = require('cros');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173'); // Allow requests from this origin
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true'); // Allow credentials (optional)
    if (req.method === 'OPTIONS') {
        // Handle preflight request
        return res.status(200).end();
    }
    next();
});

// app.options('*', cors());
app.use('/api/auth', authRouter);
app.use('/api/form', contactRouter);
app.use('/api/data', serviceRoute);

app.use(errorMiddleware);


const PORT = 5000;

connectDB().then(() => {
    app.listen(PORT , () => {
        console.log(`Server is running in port:${PORT}`);      
    });
});