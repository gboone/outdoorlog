console.log('It works!')
total_miles = function(object) {
  var total_miles = 0
  for (var i in object) {
    if (activities.hasOwnProperty(i)) {
      total_miles += Math.floor(object[i].distance)
    }
  }
  return total_miles
}
var activities = JSON.parse(document.getElementById('activities').innerHTML);
document.getElementById('total-distance').innerHTML += total_miles(activities)
