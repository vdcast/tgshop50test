module.exports = {
	gameOptions: {
		reply_markup: JSON.stringify({
			inline_keyboard: [
				[{text: '1', callback_data: '1'}, {text: '2', callback_data: '2'}, {text: '3', callback_data: '3'}],
				[{text: '4', callback_data: '4'}, {text: '5', callback_data: '5'}, {text: '6', callback_data: '6'}],
				[{text: '7', callback_data: '7'}, {text: '8', callback_data: '8'}, {text: '9', callback_data: '9'}],
				[{text: '0', callback_data: '0'}],
			]
		})
	},

	againOptions: {
		reply_markup: JSON.stringify({
			inline_keyboard: [
				[{text: 'Play again', callback_data: '/again'}],
				[{text: 'Information', callback_data: '/info'}],
				[{text: 'Home', callback_data: '/home'}],								

			]
		})
	},

	homeKeayboardOptions: {
		reply_markup: {
			resize_keyboard: true,
			one_time_keyboard: false,
			keyboard: [
				['yes', 'Okay'],
				['no', 'Go', 'Yes'],
				['no', 'Go', 'Yetye', 'Yeah']
			],
		},
	},

	homeOptions: {
		reply_markup: JSON.stringify({
			inline_keyboard: [
				[{text: 'Play game', callback_data: '/again'}],
				[{text: 'Information', callback_data: '/info'}],
				[{text: 'Support', callback_data: '/support'}],

			]
		})
	},

	infoOptions: {
		reply_markup: JSON.stringify({
			inline_keyboard: [
				[{text: 'Play game', callback_data: '/again'}],
				[{text: 'Home', callback_data: '/home'}],

			]
		})
	},

	supportOptions: {
		reply_markup: JSON.stringify({
			inline_keyboard: [
				[{text: 'Home', callback_data: '/home'}],

			]
		})
	}
}