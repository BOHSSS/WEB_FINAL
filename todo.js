const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");

const TODO_LIST = "toDo";
let toDo = [];


function filterFn(toDo){
    return toDo.id === 1;
}

function deleteToDo(event){
    const btn = event.target;  //이벤트 발생하는 타겟
    const li  = btn.parentNode; //그버튼의 부모 즉=li 지정
    toDoList.removeChild(li); //실제 삭제한다 li에서 이러면 화면에 보여지는건 사라진것
    const cleanToDos = toDo.filter(function(toDo){  
    //id값이 같지 않은 애들만 리턴을해서 cleanToDo 에 넣어준다 
    //예를들어 , id=1인것을 삭제버튼누르면 id=2,3,4,5 ~ 이런 친구들만 뽑아서 cleanToDo에 넣는다.
        return toDo.id !== parseInt(li.id); //parseInt 숫자로 바꿔주는 함수
    });
    toDo = cleanToDos;
    saveToDo();
}

function saveToDo(){
    localStorage.setItem(TODO_LIST,JSON.stringify(toDo)); //key값 value값
    // JSON.stringify 는 자바스크립트에서 오브젝트를 string으로 바꾸는것
    // Java Script Object Notation
}

function paintToDo(text){
    
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const newId = toDo.length + 1; 
    delBtn.innerHTML = "X";
    delBtn.addEventListener("click", deleteToDo);  //del버튼 클릭시 deleteToDo 실행
    const span =document.createElement("span");
    span.innerText = text;
    li.appendChild(span); //실제로 만든 span을 li의 자식으로 넣어준다
    li.appendChild(delBtn); //실제로 만든 delBtn을 li의 자식으로 넣어준다
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text : text,
        id : newId
    }
    toDo.push(toDoObj);
    saveToDo();
}


function handleSubmit(event){
    event.preventDefault();
    // preventDefault 는 기본으로 정의된 이벤트를 작동하지 못하게 하는 메서드입니다.
    // a태그를 클릭 했을 때 preventDefault() 메서드를 실행시켜 주면 페이지 이동을 하는 기본 기능을 막는 것 입니다
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value="";
}


function loadToDo(){
    const loadToDo = localStorage.getItem(TODO_LIST);
    if(loadToDo !== null){
        const parsedToDo = JSON.parse(loadToDo); //parse mean object화
        parsedToDo.forEach(function(toDo){  //foreach는 parsedToDo의 각각 text마다 paintToDo한다.
            paintToDo(toDo.text);
        })        
    }
}
function init(){
    loadToDo();
    toDoForm.addEventListener("submit",handleSubmit)
    //submit 즉 엔터칠시 작동 
}

init();

