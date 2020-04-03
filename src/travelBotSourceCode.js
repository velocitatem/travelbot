import React from 'react';
import styled from 'styled-components'
import $ from 'jquery';
const Country = styled.input``
const Find = styled.button``
const Tours = styled.div``
const Walks = styled.div``
const Footer = styled.p`
position: relative;
bottom: 0; 
background-color:white;
`
const About = styled.p`
padding-top: 0.6cm;
`
const Flag = styled.img`
width: 100%
`
const ABC = styled.div``
const Title = styled.h1`
text-align: center;
background-color: white;
`
var countryIntel = ""
function userSelectedCountry() {
  return $("#userC").val()
}
function getCountryIntel() {
  $("#abt").hide()
  console.log(userSelectedCountry())
  fetch("https://restcountries.eu/rest/v2/name/"+userSelectedCountry()+"?fullText=true")
.then((response) => {
    return response.json();
})
.then((data) => {
    console.log(data)
    showData(data)
})
.catch(err => {
    console.log(err);
})
}
function showData(info) {
  console.log(info[0])
  report(info)
  $("#ctName").html(info[0].name)
  $("#flag").attr('src', info[0].flag)
  $("#flag").attr('style', "border: solid;")
  $("#Capital").html("<b>Capital: </b>"+info[0].capital)
  $("#Region").html("<b>Region: </b>"+info[0].region)
  $("#Population").html("<b>Population: </b>"+info[0].population)
  $("#Currency").html("<b>Currency: </b>"+info[0].currencies[0].name)
  $("#Language").html("<b>Language: </b>"+info[0].languages[0].name)
  $("#Timezone").html("<b>Timezone: </b>"+info[0].timezones[0])
  $("#dest").html()

  tourGuide(info[0].alpha2Code, info[0].capital)


/*
Timezone

*/

}
$(document).load(
  fillCountries()
)
var token = "&account=8Y2YRTV6&token=30yhgebkre1hisqd696bhfquhxpifv5u"
function tourGuide(countryCD, countryCP) {
  $("#aboutCity").show()
  $("#tours").show()
  $("#walks").show()
  //https://www.triposo.com/api/20190906/location.json?id=Amsterdam&fields=all
  //https://www.triposo.com/api/20190906/location.json?tag_labels=city&annotate=trigram:Paris&trigram=>=0.3&count=10&fields=id,name,score,country_id,parent_id,snippet&order_by=-trigram
  //https://www.triposo.com/api/20190906/location.json?countrycode=FR&tag_labels=city&count=10&fields=id,name,score,snippet&order_by=-score
  
  fetch("https://www.triposo.com/api/20190906/location.json?countrycode="+countryCD+"&tag_labels=city&count=10&fields=id,name,score,snippet&order_by=-score"+token, {
    "method": "GET"
  })
.then((response) => {
    return response.json();
})
.then((data) => {
    console.log(data)
    var script = "<hr><h2>Top 10 Cities To Visit</h2>"
    $("#aboutCity").html(script)
    var t
    for (t=0;t<10;t++) {
      $("#aboutCity").append( "<h5>#"+" "+ data.results[t].name + " </h5>")
      $("#aboutCity").append( "" + data.results[t].snippet +"<br>")
      //https://www.triposo.com/api/20190906/tour.json?location_ids=Rio_de_Janeiro&count=10&fields=id,name,score,price,price_is_per_person,vendor,intro,tag_labels&order_by=-score

    }
    
    fetch("https://www.triposo.com/api/20190906/city_walk.json?location_id="+countryCP+"&go_inside=false&total_time=300&tag_labels=!eatingout"+token)
.then((response) => {
  return response.json();
})
.then((data) => {
  console.log(data)
  var script = `<hr><h2>Best Walk in `+countryCP+`</h2>
  <b>Length: </b> `+Math.round((data.results[0].walk_distance)/1000)+` km <br>
  <b>Duration: </b> `+Math.round((data.results[0].walk_duration)/60)+` h <br>
  `
  $("#walks").html(script)
  var t
  var waypoints = data.results[0].way_points
  for (t=0;t<waypoints.length;t++) {
    var point = `
    <div class='row'>
      <div class='col-sm-6'>
        <h5># `+waypoints[t].poi.name + `</h5>` + waypoints[t].poi.snippet +`
      </div>
      <div class='col-sm-6'>
        <img class='wayP' src='`+waypoints[t].poi.images[0].sizes.medium.url+`'></img>
      </div>
    </div>`
    $("#walks").append(point)
  }
})
.catch(err => {
  console.log(err);
  $("#walks").hide()
})

    fetch("https://www.triposo.com/api/20190906/tour.json?location_ids="+countryCP+"&count=5&fields=id,name,score,price,price_is_per_person,vendor,intro,tag_labels&order_by=-score"+token)
    .then((response) => {
      return response.json();
   })
  .then((data) => {
      console.log(data)
      if (data.more===false) {
        $("#tours").hide()
      } 
      else {
        var script = "<hr><h2>Top 5 Tours in "+countryCP+"</h2>"
        $("#tours").html(script)
        var t
        for (t=0;t<5;t++) {
          $("#tours").append( "<h5>#"+" "+ data.results[t].name + " </h5>")
          $("#tours").append( "" + data.results[t].intro +"<br>")
          $("#tours").append( "<u>Price/person: " + data.results[t].price.amount + data.results[t].price.currency +"</u><br>")
        }
      }
  })
  .catch(err => {
      console.log(err);      
  })


})
.catch(err => {
    console.log(err);
    $("#aboutCity").hide()
    $("#tours").hide()
    $("#walks").hide()


    
})
}



function report(body) {
  const headers = new Headers()
  headers.append("Content-Type", "application/json")
  const options = {
    method: "POST",
    headers,
    mode: "cors",
    body: JSON.stringify(body),
  }
  
  fetch("https://enmlfbmjyaluo.x.pipedream.net/", options)
}

function fillCountries() {
  var countryList = []
  fetch("https://restcountries.eu/rest/v2/all")
  .then((response) => {
      return response.json();
  })
  .then((data) => {
      console.log(data)
      var c
      for(c=0;c<data.length;c++) {
        $("#ctrs").append("<option value='"+data[c].name+"'>")
      }
  })
  .catch(err => {
      console.log(err);
  })

}

function loadCT() {
  console.log($("#country"))
}
$(document).load(function(){
  
})

function App() {
  return (
    <div id="WebApp">
       <div class="container">
        <div id="WebAppC" class="row">
          <div class="col-lg-12">
          <div id="pageCont" class="container">
          <div class="wrapper">
            <div class="row">
              <div class="col-sm-12">
                <Title>TravelBot ✈</Title>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-12">
              <div id="search">                      
                  <Country placeholder="where to?" list="ctrs" name="country" id="userC" type="text"></Country>
                  <Find onClick={getCountryIntel}>Find</Find>
                <div id="abt">
                  <p>
                    <br></br>
                    <br></br>
                    Welcome, if you are new to this service, it's very easy to start. enter a desired country into the text feild above and get any and all vital information for your travels 😃 
                  </p>
                </div>
              </div>        
              <datalist id="ctrs"></datalist>
              </div>
            </div>
            <About>
              <div class="row">
                <div class="col-sm-4">
                  <h2 id="ctName"></h2>
                  <Flag id="flag"></Flag>
                 
                </div>
                <div class="col-sm-8">
                <p id="about">
                    <table>
                      <tr><td id="Capital"></td></tr>
                      <tr><td id="Region"></td></tr>
                      <tr><td id="Population"></td></tr>
                      <tr><td id="Currency"></td></tr>
                      <tr><td id="Language"></td></tr>
                      <tr><td id="Timezone"></td></tr>
                    </table>
                  </p>
                </div>
              </div>
                <div>
                <div class="row">
                  <div class="col-sm-12">
                    <ABC id="aboutCity">
                    </ABC>
                    <Tours id="tours">                      
                    </Tours>
                    <Walks id="walks">                      
                    </Walks>
                    <div class="walksPic">
                    </div>
                  </div>
                </div>
                </div>
            </About>
          </div>

        </div>
          </div>
        </div>
       </div>
       <footer>
         <Footer>
            <div class="container">
              <div class="row">
                <div class="col-sm-12">
                  
                </div>
              </div>
            </div>
         </Footer>
       </footer>
    </div>
  );
}

export default App;
/*
<p>
                    <b>Page Author:</b> Daniel Rosel <br></br>
                    <b>API Used:</b> <a href="https://www.triposo.com/api/">tours</a>, <a href="http://restcountries.eu/">countries</a>
                  </p>


*/