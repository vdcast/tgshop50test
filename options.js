module.exports = {
	//inline buttons
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
	},
	productPageInlineButtons: {
		reply_markup: JSON.stringify({
			inline_keyboard: [
				[{text: 'Page 1', callback_data: 'productpage1'}, {text: '>>', callback_data: 'productPageNext1'}],

			]
		})
	},

	//keyboard buttons
	homeKeyboardOptions: {
		reply_markup: {
			resize_keyboard: true,
			one_time_keyboard: false,
			keyboard: [
				['\u{1F33A} Shop', '\u{1F464} Profile'],
				['\u{1F64C} How To Order', '\u{1F4DD} List Of Stores'],
				['\u{1F69A} Shipping Details', '\u{1F4B0} Currency Rate'],
				['\u{1F4E2} Our Channels', '\u{1F4CC} About us']
			],
		},
	},

	profileKeayboardOptions: {
		reply_markup: {
			resize_keyboard: true,
			one_time_keyboard: false,
			keyboard: [
				['\u{1F33A} Shop', 'Profile'],
				['Back Home'],
			],
		},
	},
	shopKeayboardOptions: {
		reply_markup: {
			resize_keyboard: true,
			one_time_keyboard: false,
			keyboard: [
				['Women', 'Men'],
				['Kids', 'All Products'],
				['Back Home'],
			],
		},
	},
	womenKeyboardOptions: {
		reply_markup: {
			resize_keyboard: true,
			one_time_keyboard: false,
			keyboard: [
				['Shoes W', 'Top W'],
				['Bottom W', 'Accessories W'],
				['Back Shop'],
			],
		},
	},
	shoesWomenKeyboardOptions: {
		reply_markup: {
			resize_keyboard: true,
			one_time_keyboard: false,
			keyboard: [
				['30-34 W Shoes', '34-38 W Shoes'],
				['38-42 W Shoes', 'All sizes W Shoes'],
				['Back Women'],
			],
		},
	},
	topWomenKeyboardOptions: {
		reply_markup: {
			resize_keyboard: true,
			one_time_keyboard: false,
			keyboard: [
				['XSx W Top', 'S W Top'],
				['M W Top', 'L W Top'],
				['XLx W Top', 'All sizes W Top'],
				['Back Women'],
			],
		},
	},
	
}