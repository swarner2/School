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
					if(element){ return [
							element[0].children('.text').text(), 
							element[0].children('.input').children('input').val()
						];
					}
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
			$('#results').css({
				visibility: 'visible'
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