(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()

// scrol btn
// Show button after scrolling down 200px
window.addEventListener('scroll', () => {
  if (window.scrollY > 200) {
    scrollTopBtn.style.display = 'flex';
  } else {
    scrollTopBtn.style.display = 'none';
  }
});
// Smooth scroll to top on button click
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// loader

window.addEventListener('load', function () {
  // Add delay of 3 seconds before fading out loader
  setTimeout(function () {
    document.body.classList.add('loaded');
  }, 400);
});



// mapbox

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
      center: [-74.5, 40],
      zoom: 9
  });