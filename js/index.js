var API_KEY = "d1a21bccdabbdd9bf5fad7bc2ec65561";
var cel = false;
var wd;
var mesto = document.getElementsByTagName('input')["location"];
var tlacitko = document.getElementsByTagName('button')["city"];
var latt;
var longt;


function displayTemp(fTemp, c){
  if(c) return Math.round((fTemp - 32) * (5/9)) + " C";
  return Math.round(fTemp) + " F";
}


$("#btn").click(function(){
            var geocoder =  new google.maps.Geocoder();
    geocoder.geocode( { 'address': 'miami, us'}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            alert("location : " + results[0].geometry.location.lat() + " " +results[0].geometry.location.lng());

          } else {
            alert("Something got wrong " + status);
          }
        });
});

tlacitko.onclick = function (e) {
  console.log(mesto.value);
/*

  console.log('http://api.openweathermap.org/data/2.5/weather?units=imperial&lat='
            + "fdsf" + '&lon=' + "test" +'&APPID=');
*/

var geocoder =  new google.maps.Geocoder();
geocoder.geocode( { 'address': mesto.value}, function(results, status) {
if (status == google.maps.GeocoderStatus.OK) {
console.log("location : " + results[0].geometry.location.lat() + " " +results[0].geometry.location.lng());
latt = results[0].geometry.location.lat();
longt = results[0].geometry.location.lng();
console.log(longt);



$.getJSON('http://api.openweathermap.org/data/2.5/weather?units=imperial&lat='
          + latt + '&lon=' + longt +'&APPID=' + API_KEY
          , function(apiData){
  wd = apiData;
  console.log(wd);
  render(apiData, cel);

  $('#toggle').click(function(){
    cel = !cel;
    render(wd, cel);
  })
})






} else {
console.log("Something got wrong " + status);
}
});




}

//console.log(tlacitko);

function nacti(){

  //console.log();

}

function render(wd, cel){
      var currentLocation = wd.name;
      var currentWeather = wd.weather[0].description;
      var currentTemp = displayTemp(wd.main.temp, cel);
      var high = displayTemp(wd.main.temp_max, cel);
      var low = displayTemp(wd.main.temp_min, cel);
      var icon = wd.weather[0].icon;

      $('#currentLocation').html(currentLocation);
      $('#currentTemp').html(currentTemp);
      $('#currentWeather').html(currentWeather);
      $('#high-low').html(high + " / " + low);

      var iconSrc = "http://openweathermap.org/img/w/" + icon + ".png";
      $('#currentTemp').prepend('<img src="' + iconSrc + '">');
}

$(function(){

  var loc;
  $.getJSON('http://ipinfo.io', function(d){
    //console.log("assigning the data...")
    loc = d.loc.split(",");
    console.log(loc);

    $.getJSON('http://api.openweathermap.org/data/2.5/weather?units=imperial&lat='
              + loc[0] + '&lon=' + loc[1] +'&APPID=' + API_KEY, function(apiData){
      wd = apiData;
      console.log(wd);
      render(apiData, cel);

      $('#toggle').click(function(){
        cel = !cel;
        render(wd, cel);
      })
    })

  })

})
