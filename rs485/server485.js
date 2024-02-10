'use strict'
require('dotenv').config()
const net = require('net')
const S321 = require(`${__dirname}/S321`)

const port485 = process.env.PORT_485
const host485 = process.env.HOST_485

const sendMsg485 = (address, mode, parameter, value) => {
    return new Promise((resolve, reject,) => {
        const client = new net.Socket()
        const vfd = new S321(address, mode, parameter, value)
        const msgNum = vfd.msgNum
        const msgStr = vfd.msgStr

        client.connect(port485, host485, () => {
            client.write(Buffer.from(msgNum))
        })
        client.on('data', (data) => {
            client.destroy()
            resolve({ command: msgStr, response: data.toString('hex') })
        })
    })
}

module.exports = sendMsg485