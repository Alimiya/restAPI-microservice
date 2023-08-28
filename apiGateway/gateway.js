const express = require('express')
const {createProxyMiddleware} = require('http-proxy-middleware')
const dotenv = require("dotenv")

dotenv.config({path: './config/.env'})
dotenv.config({path: '../restMongo/config/.env'})
dotenv.config({path: '../restPostgre/config/.env'})


const app = express()

const routes = {
    '/api/mongo/users': process.env.URL,
    '/api/pg/users': process.env.BASE_URL
}

for (const route in routes) {
    const target = routes[route]
    app.use(route, createProxyMiddleware({target}))
}

app.listen(process.env.BASE_PORT, () => {
    console.log(`http://localhost:${process.env.BASE_PORT}`)
})