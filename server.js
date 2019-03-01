const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const server = express()

app.prepare().then(() => {
  let guestbook = []
  
  server.use(express.json())

  server.post('/api/guestbook', (req, res, next) => {
    const guest = {
      name: req.body.name,
      message: req.body.message
    }

    guestbook.push(guest);
    res.send('success!')
  })

  server.get('/api/guestbook', (req, res, next) => {
    res.json({
      posts: guestbook
    })
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
}).catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})

