const express = require('express')
const app = express()
const PORT = 4000

app.use(express.json())

// array to store snippets
const snippets = require('./seedData.json')

// generate a unique ID for each snippet
let id = snippets.length + 1

// create a new snippet
app.post('/snippet', (req, res) => {
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

  snippets.push(snippet)
  res.status(201).json(snippet)
})

// get all snippets
app.get('/snippet', (req, res) => {
  const { lang } = req.query

  /* Exact match
  if (lang) {
    const filteredSnippets = snippets.filter(
      snippet => snippet.language.toLowerCase() === lang.toLowerCase()
    )
    return res.json(filteredSnippets)
  }*/

  //Stretch goal: Filters for a partial match with regular expressions
  if (lang) {
    const regex = new RegExp(lang, "gi")
    const filteredSnippets = snippets.filter(
      snippet => snippet.language.match(regex)
    )
    return res.json(filteredSnippets)
    }

  res.json(snippets)
})

// get a snippet by ID
app.get('/snippet/:id', (req, res) => {
  const snippetId = parseInt(req.params.id)
  const snippet = snippets.find(snippet => snippet.id === snippetId)

  if (!snippet) {
    return res.status(404).json({ error: 'Snippet not found' })
  }

  res.json(snippet)
})

//Stretch tasks

// edit a snippet by ID
app.put('/snippet/:id', (req, res) => {
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
      "id":foundIndex+1,
      "language":language,
      "code":code
    })
  }
  res.status(200).json(`Snippet with id=${snippetId} updated to {language: ${snippets[foundIndex].language}, code: ${snippets[foundIndex].code}}`)
})

//delete a snippet by ID
app.delete('/snippet/:id', (req, res) => {
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

// start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
