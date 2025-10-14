var map = L.map('map').setView([29.8884, -97.9384], 14);
mapLink =
    '<a href="http://openstreetmap.org">OpenStreetMap</a>';
L.tileLayer(
    'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; ' + mapLink + ' Contributors',
    maxZoom: 18,
    }).addTo(map);

    var point1 = turf.point([29.8868, -97.9367]);
    var point2 = turf.point([29.887379, -97.933741]);

    var bearing = turf.bearing(point1, point2);
    var bearing360 = (bearing + 360) % 360;
