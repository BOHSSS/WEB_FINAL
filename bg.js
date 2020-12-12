const body = document.querySelector("body");

const IMG_NUMBER = 3;


function paintImage(imgNumber){
    const image = new Image();
    image.src = `./image/${imgNumber}.jpg`;
    image.classList.add("bgimage");
    body.appendChild(image);
}

function genRandom(){
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;
}

function getTime(){
    const date = new Date();   
    const hours = date.getHours();  
    
    if(hours>=8 && hours<17){
        return 1;
    }else if(hours>=6 && hours<8){
        return 2;
    }else if(hours>=17 && hours<19){
        return 2;
    }else{
        return 3;
    }
    //낮이면 즉 8~17시 =1
    //새벽 or 석양 6~8시 or 17~19시
    //밤 즉 17~23?4 까지 00~6시
    
}

function init(){
    //const randomNumber = genRandom();
    const timeNumber = getTime();
    paintImage(timeNumber);
}

init();