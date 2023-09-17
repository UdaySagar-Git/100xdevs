




//post todo
function sendtodo() {
    let title = document.getElementById("title").value;
    let description = document.getElementById("description").value;

    function cffetch(data) {
        addToTodoList(data);
    }

    function cfetch(random) {
        random.json().then(cffetch);
    }

    fetch("http://localhost:3000/todos", {
        method: "POST",
        body: JSON.stringify({
            title: title,
            description: description
        }),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(cfetch);

    title="";
    description="";
    Alltodoonload();
}

function addToTodoList(newTodo) {
    let todocontainer = document.querySelector(".todo-div2");
    let innerdiv = document.createElement("div");
    innerdiv.classList.add("child");
  
    let tittodo = document.createElement("span");
    tittodo.classList.add("tit-todo");
    tittodo.textContent = newTodo.title;
  
    let br1 = document.createElement("br");
  
    let distodo = document.createElement("span");
    distodo.classList.add("dis-todo");
    distodo.textContent = newTodo.description;
  
    let br2 = document.createElement("br");
  
    let edittodo = document.createElement("button");
    edittodo.classList.add("edit-todo");
    edittodo.innerHTML = "Edit";
  
    let deltodo = document.createElement("button");
    deltodo.classList.add("del-todo");
    deltodo.innerHTML = "Delete";
    deltodo.setAttribute("onclick", `deltodo(${newTodo.id})`);
  
    innerdiv.appendChild(tittodo);
    innerdiv.appendChild(br1);
    innerdiv.appendChild(distodo);
    innerdiv.appendChild(br2);
    innerdiv.appendChild(edittodo);
    innerdiv.appendChild(deltodo);
  
    todocontainer.appendChild(innerdiv);
  }


//all todo 

function Alltodoonload(){
    fetch("http://localhost:3000/todos",{
        method:"GET",
    }).then((checkstataus)=>{
        checkstataus.json().then((data)=>{
            console.log(data);
            let todocontainer = document.querySelector(".todo-div2");
            todocontainer.innerHTML="";
            for(let i=0;i<data.length;i++){
            
                let innerdiv = document.createElement("div");
                innerdiv.classList.add("child");

                let tittodo = document.createElement("span");
                tittodo.classList.add("tit-todo");
                tittodo.textContent=data[i].title;

                let br1 =document.createElement("br");

                let distodo = document.createElement("span");
                distodo.classList.add("dis-todo");
                tittodo.textContent=data[i].description;

                let br2 =document.createElement("br");

                let edittodo = document.createElement("button");
                edittodo.classList.add("edit-todo");
                edittodo.innerHTML="Edit";

                let deltodo = document.createElement("button");
                deltodo.classList.add("del-todo");
                deltodo.innerHTML="Delete";
                deltodo.setAttribute("onclick","deltodo("+data[i].id+")");

                innerdiv.appendChild(tittodo);
                innerdiv.appendChild(br1);
                innerdiv.appendChild(distodo);
                innerdiv.appendChild(br2);
                innerdiv.appendChild(edittodo);
                innerdiv.appendChild(deltodo);

                todocontainer.appendChild(innerdiv);
            }            
        })
    })
}

//del todo

function deltodo(id){
    fetch("http://localhost:3000/todos/"+id,{
        method:"DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(()=>{
        removeFromTodoList(id);
        })
}

function removeFromTodoList(id) {
    let todocontainer = document.querySelector(".todo-div2");
    let todoToRemove = document.querySelector(`.child [onclick="deltodo(${id})"]`);
  
    if (todoToRemove) {
      todocontainer.removeChild(todoToRemove.parentElement);
    }
  }

//del all 

function deleteall(){
    fetch("http://localhost:3000/deleteall/",{
        method:"DELETE",
        headers: {
            "Content-Type":"application/json"
        }
    }).then(()=>{
        
        clearTodoList();
        }
    )
}

function clearTodoList() {
  let todocontainer = document.querySelector(".todo-div2");
  todocontainer.innerHTML = "";
}