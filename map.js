var map = L.map('map').setView([29.8884, -97.9384], 14);
mapLink =
    '<a href="https://openstreetmap.org">OpenStreetMap</a>';
L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; ' + mapLink + ' Contributors',
    maxZoom: 18,
    }).addTo(map);
// Bolton function

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


// Ali function
    var start = turf.point([-122, 48]);
    var end = turf.point([-77, 39]);

    var greatCircle = turf.greatCircle(start, end, {
      properties: { name: "Seattle to DC" },
    });
    L.geoJSON(greatCircle,{style:{color:'blue', weight:2}}).addTo(map);

//Ali function

    var polygon = turf.polygon([
      [
        [-97.954286, 29.892131],
        [-97.949964, 29.889847],
        [-97.944117, 29.891912],
        [-97.937678, 29.891557],
        [-97.931851, 29.889347],
        [-97.932126, 29.886893],
        [-97.936864, 29.886005],
        [-97.938351, 29.886978],
        [-97.951209, 29.885463],
        [-97.954286, 29.892131],
      ],
    ]);

    var area = turf.area(polygon);
  L.geoJSON(polygon).addTo(map);

  var pointsCollection = turf.points([
    [-97.942129, 29.887412],
    [-97.934683, 29.888101],
    [-97.941099, 29.891235],
    [-97.947461, 29.890166]
  ])
  L.geoJson(pointsCollection).addTo(map);
  var center = turf.center(pointsCollection);

  L.geoJSON(center).addTo(map);


// Todd's Function

const seattle = turf.point([-122.3, 47.6]);
const philly   = turf.point([-75,39.9]);
const austin  = turf.point([-97.7, 30.3]);

const arc1 = turf.greatCircle(seattle, philly,
 {npoints:20, properties: {name: 'seattle to DC'}});
const arc2 = turf.greatCircle(seattle, austin,
 {npoints:20, properties: {name: 'seattle to Austin'}});

const lineLayer= L.geoJSON(arc1, {style: {color: 'red', weight: 3}}).addTo(map);
const lineLayer2= L.geoJSON(arc2, {style: {color: 'red', weight: 3}}).addTo(map);

const arc1distancekm = turf.length(arc1, { units: 'kilometers'});
const arc2distancekm = turf.length(arc2, { units: 'kilometers'});

console.log(`Arc length: ${arc1distancekm.toFixed(2)} km`);
console.log(`Arc length: ${arc2distancekm.toFixed(2)} km`);

const midpoint1 = turf.along(arc1, arc1distancekm / 2, {units: 'kilometers'});
const midpoint2 = turf.along(arc2, arc2distancekm / 2, {units: 'kilometers'});

L.marker([midpoint1.geometry.coordinates[1], midpoint1.geometry.coordinates[0]], { interactive: false })
       .addTo(map)
 .bindTooltip(`Distance: ${arc1distancekm.toFixed(1)} km`, {
   permanent: true,
   direction: 'bottom',
   offset: [0, 20],
 })
 .openTooltip();
L.marker([midpoint2.geometry.coordinates[1], midpoint2.geometry.coordinates[0]], {interactive: false})
     .addTo(map)
 .bindTooltip(`Distance: ${arc2distancekm.toFixed(1)} km`,
               {permanent:true,
               direction:'right',
   }).openTooltip();


 L.marker([seattle.geometry.coordinates[1],seattle.geometry.coordinates[0]])
     .addTo(map)
     .bindTooltip('Seattle, WA',{permanent: true, direction: 'right'});

 L.marker([dc.geometry.coordinates[1],dc.geometry.coordinates[0]])
     .addTo(map)
     .bindTooltip('Washington DC',{permanent: true, direction: 'left'});

 L.marker([austin.geometry.coordinates[1],austin.geometry.coordinates[0]])
     .addTo(map)
     .bindTooltip('Austin TX',{permanent: true, direction: 'top'});
