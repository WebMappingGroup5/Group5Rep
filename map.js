var map = L.map('map').setView([29.8884, -97.9384], 4);
mapLink =
    '<a href="https://openstreetmap.org">OpenStreetMap</a>';
L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; ' + mapLink + ' Contributors',
    maxZoom: 18,
    }).addTo(map);


 function addgreatcircles(map)
 {
 const seattle = turf.point([-122.3, 47.6]);
const dc   = turf.point([-77,38.9]);
const austin  = turf.point([-97.7, 30.3]);

const arc1 = turf.greatCircle(seattle, dc,
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
}
