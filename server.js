const { Worker } = require('worker_threads')
const express = require('express')

const app = express()

let counter = 0
app.get('/', (req, res) => {
    counter++
    res.status(200).json({ counter })
})

app.get('/worker', (req, res) => {
    const worker = new Worker('./worker.js')
    worker.on('message', (data) => {
        res.status(200).json({ total: data })
    })
})

app.listen(1337, () => console.log('Server is listening on port 1337'))