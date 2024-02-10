const mongoose = require('mongoose')

const msgLogSchema = mongoose.Schema(
	{
		command: {
			type: String
		},
		response: {
			type: String
		}
	},
	{
		timestamps: true
	}
)

module.exports = mongoose.model('MsgLog', msgLogSchema)