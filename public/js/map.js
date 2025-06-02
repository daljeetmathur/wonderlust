
    mapboxgl.accessToken = map_token;
    console.log(map_token)

    // const map = new mapboxgl.Map({
    //     container: 'map',
    //    
    //     projection: 'globe', // Display the map as a globe, since satellite-v9 defaults to Mercator
    //     zoom: 1,
    //     center: [ 77.1025, 28.7041]
    // });

  mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';
  const map = new mapboxgl.Map({
      style: 'mapbox://styles/mapbox/streets-v12',
      container: 'map',
      center: [-74.5, 40],
      zoom: 9
  });