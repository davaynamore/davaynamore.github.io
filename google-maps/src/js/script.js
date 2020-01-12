const navForm = document.getElementById('navigator');
const addressFrom = document.getElementById('addressFrom');
const addressTo = document.getElementById('addressTo');
const drivingMode = document.getElementById('drivingMode');
let map;
let directionsService;
let directionsDisplay;
const markersArray = [];

navForm.addEventListener('submit', (e) => {
	e.preventDefault();
	clearOverlays();
	const start = addressFrom.value;
	const end = addressTo.value;
	const mode = drivingMode.value;
	start && end ? calcRoute(start, end, mode) : start ? findPoint(start) :  end ? findPoint(end) : alert('Enter address');
});

function initMap() {
	directionsService = new google.maps.DirectionsService();
	directionsDisplay = new google.maps.DirectionsRenderer();
	const krem = {lat: 49.062785, lng: 33.4156805};
	map = new google.maps.Map(document.getElementById('map'), {zoom: 7, center: krem});
	directionsDisplay.setMap(map);
}

function findPoint(address) {
	const geocoder = new google.maps.Geocoder();
	const infowindow = new google.maps.InfoWindow;
	geocoder.geocode( { 'address': address}, function(results, status) {
		if (status == 'OK') {
			map.zoom = 12;
			map.setCenter(results[0].geometry.location);
			const marker = addMarker(results[0].geometry.location);
			infowindow.setContent(results[0].formatted_address);
			infowindow.open(map, marker);
		} else {
			console.log('Geocode was not successful for the following reason: ' + status);
		}
	});
}

function calcRoute(start, end, drivingMode) {
	directionsDisplay.setMap(map);
	var request = {
		origin: start,
		destination: end,
		travelMode: drivingMode
	};
	directionsService.route(request, function(result, status) {
		directionsDisplay.setOptions( { suppressMarkers: true } ); // remove default markers
		if (status == 'OK') {
			directionsDisplay.setDirections(result);
			//add custom markers
			var leg = result.routes[ 0 ].legs[ 0 ];
			addMarker( leg.start_location);
			addMarker( leg.end_location);
		}
	});
}

function addMarker(location) {
	const icon = '../img/marker.png'; // custom marker
	const marker = new google.maps.Marker({
		position: location,
		icon: icon,
		map: map,
		className: 'marker'
	});
	markersArray.push(marker);
	return marker;
}

// Removes the overlays from the map, but keeps them in the array
function clearOverlays() {
	directionsDisplay.setMap(null);
	if (markersArray) {
		for (let i in markersArray) {
			markersArray[i].setMap(null);
		}
	}
}

// Shows any overlays currently in the array
function showOverlays() {
	if (markersArray) {
		for (let i in markersArray) {
			markersArray[i].setMap(map);
		}
	}
}

// Deletes all markers in the array by removing references to them
function deleteOverlays() {
	if (markersArray) {
		for (let i in markersArray) {
			markersArray[i].setMap(null);
		}
		markersArray.length = 0;
	}
}