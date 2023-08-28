const express = require('express')
const {createProxyMiddleware} = require('http-proxy-middleware')
const dotenv = require("dotenv")

dotenv.config({path: './apiGateway/config/.env'})


const app = express()

const routes = {
    '/api/mongo/users': 'http://localhost:8000',
    '/api/pg/users': 'http://localhost:6000'
}

for (const route in routes) {
    const target = routes[route]
    console.log(`Target for route ${route}: ${target}`)
    app.use(route, createProxyMiddleware({target}))
}

app.listen(process.env.BASE_PORT, () => {
    console.log(`http://localhost:${process.env.BASE_PORT}`)
})