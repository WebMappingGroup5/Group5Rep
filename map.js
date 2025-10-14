var map = L.map('map').setView([29.8884, -97.9384], 14);
mapLink =
    '<a href="http://openstreetmap.org">OpenStreetMap</a>';
L.tileLayer(
    'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; ' + mapLink + ' Contributors',
    maxZoom: 18,
    }).addTo(map);


        let activeMarker1 = null;
        map.on('click', function (e) {
          const lat = e.latlng.lat;
          const lng = e.latlng.lng;


          const point = turf.point([lng, lat]);


            if (activeMarker1) {
                activeMarker1.remove();
                }

    // Add a new marker at the clicked location
            activeMarker1 = L.marker([lat, lng])
              .addTo(map)

        });



        let activeMarker2 = null;
        map.on('contextmenu', function (e) {
          const lat2 = e.latlng.lat;
          const lng2 = e.latlng.lng;


          const point2 = turf.point([lng2, lat2]);

            if (activeMarker2) {
                activeMarker2.remove();
                }

    // Add a new marker at the clicked location
            activeMarker2 = L.marker([lat2, lng2])
              .addTo(map)


        });
        var options = { units: "miles" };

        var distance = turf.distance(activeMarker1, activeMarker2, options);
