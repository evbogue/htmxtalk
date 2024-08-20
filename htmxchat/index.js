import express from 'npm:express'
import { marked } from 'npm:marked'

const app = express()
const port = 3000

app.use(express.urlencoded({ extended: true })) 

const log = []

const composer = `
  <h1>htmx chat</h1>
  <input id='chat' placeholder="What's happening?" name="message"/>
  <button hx-post='/room' hx-target='main' hx-include='#chat'>Send</button>
  <button id='refresh' hx-get='/refresh' hx-target='#messages'>Refresh</button>
`

const feed = () => {
  let roomContents = ''
  for (let i = 0; i < log.length; i++) {
    roomContents = roomContents + marked(log[i])
  }
  return roomContents
}

const render = () => {
  return `
  <!doctype html>
  <html>
    <head>
      <script src="https://unpkg.com/htmx.org@2.0.1"></script>
      <link rel="stylesheet" href="https://unpkg.com/missing.css@1.1.2">
      <style>p { margin: 0; }</style>
      <script>
        setInterval(() => {
          refresh.click()
        }, 1000)
      </script>
    </head>
    <body>
      <main>
      ${composer}
      <div id='messages'></div>
      </main>
    <body>
  </html>
  ` 
}

app.get('/', (req, res) => { res.send(render()) })

app.post('/room', (req, res) => {
  if (req.body.message){ log.unshift(req.body.message)}
  res.send(composer + "<div id='messages'>" + feed() + "</div>")
})

app.get('/refresh', (req, res) => { res.send(feed()) })

app.listen(port, () => { console.log(`Listening at http://localhost:${port}/`) })
