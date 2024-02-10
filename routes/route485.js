'use strict'
const express = require('express');
const { sendMsgApi, listMsgApi } = require(`${__dirname}/../controllers/controller485`)

const router = express.Router()


router.post('/send_msg/', sendMsgApi)
router.get('/list_msg/', listMsgApi)

module.exports = router