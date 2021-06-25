let platform = new H.service.Platform({
    apikey: 'G1CPR2H9pwJJT6EJJgUG9tT-IHzcZdSkq6o6zEmijJ4'
});

function landmarkGeocode() {
    let title = document.querySelector('h1').textContent;
    let geocoder = platform.getSearchService(),
        landmarkGeocodingParameters = {
            q: title,
            at: '0,0',
            limit: 1
        };

    geocoder.discover(
        landmarkGeocodingParameters,
        showMap,
        (e) => console.log(e)
    );
}

function showMap(result) {
    let defaultsLayers = platform.createDefaultLayers();
    let locations = result.items;
    //console.log(locations[0]);
    let map = new H.Map(document.querySelector('.map'),
        defaultsLayers.vector.normal.map, {
        zoom: 15,
        center: { lat: 51.500869433181705, lng: - 0.12462540227875277 }
    }
    );

    window.addEventListener('resize', () => map.getViewPort().resize());
    let behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
    let ui = H.ui.UI.createDefault(map, defaultLayers);

}

landmarkGeocode();