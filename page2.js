const title1 = document.getElementById("title1");
const title2 = document.getElementById("title2");
const title3 = document.getElementById("title3");
const body1 = document.getElementById("body1");
const body2 = document.getElementById("body2");
const body3 = document.getElementById("body3");
let title = [];
title.push(title1, title2, title3);
let body = [];
body.push(body1, body2, body3);

let nr = 3;

async function fetchContent(nr) {
	const json = await fetch('https://jsonplaceholder.typicode.com/posts')
		.then(response => response.json())
		.catch(() => {
			alert(`Page not found`);
			return;
		});
	// console.log(json[nr]);
	if (json === undefined) return;
	
	title[nr-3].textContent = json[nr].title;
	title[nr-3].style.color = "black";
	body[nr-3].textContent = json[nr].body;
	body[nr-3].style.color = "black";
}

// Checks if screen is already showing bottom when loading page
for(let i = 0; i < 3; i++) {
	if ((window.innerHeight + Math.round(window.scrollY-15)) >= document.body.offsetHeight) {
		if(nr <= 5) {
			fetchContent(nr);
		}
		console.log('bottom of page');
		nr++;
	}
}
// When scrolling, checks if bottom is reached
window.onscroll = function (ev) {
    if ((window.innerHeight + Math.round(window.scrollY-15)) >= document.body.offsetHeight) {
		if(nr <= 5) {
			fetchContent(nr);
		}
        console.log('bottom of page');
		// Goes trough each post
		nr++;
    }
};