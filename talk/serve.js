import { serveDir } from 'https://deno.land/std/http/file_server.ts'

const headers = { headers: {'Content-Type': 'text/html'}}

const html = `
<!doctype html>
<html>
  <head>
    <title>HTMX JS.CHI Talk</title>
    <link rel="stylesheet" href="https://unpkg.com/missing.css@1.1.2" />
    <script src="https://unpkg.com/htmx.org@2.0.1"></script>
    <style>
      body { background: #f5f5f5; margin-top: 7em;}
      main { text-align: center; font-family: sans-serif; cursor: pointer;}
      main, main > * { animation: fadein .5s; }
      @keyframes fadein {
          from { opacity: 0; }
          to   { opacity: 1; }
      }
    </style>
  </head>
  <body>
    <main>
      <h1 hx-post='/ai' hx-swap='outerHTML'>Hello, Chicago JS!</h1>
    </main>
  </body>
</html>

`

const ai = '<h1 hx-post="/htmx" hx-swap="outerHTML" style="font-size: 12em;">AI</h1>',
      htmx = '<h1 hx-post="/htmxstuff1" hx-swap="afterend">htmx</h1>', 
      htmxstuff1 = '<p hx-post="/htmxstuff2" hx-swap="afterend">Why should only &lt;a&gt; & &lt;form&gt; be able to make HTTP requests?</p>', 
      htmxstuff2 = '<p hx-post="/htmxstuff3" hx-swap="afterend">Why should only click & submit events trigger them?</p>',
      htmxstuff3 = '<p hx-post="/htmxstuff4" hx-swap="afterend">Why should only GET & POST methods be available?</p>',
      htmxstuff4 = '<p hx-post="/http" hx-target="main"> Why should you only be able to replace the entire screen?</p>',
      http = '<h1 hx-post="/hypertext" hx-target="main">HTTP</h1>',
      hypertext = '<h1 hx-post="/html2" hx-target="main">Hypertext Transport Protocol!</h1>',
      html2 = '<h1 hx-post="/hypertext2" hx-target="main">HTML</h1>',
      hypertext2 = '<h1 hx-get="/but" hx-target="main">Hypertext Markup Language!</h1>',
      but = `<h1>OK... but...</h1>
        <button hx-get='/what' hx-target='#box'>What?</button>
        <button hx-get='/why' hx-target='#box'>Why?</button>
        <button hx-get='/how' hx-target='#box'>How?</button>
        <div id='box' style='width: 100%; border: 1px solid #ccc;'>This is a box!</div>,
      `,
      what = 'HTMX lets you create and deploy HDAs (hypermedia driven apps)',
      why = 'Because it makes you a more powerful webmaster',
      how = "Attributes on any html tag! Such as <code>hx-post</code>, <code>hx-swap</code>, <code>hx-target</code>! Let's look at some examples in real life."  

Deno.serve(r => {
  const path = new URL(r.url).pathname
  if (path === '/ai') { return new Response(ai, headers)} 
  if (path === '/htmx') { return new Response(htmx, headers)}
  if (path === '/htmxstuff1') {return new Response(htmxstuff1, headers)}
  if (path === '/htmxstuff2') {return new Response(htmxstuff2, headers)}
  if (path === '/htmxstuff3') {return new Response(htmxstuff3, headers)}
  if (path === '/htmxstuff4') {return new Response(htmxstuff4, headers)}
  if (path === '/http') {return new Response(http, headers)}
  if (path === '/hypertext') {return new Response(hypertext, headers)}
  if (path === '/html2') {return new Response(html2, headers)}
  if (path === '/hypertext2') {return new Response(hypertext2, headers)}
  if (path === '/but') {return new Response(but, headers)}
  if (path === '/what') {return new Response(what, headers)}
  if (path === '/why') {return new Response(why, headers)}
  if (path === '/how') {return new Response(how, headers)}
  
  else {return new Response(html, headers)}
})

