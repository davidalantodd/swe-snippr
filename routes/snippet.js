const route = require('express').Router()
const { encrypt, decrypt } = require('../utils/encrypt')

// array to store snippets
const snippets = require('../seedData.json')

//encrypt each snippet's code
snippets.map((snippet, index) => {
  // snippet.code = encrypt(snippet.code) (another way to accomplish the same thing!)
  snippets[index] = { ...snippet, code: encrypt(snippet.code) }
})

// generate a unique ID for each snippet
let id = snippets.length + 1

/**
 * Create a snippet
 */
route.post('/', (req, res) => {
  const { language, code } = req.body

  // basic validation
  if (!language || !code) {
    return res
      .status(400)
      .json({ error: 'Language and code are required fields' })
  }

  const snippet = {
    id: id++,
    language,
    code
  }

  // overwrite code with encrypted before storing
  snippets.push({ ...snippet, code: encrypt(code) })

  // send back the unencrypted snippet
  res.status(201).json(snippet)
})

/**
 * Get all snippets
 */
route.get('/', (req, res) => {
  const { lang } = req.query

  console.log("encrypted code snippets that are stored", snippets)

  // decrypt all snippets
  const decodedSnippets = snippets.map(snippet => ({
     ...snippet,
    code: decrypt(snippet.code)
  }))

  // handle query strings
  // if (lang) {
  //   const filteredSnippets = decodedSnippets.filter(
  //     snippet => snippet.language.toLowerCase() === lang.toLowerCase()
  //   )
  //   return res.json(filteredSnippets)
  // }

   //filter more than exact match
   if (lang) {
    const regex = new RegExp(lang, "gi")
    const filteredSnippets = decodedSnippets.filter(
      snippet => snippet.language.match(regex)
    )
    return res.json(filteredSnippets)
    }

  console.log("decrypted code from get request that will be sent as a response: ", decodedSnippets)
  res.json(decodedSnippets)
})

/**
 * Get one snippet
 */
route.get('/:id', (req, res) => {
  const snippetId = parseInt(req.params.id)
  let snippet = snippets.find(snippet => snippet.id === snippetId)

  console.log("encrypted code snippet that is stored", snippet)

  if (!snippet) {
    return res.status(404).json({ error: 'Snippet not found' })
  }
  // decrypt before sending back
  snippet = {...snippet, 'code': decrypt(snippet.code)}
 
  console.log("decrypted code from get request that will be sent as a response: ", snippet)

  res.json(snippet)
})


//STRETCH GOALS

// edit a snippet by ID
route.put('/:id', (req, res) => {
  const snippetId = parseInt(req.params.id)
  const {language, code} = req.body
  let foundIndex = -1
  snippets.map((s, index) => {
    if (s.id == snippetId){
      foundIndex = index
    } 
    return s
  })
  if (foundIndex == -1){
    res.status(404).json("error: 'Snippet not found, not able to be updated")
  } else {
    snippets.splice(foundIndex, 1, {
      ...snippets[foundIndex],
      "language": language,
      "code": encrypt(code)
    })
  }

  res.status(200).json(`Snippet with id=${snippetId} updated to {language: ${snippets[foundIndex].language}, code: ${snippets[foundIndex].code}}`)
})

//delete a snippet by ID
route.delete('/:id', (req, res) => {
  const snippetId = parseInt(req.params.id)
  const {language, code} = req.body
  let foundIndex = -1
  snippets.map((s, index) => {
    if (s.id == snippetId){
      foundIndex = index
    } 
    return s
  })
  if (foundIndex == -1){
    res.status(404).json("error: 'Snippet not found, not able to be deleted")
  } else{
    snippets.splice(foundIndex, 1)
    console.log(snippets)
  }
  res.status(200).json(`Snippet with id=${snippetId} deleted`)
})

module.exports = route
