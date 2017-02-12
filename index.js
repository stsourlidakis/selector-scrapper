const jsdom = require("jsdom");
const delay = 5;	//seconds
const url = '';
const ccsSelector = '';

let previousValue;

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
