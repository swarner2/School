var addAnswer = function(text,sentenceIndex, wordIndex){
	console.log(sentenceIndex, wordIndex)
	var html = $().add(''.concat(
			'<div class="answer">',
				'<span class="text">',
					text,
				'</span>',
				'<div class="input">',
					'<input>',
					'<button onclick="removeSentence('+answers.length+')" id="removeSentence">',
						'X',
					'</button>',
				'</div>',
			'</div>'
		)
	);
	answers.push([html]);
	render();
}