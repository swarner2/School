



var text = 'I am a sentence slice me; No, for real slice me up. I am here to be sliced! Do you know what I mean?';

$(document).ready(function(){
	//createSentence(sentence, '#sentence');
	createText('#sentence', text);
});

var createText = function(renderPoint, text){

	var convertSentenceToWords= function(sentence, sentenceIndex){
		return _.map(sentence.split(' '),function(element, index){
			//Create The Tags and behavior of a single word
			return $().add(''.concat(
					"<span class='word'>",
						element,
					"</span>"
				)
			).click(function(){
				var answerStr = '';
				for (var i = 0; i <= index; i++) {
					answerStr += conText[sentenceIndex][i].text() + ' ';
				};
				addAnswer(answerStr);
				render();
			});
			//------------
		});
	};

	var addAnswer = function(text){
		var html = $().add(''.concat(
				'<div class="answer">',
					'<span class="text">',
						text,
					'</span>',
					'<span class="input">',
						'<button onclick="createText.removeSentence('+answers.length+')"id="removeSentence">X</button>',
						'<input>',
					'</span>',
				'</div>'
			)
		);

		answers.push(html);
		return html;
	}
	createText.removeSentence = function(id){
		answers[id] = undefined;
		render();
	}
	var render = function(){
		if(!render.init){
			render.init = true;
			$(renderPoint).html(''.concat(
				'<div class="paragraph">',
					'<div class="sentences">',
					'</div>',
					'<div class="answers">',
					'</div>',
				'</div>'
			));
		}
		_.each(conText, function(element){
			$('.sentences').append(element);
		});
		$('.answers').html('');
		_.each(answers, function(element){
			$('.answers').append(element);
		});
		
		//answer senction of the field

		// $(renderPoint).append('<div class="answers">');
		// 	$(renderPoint).append(_.map(answers, function(element){
		// 		return ''.concat(
		// 		'<div class="answer">',
		// 			'<span>',
		// 				element,
		// 			'</span>',
		// 			'<input>',
		// 			'<button id="removeSentence">X</button>',
		// 		'</div>'
		// 		);
		// 	}).join(''));
		// $(renderPoint).append('</div>');
	};


	conText = [];
	answers = [];
	//slice the text into sentences
	while(text.length){
		var index = text.search(/[.!?]/)+1;
		conText.push(text.slice(0,index));
		text = text.slice(index,text.length);
	}
	//slice each sentence into words
	conText = _.map(conText, function(element,index){
		return convertSentenceToWords(element,index);
	});

	render();

}