import React from 'react';
import styled from 'styled-components'
import $ from 'jquery';
const Country = styled.input``
const Find = styled.button``
const About = styled.p`
padding-top: 0.6cm;
`
const Flag = styled.img`
width: 100%
`
const Title = styled.h1`
text-align: center;
background-color: white;
`
var countryIntel = ""
function userSelectedCountry() {
  return $("#userC").val()
}
function getCountryIntel() {
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
  $("#ctName").html(info[0].name)
  $("#flag").attr('src', info[0].flag)
  $("#Capital").html("<b>Capital: </b>"+info[0].capital)
  $("#Region").html("<b>Region: </b>"+info[0].region)
  $("#Population").html("<b>Population: </b>"+info[0].population)
  $("#Currency").html("<b>Currency: </b>"+info[0].currencies[0].name)
  $("#Language").html("<b>Language: </b>"+info[0].languages[0].name)
  $("#Timezone").html("<b>Timezone: </b>"+info[0].timezones[0])
  $("#dest").html()

  fetch("https://tripadvisor1.p.rapidapi.com/locations/search?location_id=1&limit=30&sort=relevance&offset=0&lang=en_US&currency=USD&units=km&query="+info[0].name, {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
      "x-rapidapi-key": "bacd86d576msh7e4f10ea742f8b2p10a49cjsn06a2e594a624"
    }
  })
  .then(response => {
    console.log(response);
  })
  .catch(err => {
    console.log(err);
  });


/*
Timezone

*/

}
$(document).load(
  fillCountries()
)

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
                <Title>TravelBot</Title>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-12">
              <div id="search">
                <Country placeholder="where to next?" list="ctrs" id="userC" type="text"></Country>
                <Find onClick={getCountryIntel}>Find</Find>
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
            </About>
          </div>

        </div>
          </div>
        </div>
       </div>
    </div>
  );
}

export default App;
/*



*/