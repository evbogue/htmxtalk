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
    <body>
      <header>
        <img src='${db.image}' style='width: 75px; height: 75px;'/>
        <h1>${db.name}'s website</h1>
        <button hx-get='/home' hx-target='#content'>Home</button> |
        <button hx-get='/bio' hx-target='#content'>Bio</button> |
        <button hx-get='/contact' hx-target='#content'>Contact</button>
      </header>
      <main id='content'>
      ${marked(content)}
      </main>
      <footer>
        © Copyright 2024 ${db.name}
      </footer>
    </body>
  </html>
  ` 
}

app.get('/', (req, res) => { res.send(render(db.home)) })
app.get('/home', (req, res) => { res.send(marked(db.home)) })
app.get('/bio', (req, res) => { res.send(marked(db.bio))})
app.get('/contact', (req, res) => { res.send(marked(db.contact))})

app.listen(port, () => { console.log(`Listening at http://localhost:${port}/`)})
