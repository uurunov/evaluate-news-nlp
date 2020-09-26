function handleSubmit(event) {
    event.preventDefault();

    // check what text was put into the form field
    let formText = document.getElementById('name').value;
    Client.checkForName(formText);

	console.log("::: Form Submitted :::");

    fetch('http://localhost:8081/test')
    .then(res => res.json())
    .then(function(res) {
		fetch(`https://api.meaningcloud.com/sentiment-2.1?key=${res.parsed.API_KEY}&of=json&txt=${formText}&lang=en`)
		.then(resp => resp.json())
		.then(function(response) {
			console.log(response.sentence_list[0]);
			document.getElementById('results').innerHTML = JSON.stringify(response.sentence_list[0]);
		})
	});

	return document.getElementById('results').innerHTML;
}

export { handleSubmit }
