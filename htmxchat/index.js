import express from 'npm:express'
import { marked } from 'npm:marked'

const app = express()
const port = 3000

app.use(express.urlencoded({ extended: true })) 

const kv = await Deno.openKv()

await kv.delete(['log'])

const getFeed = async () => {
  const log = await kv.get(['log'])
  console.log(log)

  return JSON.parse(log.value) || []
}

const addToLog = async (msg) => {
  const log = await getFeed()
  log.unshift(msg)
  await kv.set(['log'], JSON.stringify(log))
}

const htmlFeed = async () => {
  const log = await getFeed()
  let feed = ''
  for (const msg of log) {
    console.log(msg)
    feed = feed + `<p style='margin-top: 5px; padding: 3px; border: 1px solid #eee;'>${msg}</p>`
  }
  return feed
}

const composer = `
  <h1>htmx chat</h1>
  <input id='chat' placeholder="What's happening?" name="message"/>
  <button hx-post='/room' hx-target='main' hx-include='#chat'>Send</button>
  <button id='refresh' hx-get='/refresh' hx-target='#messages'>Refresh</button>
`

const render = () => {
  return `
  <!doctype html>
  <html>
    <head>
      <script src="https://unpkg.com/htmx.org@2.0.1"></script>
      <script src="https://unpkg.com/qrcodejs@1.0.0/qrcode.min.js"></script>
      <link rel="stylesheet" href="https://unpkg.com/missing.css@1.1.2">
      <style>p { margin: 0; }</style>
    </head>
    <body style='margin: 2em;'>
    <div id='qrcode' style='float: right;'></div>
      <main>
      ${composer}
      <div id='messages'></div>
      </main>
    </body>
    <script>
      setInterval(() => {
        refresh.click()
      }, 1000)
      new QRCode(document.getElementById("qrcode"), "https://htmx-chat.deno.dev")
    </script>
  </html>
  ` 
}

app.get('/', (req, res) => { res.send(render()) })

app.post('/room', async (req, res) => {
  if (req.body.message){ await addToLog(req.body.message)}
  res.send(composer + "<div id='messages'>" + await htmlFeed() + "</div>")
})

app.get('/refresh', async (req, res) => { res.send(await htmlFeed()) })

app.listen(port, () => { console.log(`Listening at http://localhost:${port}/`) })
