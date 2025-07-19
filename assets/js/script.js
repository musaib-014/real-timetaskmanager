// Ticket #3
//1 defining class and properties 
const taskArray =JSON.parse(localStorage.getItem("arrayOfTasks")) || [];

function setDataIntoLocalStorage(){
        const jsonData = JSON.stringify(taskArray);
        localStorage.setItem("arrayOfTasks",jsonData);
}

class Task{
        constructor(id,title,status,timestamp,rawTimeStamp){
                this.id = id;
                this.title = title;
                this.status = status;
                this.timestamp = timestamp;
                this.rawTimeStamp = rawTimeStamp;
        }
}

//2 Adding event listner to the button
const addTaskButton = document.querySelector('.addtaskbtn');
addTaskButton.addEventListener('click',()=>{
        const taskInputElement = document.getElementById('taskInputField');
        const taskInputValue = taskInputElement.value.trim();
        
        if(taskInputValue !== "")
        {
                const date = new Date();                
                const id = date.getTime();
                const timestamp = date.toLocaleString();                
                const newTask = new Task(id,taskInputValue,false,timestamp,date);  
                taskArray.push(newTask);  
                taskInputElement.value = "";
                setDataIntoLocalStorage();
                renderTaskListInDom();
        }else{
                console.log("Write something in the task");
                
        }     
});

function renderTaskListInDom(){
        const container = document.querySelector('.tasklistSection');
        container.innerHTML = "";
        

        if(taskArray.length === 0){
                const emptyListMesseage = document.createElement("h3");
                emptyListMesseage.textContent = "No Task Added";
                container.appendChild(emptyListMesseage);
                return;
        }
        
        taskArray.forEach(task=>{
                const cardDiv = document.createElement("div");
                cardDiv.id = task.id;
                cardDiv.className = "card";

                const cardFlex = document.createElement("div");
                cardFlex.className = "cardflex";

                const checkbox = document.createElement("input");
                checkbox.value = task.id;
                checkbox.setAttribute("type","checkbox");
                checkbox.checked = task.status;
                checkbox.onclick = ()=>{toggleStatus(checkbox);}
              

                const taskTitle = document.createElement("h4");
                taskTitle.classList.remove("taskComplete");
                taskTitle.textContent = task.title;
                  if(task.status === true)
                {
                        taskTitle.className = "taskComplete";
                }

                const timeStamp = document.createElement("p");
                timeStamp.textContent = task.timestamp;

                const actionDiv = document.createElement("div");
                actionDiv.className = "actionbtn";

                const removeBtn = document.createElement("button");
                removeBtn.value = task.id;
                removeBtn.className = "remove";
                removeBtn.textContent = "Remove";
                removeBtn.onclick = ()=>{showConfirmationBox(removeBtn);}

                const editBtn = document.createElement("button");
                editBtn.className = "edit";
                editBtn.textContent = "Edit";

                cardFlex.append(checkbox,taskTitle);
                actionDiv.append(removeBtn,editBtn);
                cardDiv.append(cardFlex,timeStamp,actionDiv);

                container.appendChild(cardDiv);

        });

}

renderTaskListInDom();

function toggleStatus(button){
        const id = Number(button.value);
        let data = taskArray.find(x => x.id === id);
        if(data){
                data.status = !data.status;
                setDataIntoLocalStorage();
                renderTaskListInDom();
                
        }

}
function showConfirmationBox(button){

        const confirmation = document.querySelector('.parentConfirm');
        confirmation.style.display = "flex";

        const confirmRemove = document.querySelector('.confirmRemove');
        confirmRemove.value = Number(button.value);
        confirmRemove.onclick = ()=>{removeTask(confirmRemove,confirmation)}

        const cancelRemove = document.querySelector('.cancelRemove');
        cancelRemove.onclick = ()=>{closeConfirmationBox(confirmation);}
        
}
function closeConfirmationBox(ele){
        ele.style.display = "none";
}
        
function removeTask(button,ele){
        const id = Number(button.value);
        const indexOfElement = taskArray.findIndex(x => x.id === id);
        if(indexOfElement !== -1)
        {
                taskArray.splice(indexOfElement,1);
                ele.style.display = "none";
                setDataIntoLocalStorage();
                renderTaskListInDom();
        }

}
