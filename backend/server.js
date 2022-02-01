const express = require('express')
const cors = require('cors')
const PORT = 8000;
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

// const postRoutes = require('./routes/postRoutes')
// app.use('/api/', postRoutes)


const userrouter = require('./routing/userrouter')
app.use('/api/', userrouter)


const productrouter = require('./routing/productrouter')
app.use('/api/', productrouter)


const categoryrouter = require('./routing/categoryrouter')
app.use('/api/', categoryrouter)


const profilerouter = require('./routing/profilerouter')
app.use('/api/', profilerouter)


const orderrouter = require('./routing/orderrouter')
app.use('/api/', orderrouter)

const connectDB = require('./config/db')
connectDB()
app.listen(PORT, (err) => {
    if (err) throw err;
    else {
        console.log("Server runs on " + PORT)
    }
})
