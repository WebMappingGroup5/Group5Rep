var map = L.map('map').setView([29.8884, -97.9384], 14);
mapLink =
    '<a href="http://openstreetmap.org">OpenStreetMap</a>';
L.tileLayer(
    'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; ' + mapLink + ' Contributors',
    maxZoom: 18,
    }).addTo(map);

    var polygon = turf.polygon([
      [
        [125, -15],
        [113, -22],
        [154, -27],
        [144, -15],
        [125, -15],
      ],
    ]);
    L.geoJSON(polygon,{
  style: {
      color: "red",
      weight: 1
      fillColor: "pink",
      fillOpacity: 0.25,
      }
    }).addTo(map);
