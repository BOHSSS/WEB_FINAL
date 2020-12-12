const weather = document.querySelector(".js-weather");



const COORDS = 'coords';
const API_KEY1 = "10adf02d16d6b54d545829708c4a7e84";


function getWeather(lat,lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY1}&units=metric`)
    .then(function(response){
        return response.json()
    }).then(function(json){                         //??잘이해안댐 
        const temp = json.main.temp;
        const place = json.name;
        const wind = json.wind.speed;
        weather.innerText = `${temp}℃ ${place} ${wind}m/s`
    })
}


function saveCoords(coordsObj){  //위도경도 로컬스토리지에 문자열 형태로 저장

    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(latitude,longitude);
    const coordsObj = {
        latitude, // latitude  : latitude,  같은 이름으로 옵젝을 만들고 싶을때 이리하믄댐 
        longitude // longitude : longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude,longitude);
}
function handleGeoError(position){
    console.log("위치 정보를 가져오는데 실패하였습니다.");
}

function askForCoords(){
    //좌표를 요청하는 함수
    navigator.geolocation.getCurrentPosition(handleGeoSucces,handleGeoError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    }else{
        const parseCoords = JSON.parse(loadedCoords);  
        
        //parse(로컬스토리지에서 가져올때 오브젝트화 ) vs stringfy(로컬스토리지에 넣어줄때)
        getWeather(parseCoords.latitude,parseCoords.longitude);
    }
}

function init(){
    loadCoords();
}

init();
