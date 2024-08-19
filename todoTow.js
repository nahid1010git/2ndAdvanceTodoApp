// ==========================selected elements start===========================

const newTaskForm = document.getElementById(`form`);

const tBody = document.getElementById(`tbody`);

// ==========================selected elements end===========================




// ======================= utilities start ======================

function getUId(){
    return Date.now() + Math.round(Math.random()*10000).toString();
}
// ======================= utilities end ======================


// ==========================local storage/database start =====================

// get all task from local storage / data base ===============


function getAllTaskFromLocalStorage(){
    const rowTaskFromLocalStorage = localStorage.getItem(`tasks`);
    let rowTaskArray = [];
    if(rowTaskFromLocalStorage){
           rowTaskArray = JSON.parse(rowTaskFromLocalStorage);
    }

    return rowTaskArray;
}



// add new task in loaded data array =============

function addSingleTaskInArray(task){

    const loadedTask = getAllTaskFromLocalStorage();
    loadedTask.push(task);
    addAllTasksToLocalStorage(loadedTask);

}



// old data get kora and  notun data oii arrayte push kora ses akhon sob gula local e pathanor somoye=============

function addAllTasksToLocalStorage(loadedTask){
  localStorage.setItem(`tasks`,JSON.stringify(loadedTask));
}



// ==========================local storage/database end =====================











// ================================ handler function start=======================

// new task creation function =========

function newTaskFromHandler(e) {
  e.preventDefault();
const id = getUId();
  let newTaskObject = {
    status:0,
    id,
  };
  [...newTaskForm.elements].forEach((element) => {
    if (element.name) {
        newTaskObject[element.name] = element.value;
    }
  });

  newTaskForm.reset();
addSingleTaskInArray(newTaskObject);

updateToUi();
  
}


// create TR For display =================

function createTr({name,priority,status,date,id},index){
const formatedDate =new Date(date).toDateString();
return `  <tr class="body_tr" id=${id}>
          <td class="one">Task</td>
          <td class="two">${index + 1}</td>
          <td class="three">${name}</td>
          <td class="for">${priority}</td>
          <td class="five">${status ? `completed` : `incompleted`}</td>
          <td class="six">${formatedDate}</td>
          <td class="saven">
            <button id="edit"><i class="fa-regular fa-pen-to-square"></i></button>
            <button id="check"><i class="fa-regular fa-square-check"></i></button>
            <button id="delete"><i class="fa-solid fa-trash-can"></i></button>
          </td>
        </tr>`

};



// update to UI / display===============

function updateToUi(){
    const tasksFromLocal = getAllTaskFromLocalStorage();
    const tasksHtmlArray = tasksFromLocal.map((task,index)=>{
        return createTr(task,index);
    });

tBody.innerHTML = tasksHtmlArray;


}

updateToUi();

// ================================ handler function end=======================

// ==========================event handlers start===================

newTaskForm.addEventListener(`submit`, newTaskFromHandler);

// ==========================event handlers end===================
