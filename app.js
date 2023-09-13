require('dotenv').config() // bring in environment variables
const express = require('express')
const routes = require('./routes')
const { auth } = require('express-openid-connect')

const app = express()
const PORT = 4000

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env['TOKEN_SECRET'],  // (can generate random --> openssl rand -base64 32)
  baseURL: 'http://localhost:4000',
  clientID: process.env['CLIENT_ID'], //need to change this to my personal client ID
  issuerBaseURL: process.env['ISSUER_BASE_URL'] // need to change this to my application's issuer base URL
}

app.use(express.json())

// auth0 router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config))

// apply the routes
app.use('/snippet', routes.snippet)
app.use('/user', routes.user)

app.get('/ping', (req, res) => {
  res.send({ msg: 'pong' })
})

// start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
