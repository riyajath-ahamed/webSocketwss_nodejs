const express = require('express')
const WebSocket = require('ws')


const app = express()
const port = 3000
const wss = new WebSocket.Server({ port: 8181 })

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

wss.on('connection', function connection(ws) {
    ws.on('message',function incoming(message){
        console.log('received: %s', message)

    })
    ws.send('Something')
});