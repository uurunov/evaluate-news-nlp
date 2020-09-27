function handleSubmit(event) {
    event.preventDefault();

    // check what text was put into the form field
    let formText = document.getElementById('name').value;
    Client.checkForName(formText);

	console.log("::: Form Submitted :::");

	const postData = async ( url = '', data = {} ) => {
		console.log(data);
		const response = await fetch(url, {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
			},
			// Body data type must match "Content-Type" header
			body: JSON.stringify(data),
		});

		try {
			const newData = await response.json();
			console.log(newData);
			return newData;
		} catch(error) {
			console.log("error", error);
		}
	};

	postData('http://localhost:8081/api/add', {name:formText});

    fetch('http://localhost:8081/api/test')
    .then(res => res.text())
    .then(function(resp) {
		console.log(resp);
		document.getElementById('results').innerHTML = JSON.stringify(resp);
	});

	return document.getElementById('results').innerHTML;
}

export { handleSubmit }
