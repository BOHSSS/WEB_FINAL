const item = document.querySelector("#item");
const clicked_class = "clicked";

function handleClick(){
    const currentClass = item.className;
    if(currentClass !==clicked_class){
        item.classList.add(clicked_class);
    }else{
        item.classList.remove(clicked_class);
    };
}
function init(){
    item.addEventListener("click",handleClick);
}
init();


