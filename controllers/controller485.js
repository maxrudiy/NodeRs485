'use strict'
const sendMsg485 = require(`${__dirname}/../rs485/server485`)
const MsgLog = require(`${__dirname}/../models/msgLogModel`)
const msgList = require(`${__dirname}/../models/msgListModel`)

const sendMsgApi = async (req, res) => {
	try {
		const msg = req.body
		const result = await sendMsg485(msg.address, msg.mode, msg.parameter, msg.value)
		const msgLog = await MsgLog.create(result)
		res.status(200).json(msgLog)
	} catch (error) {
		res.status(500);
		throw new Error(error.message)
	}
}

const listMsgApi = async () => {
	null
}

module.exports = { sendMsgApi, listMsgApi }