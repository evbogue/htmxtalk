import express from 'npm:express'

const app = express()
const port = 3000

app.use(express.urlencoded({ extended: true }))

const html = `
<!doctype html>
<html>
  <head>
    <script src="https://unpkg.com/htmx.org@2.0.1"></script>
    <script src="https://unpkg.com/qrcodejs@1.0.0/qrcode.min.js"></script>
    <link rel="stylesheet" href="https://unpkg.com/missing.css@1.1.2">
  </head>
  <body style="margin:2em;">
  <div id='qrcode' style='float: right;'></div>
  <main>
    <button hx-get='/input' hx-swap='outerHTML'>Make Ev's Phone Buzz</button>
  </main></body>
  <script>new QRCode(document.getElementById("qrcode"), "https://htmx-text-ev.deno.dev")</script>
</html>
`

const input = `
  <input id='text' placeholder='Send Everett a text' name='message'>
  <button hx-post='/send' hx-include='#text' hx-target='main'>Send</button>
`


app.get('/', (req, res) => {
  res.send(html)
})

app.get('/input', (req, res) => {
  res.send(input)
})

app.post('/send', (req, res) => {
  fetch('https://ntfy.sh/evbogue', {
    method: 'POST',
    body: req.body.message,
    headers: { 'Priority': '5' }
  }) 
  const sent = `
   <p>You sent a message: "${req.body.message}"</p>
   <button hx-get='/input' hx-target='main'>Send another</button>
  `
  res.send(sent) 
})

app.listen(port, () => { console.log(`Listening at http://localhost:${port}/`) })
