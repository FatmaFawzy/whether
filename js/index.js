// get API
async function getWether(country){
    let response=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${country}&days=3`);
    let finalResult=await response.json();
    display(finalResult);
    anotherDay(finalResult);
    // console.log(Object.keys(finalResult).length)
}
// search
let value='cairo';
let search=document.getElementById('search');
search.addEventListener("keyup",function(country){
    value= country.target.value;
    getWether(value);
})
search.addEventListener('focus',function(e){
  e.target.style.backgroundColor="#1e202b";
  e.target.style.borderColor="##1e202b";
  e.target.style.boxShadow=" 0px 0px 0px 0px rgb(0 0 0)";
  e.target.style.color="white";
})
// All inputs
let days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
let months=["January","February","March","April","May","June","July","August","September","October","November","December"];
let city='newyork'

// current wether
function display(finalResult){
    let date=new Date();
    let cartoona=`       <div class="date d-flex justify-content-between">
    <h2>${days[date.getDay()]}</h2>
    <h2>${date.getDate()+months[date.getMonth()]}</h2>
</div>
<div class="city">
<div class="location">${finalResult.location.name}</div>
<div class="degree ">${finalResult.current.temp_c}<sup>o</sup>C
<span class="ms-md-5 start-img"><img src="${finalResult.current.condition.icon}" alt=""></span>
</div>
<div class="custom">${finalResult.current.condition.text}</div>
<span>
<img src="imges/icon-umberella.png" alt="">
${finalResult.current.wind_mph}%
</span>
<span>
<img src="imges/icon-wind.png" alt="">
${finalResult.current.wind_degree}km/h
</span>
<span>
<img src="imges/icon-compass.png" alt="">
${finalResult.current.wind_dir}
</span>
</div>`
document.getElementById('fscard').innerHTML=cartoona;
}

// Next days wether
function anotherDay(finalResult){
    for(let i=1;i<=2;i++){
        const today = new Date()
        const tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + i)
        let cartoona=`<div class="date d-flex justify-content-between card text-center">
        <h2>${days[tomorrow.getDay()]}</h2>
    </div>
    <div class="city">
<div class="whter-icn mt-3"><img src="${finalResult.forecast.forecastday[i].day.condition.icon}" alt=""></div>
<div class="degree-sec mt-2">${finalResult.forecast.forecastday[i].day.maxtemp_c}<sup>o</sup>C</div>
<div class="small">${finalResult.forecast.forecastday[i].day.mintemp_c}</div>
<div class="custom">${finalResult.forecast.forecastday[i].day.condition.text}</div>
</div>`
      document.querySelector(`#scCard${i}`).innerHTML=cartoona;
    }

  console.log(finalResult.forecast.forecastday[1].day.condition.text);
}
// call fetch
getWether(value);
