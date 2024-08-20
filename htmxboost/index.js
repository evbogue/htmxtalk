import express from 'npm:express'
import { db } from './../db.js'
import { marked } from 'npm:marked'

const app = express()
const port = 3000

const render = (content) => {
  return `
  <!doctype html>
  <html>
    <head>
      <script src="https://unpkg.com/htmx.org@2.0.1"></script>
      <link rel="stylesheet" href="https://unpkg.com/missing.css@1.1.2">
    </head>
    <body hx-boost="true">
      <header>
        <img src='${db.image}' style='width: 75px; height: 75px;'/>
        <h1>${db.name}'s website</h1>
        <p>
          <a href='/'>Home</a> |
          <a href='/bio'>Bio</a> |
          <a href='/contact'>Contact</a>
        </p>
      </header>
      <main>
      ${marked(content)}
      </main>
      <footer>
        © Copyright 2024 ${db.name}
      </footer>
    </body>
  </html>
  ` 
}

app.get('/', (req, res) => {
  res.send(render(db.home))
})

app.get('/bio', (req, res) => {
  res.send(render(db.bio))
})

app.get('/contact', (req, res) => {
  res.send(render(db.bio))
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`)
})
