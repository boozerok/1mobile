function initialize() {
	var latlng = new google.maps.LatLng(45.612927, 9.280941);
	var myOptions = {
		zoom: 18,
		center: latlng,
		mapTypeId: google.maps.MapTypeId.SATELLITE
	};
	var map = new google.maps.Map(document.getElementById('p-map'),
		myOptions);
}