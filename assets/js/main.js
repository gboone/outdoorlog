requirejs.config({
  baseUrl: '/assets/js/lib',
});

require(['jquery-2.2.3', 'underscore', 'leaflet'], function (jQuery, _, leaflet) {
   function markerAnnotation(feature, layer) {
      var properties = feature.properties.activity;
      var msg = "<a href='"+ feature.self.url +"'>" + properties.trail + " in " + properties.park + ", " + properties.state + "</a>";
      layer.bindPopup(msg)
   }
    var activities = $(".activity");
    total_miles = function() {
    var total_miles = 0
    activities.each(function(index) {
      total_miles += $(this).data('dist')
    })
    return total_miles
  }
  function trailAnnotation(feature, layer){
    if ( feature.properties.Hiking_Name ) {
      var message = feature.properties.Hiking_Name + " ESRI: " + feature.properties.ESRI_OID + " Object: " + feature.properties.OBJECTID;
    } else if ( feature.properties.sht_type ) {
      var message = "Superior Hiking Trail at " + feature.geometry.coordinates[0]
    }
    layer.bindPopup(message)
  }
  $("#total-distance").append(total_miles)

  if ( $("#map") ) {
    var Tiles = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.{ext}', {
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.',
        minZoom: 0,
        maxZoom: 20,
        ext: 'png'
      });
    var map = new L.Map('map');
    if ($('#activities').attr("type") == "application/json") {
      var latlng = new L.LatLng(43,-92);
      map.setView(latlng)
      map.setZoom(5)
      map.addLayer(Tiles)
      $.getJSON( $("#activities").attr('src'), function( data ) {
        L.geoJson(data, {
          onEachFeature: markerAnnotation
        }).addTo(map);
      })
      .fail(function( ) {
        console.log("Something is wrong. Check the syntax of the JSON at " + $("#activities").attr("src"));
      })
      $.getJSON( $('#romo').attr('src'), function( data ) {
        L.geoJson(data, {
          stroke: true
        }).addTo(map);
      })
      .fail(function() {
        console.log("Somthing is wrong. Check the syntax of the JSON at " + $('#romo').attr('src'));
      })
      $.getJSON( $('#grsa').attr('src'), function( data ) {
        L.geoJson(data, {
          stroke: true
        }).addTo(map);
      })
      .fail(function() {
        console.log("Somthing is wrong. Check the syntax of the JSON at " + $('#grsa').attr('src'));
      })
      $.getJSON( $('#maroon-snowmass').attr('src'), function( data ) {
        L.geoJson(data, {
          stroke: true
        }).addTo(map);
      })
      .fail(function() {
        console.log("Somthing is wrong. Check the syntax of the JSON at " + $('#maroon-snowmass').attr('src'));
      })
    }
    if ($("#path-data") != [] ) {
      var latlng = new L.LatLng(map._container.dataset.lat, map._container.dataset.lon)
      map.setView(latlng)
      map.setZoom(14)
      map.addLayer(Tiles)
      $.getJSON( $("#path-data").attr('src'), function( data ) {
        L.geoJson(data, {
          onEachFeature: trailAnnotation
        }).addTo(map);
      })
      .fail(function( ) {
        console.log("Something is wrong. Check the syntax of the JSON at " + $("#path-data").attr("src"));
      })
    }
  }
})
