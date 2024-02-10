const mongoose = require('mongoose')

const msgListSchema = mongoose.Schema(
	{
		address: {
			type: String
		},
		mode: {
			type: String
		},
		parameter: {
			type: String
		},
		value: {
			type: String
		}
	},
	{
		timestamps: true
	}
)

module.exports = mongoose.model('msgList', msgListSchema)