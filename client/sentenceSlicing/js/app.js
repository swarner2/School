


var QueryString = function () {
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = decodeURIComponent(pair[1]);
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
      query_string[pair[0]] = arr;
    } else {
      query_string[pair[0]].push(decodeURIComponent(pair[1]));
    }
  } 
    return query_string;
}();

//console.log(QueryString.text);

var text = QueryString.text;



$(document).ready(function(){
	//createSentence(sentence, '#sentence');
	createText('#field', text);
});

var createText = function(renderPoint, text){

	var convertSentenceToWords= function(sentence, sentenceIndex){
		return _.map(sentence.split(' '),function(element, index){
			//Create The Tags and behavior of a single word
			var word = []; 
			word[0] = $().add(''.concat(
					"<span class='word'>",
						element,
					"</span>"
				)
			).click(function(){
				var answerStr = '';
				for (var i = 0; i <= index; i++) {
					if(i===index)
						word[1] = true;
					answerStr += conText[sentenceIndex][i][0].text() + ' ';
				};
				addAnswer(answerStr);
			});
			word[1] = false;
			return word;
			//------------
		});
	};

	var addAnswer = function(text){
		var html = $().add(''.concat(
				'<div class="answer">',
					'<span class="text">',
						text,
					'</span>',
					'<div class="input">',
						'<input>',
						'<button onclick="createText.removeSentence('+answers.length+')" id="removeSentence">X</button>',
					'</div>',
				'</div>'
			)
		);
		answers.push(html);
		render();
	}
	createText.removeSentence = function(id){
		undo.push([id,answers[id]]);

		answers[id] = undefined;
		render();
	}
	var render = function(){
		if(!render.init){
			render.init = true;
			//nav bar
			$(renderPoint).html(''.concat(
				'<div class="paragraph">',
					'<button class="mainBtn undo">Undo</button>',
					'<button class="mainBtn finished">Finished</button>',
					'<span class="prompt"></span>',
					'<div class="sentences">',
					'</div>',
					'<div class="answers">',
					'</div>',
					'<textarea id="results"></textarea>',
				'</div>'
			));

			//controller for the finish btn

			$(renderPoint).children('div').children('.finished').click(function(){
				var finished = {
					text : text,
					textWithSlashes : getTextWithSlashes(),
					answers : _.map(answers, function(element){
						if(element) return [ element.children('.text').text(), element.children('.input').children('input').val()];
					})
				};

				function getTextWithSlashes(){
					return _.map(conText, function(element){
						return _.map(element, function(element){

							var returnedValue = element[0].text();;
							if(element[1]){
								returnedValue+='/'
							}
							return returnedValue;
						}).join(' ');;
					}).join('');
				}

				//making the results display in a nice way
				//the text
				var resultsText = ''.concat(
					finished.textWithSlashes,
					'\n\n'
				);
				//answers
				var counter = 1;
				_.each(finished.answers,function(element, index){
					if(element){
						resultsText = resultsText.concat(
							(counter++), '. ', element[0],
							'\n',
							'Meaning : ', element[1],
							'\n\n'
						);
					}
				});
				$('#results').text(resultsText);
				$('#results').select()
				try {
					var successful = document.execCommand('copy');
					var msg = successful ? 'successful' : 'unsuccessful';
					if(msg === 'unsuccessful'){
						$('.prompt').text('Oops, unable to copy. You can copy manually from text field below.');
					}else{
						$('.prompt').text('Your chipboard has your results.');	
					}
				}catch (err) {
					$('.prompt').text('Oops, unable to copy. You can copy manually from text field below.');
				}
				//window.prompt("Copy to clipboard then submit it to the teacher:", JSON.stringify(finished));
			})

			//controller for the undo btn
			$(renderPoint).children('div').children('.undo').click(function(){
				var val = undo.pop();
				answers[val[0]] = val[1];
				render();
			})
		}

		$('.slash').detach()
		_.each(conText, function(element){
			_.each(element, function(element){

				$('.sentences').append(element[0]);
				if(element[1]){
					var g = $().add('<span class="slash">/</span>')
					$('.sentences').append(g);
					
				}
				$('.sentences').append(' ');
			});
		});
		$('.answers').html('');
		_.each(answers, function(element){
			$('.answers').append(element);
		});
	};


	conText = [];
	answers = [];
	var undo = [];
	//slice the text into sentences
	var textBackup = text;
	while(textBackup.length){
		var index = textBackup.search(/[.!?]/)+1;
		conText.push(textBackup.slice(0,index));
		textBackup = textBackup.slice(index,textBackup.length);
	}
	//slice each sentence into words
	conText = _.map(conText, function(element,index){
		return convertSentenceToWords(element,index);
	});

	render();

}