const express = require('express')
const WebSocket = require('ws')
const http = require('http')
const url = require('url')
const path = require('path')
const app = express()
const port = 3000

app.use(express.static(path.join(__dirname, 'public')))

const server = http.createServer(app)
const wss = new WebSocket.Server({server})
const clients = [];

wss.on('connection', function connection(ws) {
    const username = `User ${clients.length + 1}`;

    console.log("WS connection arrived");
    clients.push({name: username,ws});

    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
        clients.forEach(client => {
            if (client.ws.readyState === WebSocket.OPEN) {
                console.log("Message :", message.toString());
                client.ws.send(`${username} -> ${message.toString()}`);
            }
        });
    });

    ws.on('close', () => {
        // Remove the client from the array when it disconnects
        const index = clients.findIndex(client => client.ws === ws);
        if (index > -1) {
            clients.splice(index, 1);
            console.log(`Client ${username} disconnected`);
            // clients.ws.send(`------------ Client ${username} disconnected ------------`);
        }
    });

    ws.send('Websocket server connected!')
});


// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

