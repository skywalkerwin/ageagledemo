mapboxgl.accessToken = 'pk.eyJ1IjoiYW94a3JpZ2FuIiwiYSI6ImNqdWJtZmxldTBmNDUzeXBiaGZhbnIzcG4ifQ.1QHixzzDq0uRwzqvxUNrvw';
	var map = new mapboxgl.Map({
		container: 'map',
		style: 'mapbox://styles/mapbox/outdoors-v11'
	});

	map.on('click', function (e) {
		document.getElementById("map").addEventListener("click",showWeather);
		function showWeather(){
			var coords = JSON.parse(JSON.stringify(e.lngLat));
			var lat=coords.lat.toString();
			var lon=coords.lng.toString();
			var key = "ac085af24fbf908d878aacfec0a41de7";
			var weatherURL = "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&units=imperial&APPID="+key;
			var weatherParsed = JSON.parse(JSON.stringify(weatherURL));
			console.log(weatherURL);
			fetch(weatherURL)
				.then(response => {
					return response.json()
				})
				.then(data => {
					console.log(data)
					console.log(data.weather)
					var name="";
					if(data.name==name) {name = "N/A";}
					else {name = data.name;}
					var place = " "+name+'     Lon: '+lon+'    Lat: '+lat;
					var temps = " Current Temp: "+data.main.temp+"F"+"    Minimum Temp: "+data.main.temp_min+"F"+"    Maximum Temp: "+data.main.temp_max+"F"+"    Humidity:"+data.main.humidity+"%"+"    Pressure:"+data.main.pressure+" hPa";
					var wind = " Windspeed: "+data.wind.speed+' mph'+'     deg: '+data.wind.deg;
					var weather = " "+data.weather[0].main+'     '+data.weather[0].description;
                    document.getElementById('place').innerHTML = place;
                    document.getElementById('temps').innerHTML = temps;
                    document.getElementById('wind').innerHTML = wind;
                    document.getElementById('weather').innerHTML = weather;
				})
				.catch(err => {
					//error handling...perhaps if my api limits started acting up here...
				})
			}
	});