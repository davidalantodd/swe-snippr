require('dotenv').config() // bring in environment variables
const express = require('express')
const routes = require('./routes')
const { auth } = require('express-openid-connect')

const app = express()
const PORT = 4000

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env['TOKEN_SECRET'],
  baseURL: 'http://localhost:4000',
  clientID: 'pBrHu7U6eYvmrOMpbagfzUyH1iDEvcxR',
  issuerBaseURL: 'https://dev-nxyejtxm.us.auth0.com'
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
