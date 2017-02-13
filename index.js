const jsdom = require("jsdom");
const delay = 10;	//loop delay in seconds
let url = '';	//default url
let ccsSelector = '';	//default selector

let previousValue;	//we need to store the value in order to compare it with next one

if( process.argv.length==4 ){	//overwriting url/selector in case of command line arguments
	url = process.argv[2];
	ccsSelector = process.argv[3];
}

checkValue();	//setInterval will wait the delay before the first call so invoke the function manually for the first time
setInterval(checkValue, delay*1000);	//start invoking the function, *1000 because the delay should be in milliseconds

function checkValue(){
	jsdom.env(	//jsdom will get the page from the provided url and then run the fuction
		url,
		function (err, window) {
			const newValue = window.document.querySelector(ccsSelector).textContent;	//get the element's value
			if( !previousValue ){	//check if this is the first call
				console.log(`The value is ${newValue}`);
				previousValue = newValue;	//update the value
			} else if( previousValue!==newValue ){	//check if the value changed from the last call
				console.log(`Value changed from ${previousValue} to ${newValue}`);
				previousValue = newValue;	//update the value
			}

		}
	);
}
