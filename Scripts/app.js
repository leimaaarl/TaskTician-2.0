const inputTask = document.getElementById('input-task')
const inputTag = document.getElementById('tags')
const inputNote = document.getElementById('notes')
const taskObject = {}
fetchData();

const storeData = () => {
    localStorage.setItem(localStorage.length+1, JSON.stringify(taskObject))
}

const formatDate = () => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const currentMonth = new Date().getMonth();
    const currentDay = new Date().getDate();
    const currentYear = new Date().getFullYear();

    return `${months[currentMonth]} ${currentDay}, ${currentYear}`
}

console.log(formatDate())

function fetchData(){

    const items = document.getElementById('items')
    var itemList = []
    var content = ``



    const storageLen = localStorage.length;

    for(let i = 1; i <= storageLen; i++){
        itemList.push(JSON.parse(localStorage.getItem(i)))
    }
    
    for(let item of itemList){
        content += `
        <div class='items-layout'>
                <h5> ${item.task} <span class='span-mini-tag'> | ${item.tag}</span></h5> 
                <p class='note-p'> ${item.note} </p>
                <span class='span-mini'>${item.date}</span>
            <br/>
        </div>
        `
    }

    if (localStorage.length < 1){
        items.innerHTML = '<h3>No task available</h3>'
    }else{
        items.innerHTML = content
    }
    
}

document.getElementById('add-task').addEventListener('click', ()=>{

    if(inputTask.value != ""){

        taskObject.task = inputTask.value;
        taskObject.tag = inputTag.value;
        taskObject.note = inputNote.value;
        taskObject.date = formatDate();

        inputTask.value = "";
        inputNote.value = "";

        console.log(taskObject)

        storeData();
        fetchData();
    }

})
