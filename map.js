var map = L.map('map').setView([29.8884, -97.9384], 14);
mapLink =
    '<a href="http://openstreetmap.org">OpenStreetMap</a>';
L.tileLayer(
    'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; ' + mapLink + ' Contributors',
    maxZoom: 18,
    }).addTo(map);

    var start = turf.point([-122, 48]);
    var end = turf.point([-77, 39]);

    var greatCircle = turf.greatCircle(start, end, {
      properties: { name: "Seattle to DC" },
    }).addTo(map);

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
