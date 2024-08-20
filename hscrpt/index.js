import express from 'npm:express'
import hscrpt from 'npm:hscrpt'
import { db } from './../db.js'

const h = hscrpt

const app = express()
const port = 3000

const html = `
<!doctype html>
<html>
  <head>
    <script type='text/javascript'>
      ${h}
    </script>
    <style type='text/css'>
      body { font-family: sans-serif; }
    </style>
  </head>
  <body>
  </body>
</html>
`

app.get('/', (req, res) => { res.send(html) })

app.get('/api', (req, res) => { res.send(db) })

app.listen(port, () => { console.log(`Listening at http://localhost:${port}/`) })
