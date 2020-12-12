const form = document.querySelector(".js-form");
const input = form.querySelector("input");
const grettings = document.querySelector(".js-grettings");

const USER_LS = "currentUser";
const SHOWING_CN = "showing";

let good = ""
function getgood(){
    const date = new Date();   
    const hours = date.getHours();  
    if(hours>=8 && hours<17){   
         good = `good afternoon`
    }else if(hours>=6 && hours<8){
         good = `good morning`
    }else if(hours>=17 && hours<19){
         good = `good evening`
    }else{
         good = `good night`
    }
    return good;
}
function saveName(text){
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event){
    event.preventDefault(); 
    const currentValue = input.value;  
    paintGretting(currentValue);
    saveName(currentValue);
}

function askForName(){
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit",handleSubmit); 
  
}

function paintGretting(text){  
    form.classList.remove(SHOWING_CN);
    grettings.classList.add(SHOWING_CN);
    getgood();
    grettings.innerText = `${good} ${text}!`;
}


function loadName(){
   const currentUser = localStorage.getItem(USER_LS); 
   if(currentUser === null){
    askForName();
   }else{
    paintGretting(currentUser)
   }
}

function init(){
    loadName();
}

init();