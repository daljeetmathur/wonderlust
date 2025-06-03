
    mapboxgl.accessToken = map_token;
    console.log(map_token)

    // const map = new mapboxgl.Map({
    //     container: 'map',
    //    
    //     projection: 'globe', // Display the map as a globe, since satellite-v9 defaults to Mercator
    //     zoom: 1,
    //     center: [ 77.1025, 28.7041]
    // });

    mapboxgl.accessToken = map_token;
  const map = new mapboxgl.Map({
      style: 'mapbox://styles/mapbox/streets-v12',
      container: 'map',
      center:  listing.geometry.coordinates  ,
      zoom: 9
  });



      // Create a default Marker and add it to the map.
 const marker = new mapboxgl.Marker({ color: "red" })
    .setLngLat( listing.geometry.coordinates ) // Listing.geometry coordinates
    .setPopup(new mapboxgl.Popup({ offset: 25 })
        .setHTML(
            `<h4>${listing.location}</h4 > <p>Exact Location will be provided after booking!</p>`

        )
    )
    .addTo(map);