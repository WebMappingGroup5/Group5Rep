var map = L.map('map').setView([29.8884, -97.9384], 14);
mapLink =
    '<a href="http://openstreetmap.org">OpenStreetMap</a>';
L.tileLayer(
    'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; ' + mapLink + ' Contributors',
    maxZoom: 18,
    }).addTo(map);

        // establish variables
let activeMarker1 = null;
let activeMarker2 = null;
let activeLine = null;
let point1 = null;
let point2 = null;
let activeLinePopupMarker = null;
        // Left click
map.on('click', function (e) {
          // Lat/Long Value of point clicked
          const lat = e.latlng.lat;
          const lng = e.latlng.lng;
          point1 = turf.point([lng, lat]);
            if (activeMarker1) {
              activeMarker1.remove();
            }
          // Add a new marker at the clicked location
            activeMarker1 = L.marker([lat, lng]).addTo(map)
              drawLine();
});
// Right click
map.on('contextmenu', function (e) {
          const lat2 = e.latlng.lat;
          const lng2 = e.latlng.lng;
          point2 = turf.point([lng2, lat2]);
            if (activeMarker2) {
                activeMarker2.remove();
                }

    // Add a new marker at the clicked location
            activeMarker2 = L.marker([lat2, lng2])
              .addTo(map)

              drawLine();
        });


function drawLine() {
    // Only draw if both markers exist
    if (activeMarker1 && activeMarker2) {
      // Remove previous line if exists
        if (activeLine) {
          activeLine.remove();
        }
        if (activeLinePopupMarker) activeLinePopupMarker.remove(); // remove previous midpoint marker
        const latlngs = [
            activeMarker1.getLatLng(),
            activeMarker2.getLatLng()
        ];
        activeLine = L.polyline(latlngs, { color: 'red', weight: 3 }).addTo(map);


       const distance = turf.distance(point1, point2, { units: "miles" });

       const midLat = (latlngs[0].lat + latlngs[1].lat) / 2;
       const midLng = (latlngs[0].lng + latlngs[1].lng) / 2;

       activeLinePopupMarker = L.marker([midLat, midLng], { opacity: 0 }) // invisible marker
                                 .addTo(map)
                                 .bindPopup(`Distance: ${distance.toFixed(2)} miles`)
                                 .openPopup();
    };
  }
