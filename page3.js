const list = document.getElementById("places");
// const info = document.getElementById("info");
// const plac = document.getElementById("loc");
// const temp = document.getElementById("temp");
// const wind = document.getElementById("wind");
// const time = document.getElementById("time");
// const day = document.getElementById("day");

// Coordinates for each place
let place = [];
place.push(["New York City", 40, -75],["Tokyo", 35, 140],["Berlin", 55, 15],["Rio de Janeiro", -25, -45],["Tromsø", 70, 20],["Cairo", 30, 30]);

var bool = 0;

async function fetchContent(loc,la,lo,i) {
	const json = await fetch('https://api.open-meteo.com/v1/forecast?latitude=' + la + '&longitude=' + lo + '&current_weather=true')
		.then(response => response.json())
		.catch(() => {
			alert(`Page not found`);
			return;
		});
	console.log(json);
	let li = document.getElementById(String(i+1));
	// Clears previous update
	li.innerHTML = "";
	
	li.innerHTML += `<p id="loc">${loc}</p>`;
	li.innerHTML += `<p id="temp">${json.current_weather.temperature + json.current_weather_units.temperature}</p>`;
	li.innerHTML += `<p id="wind">${json.current_weather.windspeed + " " + json.current_weather_units.windspeed} wind</p>`;
	li.innerHTML += `<p id="day">${(json.current_weather.is_day) ? "Daytime" : "Nighttime"}</p>`;
	li.innerHTML += `<br>`;
}

for(let i = 0; i < 6; i++)
	fetchContent(place[i][0],place[i][1],place[i][2],i);
bool = 1;

// Updates every 10 seconds
setInterval(function() {
	for(let i = 0; i < 6; i++) {
		fetchContent(place[i][0],place[i][1],place[i][2],i);
	}
}, 10000);