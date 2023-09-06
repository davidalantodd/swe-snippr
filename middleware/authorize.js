const jwt = require('jsonwebtoken')

/**
 * Parse and verify the token. If authentic, attach the payload to req.user
 * and pass to the next middleware.
 */

/* example header for authorizing access to resources:
Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXN0QHVzZXIuY29tIiwiaWF0IjoxNjk0MDE2ODEwfQ.NU-hUIFb78DRHC4-N2Gir9DhIu89a2JA3t518OvCsGE"
*/

async function authorize(req, res, next) {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const accessToken = authHeader.split(' ')[1]

  console.log(accessToken)

  try {
    req.user = jwt.verify(accessToken, process.env['TOKEN_SECRET'])   //authorization example!
    next()
  } catch (err) {
    res.status(403).json({ error: 'Invalid token' })
  }
}

module.exports = authorize
