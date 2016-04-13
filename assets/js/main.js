requirejs.config({
  baseUrl: '/assets/js/lib',
});

require(['jquery-2.2.3', 'underscore'], function (jQuery, _) {
  var activities = $(".activity");
  total_miles = function() {
    var total_miles = 0
    activities.each(function(index) {
      total_miles += $(this).data('dist')
    })
    return total_miles
  }
  $("#total-distance").append(total_miles)
})


// if (document.getElementById('activities') != null) {
//   var activities = JSON.parse(document.getElementById('activities').innerHTML);
//   document.getElementById('total-distance').innerHTML += total_miles(activities)
// }
// if (document.getElementById('parks')) {
//   var parks = jsonFromURI(document.getElementById('parks').baseURI)
//   debugger;
//   parks = dedupeJSON(parks)
// }
