const jsdom = require("jsdom");
const delay = 5;	//seconds
let url = '';
let ccsSelector = '';

let previousValue;

if( process.argv.length==4 ){
	url = process.argv[2];
	ccsSelector = process.argv[3];
}

checkValue();
setInterval(checkValue, delay*1000);

function checkValue(){
	jsdom.env(
		url,
		function (err, window) {
			const newValue = window.document.querySelector(ccsSelector).textContent;
			if( previousValue!==newValue && previousValue){
				console.log(`Value changed from ${previousValue} to ${newValue}`);
			} else {
				console.log(`The value is ${newValue}`);
			}

			previousValue = newValue;
		}
	);
}
