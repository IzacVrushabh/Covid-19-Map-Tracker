mapboxgl.accessToken = 'pk.eyJ1IjoiaXphY3Z1c2hhYmgiLCJhIjoiY2tkNG05d28wMTdoYjJ0bnd0ZHd5amJwaSJ9.dI_YnjplRwT6UQwLpo2O7A';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/dark-v10',
  zoom: 2,
  center: [20, 20]
});

map.on('mousemove', function(e) {
  document.getElementById('info').innerHTML = JSON.stringify(e.point) + '<br />' + JSON.stringify(e.lngLat.wrap());
});

map.addControl(new mapboxgl.NavigationControl());

var size = 200;

var pulsingDot = {
  width: size,
  height: size,
  data: new Uint8Array(size * size * 4),

  // get rendering context for the map canvas when layer is added to the map
  onAdd: function () {
    var canvas = document.createElement('canvas');
    canvas.width = this.width;
    canvas.height = this.height;
    this.context = canvas.getContext('2d');
  },

  // called once before every frame where the icon will be used
  render: function () {
    var duration = 750;
    var t = (performance.now() % duration) / duration;

    var radius = (size / 2) * 0.3;
    var outerRadius = (size / 2) * 0.7 * t + radius;
    var context = this.context;

    // draw outer circle
    context.clearRect(0, 0, this.width, this.height);
    context.beginPath();
    context.arc(
      this.width / 2,
      this.height / 2,
      outerRadius,
      0,
      Math.PI * 2
    );
    context.fillStyle = 'rgba(255, 200, 200,' + (1 - t) + ')';
    context.fill();

    // draw inner circle
    context.beginPath();
    context.arc(
      this.width / 2,
      this.height / 2,
      radius,
      0,
      Math.PI * 2
    );
    context.fillStyle = 'rgba(255, 100, 100, 1)';
    context.strokeStyle = 'white';
    context.lineWidth = 2 + 4 * (1 - t);
    context.fill();
    context.stroke();

    // update this image's data with data from the canvas
    this.data = context.getImageData(
      0,
      0,
      this.width,
      this.height
    ).data;

    // continuously repaint the map, resulting in the smooth animation of the dot
    map.triggerRepaint();

    // return `true` to let the map know that the image was updated
    return true;
  }
};

map.on('load', function () {

  map.setLayoutProperty('country-label', 'text-field', [
    'format',
    ['get', 'name_en'],
    { 'font-scale': 1.2 },
    '\n',
    {},
    ['get', 'name'],
    {
      'font-scale': 0.8,
      'text-font': [
        'literal',
        ['DIN Offc Pro Italic', 'Arial Unicode MS Regular']
      ]
    }
  ]);

  map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });

  map.addSource('points', {
    'type': 'geojson',
    'data': {
      'type': 'FeatureCollection',
      'features': [
        {
          'type': 'Feature',
          'geometry': {
            'type': 'Point',
            //coor[long,lat]
            'coordinates': [77, 20]
          }
        },
        {
          'type': 'Feature',
          'geometry': {
            'type': 'Point',
            //coor[long,lat]
            'coordinates': [105, 35]
          }
        },
        {
          'type': 'Feature',
          'geometry': {
            'type': 'Point',
            //coor[long,lat]
            'coordinates': [-97, 38]
          }
        },
        {
          'type': 'Feature',
          'geometry': {
            'type': 'Point',
            //coor[long,lat]
            'coordinates': [-55, -10]
          }
        },
        {
          'type': 'Feature',
          'geometry': {
            'type': 'Point',
            //coor[long,lat]
            'coordinates': [-2, 54]
          }
        },
        {
          'type': 'Feature',
          'geometry': {
            'type': 'Point',
            //coor[long,lat]
            'coordinates': [-102, 23]
          }
        },
        {
          'type': 'Feature',
          'geometry': {
            'type': 'Point',
            //coor[long,lat]
            'coordinates': [12.8333, 42.8333]
          }
        },
        {
          'type': 'Feature',
          'geometry': {
            'type': 'Point',
            //coor[long,lat]
            'coordinates': [2, 46]
          }
        },
        {
          'type': 'Feature',
          'geometry': {
            'type': 'Point',
            //coor[long,lat]
            'coordinates': [-76, -10]
          }
        },
        {
          'type': 'Feature',
          'geometry': {
            'type': 'Point',
            //coor[long,lat]
            'coordinates': [53, 32]
          }
        },
        {
          'type': 'Feature',
          'geometry': {
            'type': 'Point',
            //coor[long,lat]
            'coordinates': [100, 60]
          }
        }
      ]
    }
  });
  map.addLayer({
    'id': 'points',
    'type': 'symbol',
    'source': 'points',
    'layout': {
      'icon-image': 'pulsing-dot'
    }
  });
});