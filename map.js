var map = L.map('map').setView([29.8884, -97.9384], 14);
mapLink =
    '<a href="http://openstreetmap.org">OpenStreetMap</a>';
L.tileLayer(
    'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; ' + mapLink + ' Contributors',
    maxZoom: 18,
    }).addTo(map);

    var pointsCollection = turf.points([
      [-97.942129, 29.887412],
      [-97.934683, 29.888101],
      [-97.941099, 29.891235],
      [-97.947461, 29.890166]
    ])
    L.geoJson(pointsCollection).addTo(map);
    var center = turf.center(pointsCollection);

    L.geoJSON(center).addTo(map);
