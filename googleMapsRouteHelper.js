/*
Add this function to main.js to activate distance calculating and plotting on a map
Note: don't forget to insert <script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"></script> before main.js

Available attributes:
	data-attribute			Location
	================================
	data-map *				Add this to the div which contains the map, this div should have a unique id
	data-lat				Add latitude of known position
	data-lng				Add longitude of known position
	data-map-type			Set map Type ROADMAP | SATELLITE | HYBRID | TERRAIN
	data-map-zoom			Set zoomlevel
	data-stroke-color		Set color of route overlay
	data-stroke-weight		Set weight of route overlay
	data-calc *				The submit button which should trigger the calculation
	data-input *			The input field which contains the address entered by the visitor

	* = required
*/

var googleMapsRouteHelper = (function($){
	var map, directionDisplay, directionsService, dataLat, dataLng;

	function init(input) {
		dataMap = $('[data-map]');
		dataCalc = $('[data-calc]');
		dataInput = $('[data-input]');
		dataLat = (dataMap.data('lat') == undefined) ? 52.379189 : dataMap.data('lat');
		dataLng = (dataMap.data('lng') == undefined) ? 4.899431 : dataMap.data('lng');
		datamapType = (dataMap.data('map-type') == undefined) ? 'TERRAIN' : dataMap.data('map-type');
		datamapZoom = (dataMap.data('map-zoom') == undefined) ? 15 : dataMap.data('map-zoom');
		datastrokeColor = (dataMap.data('stroke-color') == undefined) ? "#cccccc" : dataMap.data('stroke-color');
		datastrokeWeight = (dataMap.data('stroke-weight') == undefined) ? 5 : dataMap.data('stroke-weight');

    	directionsService = new google.maps.DirectionsService();
        directionsDisplay = new google.maps.DirectionsRenderer({
        	polylineOptions: {
		    	strokeColor: datastrokeColor,
		    	strokeWeight: datastrokeWeight,
		    	suppressMarkers: true
		    }
        });

        var mapOptions = {
            center: new google.maps.LatLng(51.937511, dataLng),
			zoom: datamapZoom,
			mapTypeId: google.maps.MapTypeId.datamapType
        };

        map = new google.maps.Map(document.getElementById(dataMap.attr('id')), mapOptions);
        directionsDisplay.setMap(map);
        setMarker(map);

       	dataCalc.on('click', function(e){
       		e.preventDefault();
       		getLatLong(dataInput.val());
       	});

        google.maps.event.addListener(directionsDisplay, 'directions_changed', function() {
		    computeTotalDistance(directionsDisplay.directions);
		});
    }

    function getLatLong(address){
		var geo = new google.maps.Geocoder;

		geo.geocode({'address':address},function(results, status){
			if (status == google.maps.GeocoderStatus.OK) {
				res = results[0].geometry.location;
			}
			if(res != undefined){
				calcRoute(res.k, res.B);
			}else{
				setMarker(map);
			}
		});
	}

    function setMarker(map){

	    var myLatLng = new google.maps.LatLng(dataLat, dataLng);
	    var marker = new google.maps.Marker({
	      position: myLatLng,
	      map: map
	    });
        return true;
    }

	function calcRoute(lat, lng) {
		var start = lat + "," + lng;
		var end = dataLat +","+ dataLng;
		var request = {
		    origin:start,
		    destination:end,
		    travelMode: google.maps.DirectionsTravelMode.DRIVING
		};
		directionsService.route(request, function(response, status) {
			if (status == google.maps.DirectionsStatus.OK) {
				directionsDisplay.setDirections(response);
			}
		});
	}

	function computeTotalDistance(result) {
		var route = result.routes[0],
			total = route.legs[0].distance.text;
			time =route.legs[0].duration.text;
		$('[data-map-route]').remove();
		dataMap.after($('<div data-map-route><span class="distance">'+total+'</span><span class="time">'+time+'</span></div>'));
	}
	
	$(document).on('ready', init);
}(jQuery));