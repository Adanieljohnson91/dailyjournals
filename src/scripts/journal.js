import journalEntryForm from './journalEntryForm.js'
import API from './apis.js';
const data = {
    journals : [],
    currentId:0
}

export default async function wireUp(){
    data.journals = await API.getJournalEntries();
    appendJournalForm();
    postEventListener();
    if(data.journals.length > 0){
        renderPosts(data.journals);
        addEvents();
    }else{
        console.log('Post an Entry');
    }
}
const addEvents = () =>{
    deleteEventListener();
    editEventListener();
    radioEventListener();
}
const appendJournalForm = () =>{
    document.getElementById('top-section').innerHTML = journalEntryForm('Anthony');
}
const postEventListener = () =>{
    document.getElementById('post-journal-entry').addEventListener('click', postData)
}
const deleteEventListener = () =>{
    let deleteButtons = document.querySelectorAll('#delete-button');
    deleteButtons.forEach(button=>{
        button.addEventListener('click', deletePost)
    })
}
const editEventListener = () => {
    let editButtons = document.querySelectorAll('#edit-button');
    editButtons.forEach(button=>{
        button.addEventListener('click', editToggle)
    })
}
const deletePost = (e) =>{
    e.preventDefault();
    let id = e.target.name;
    API.deleteJournalEntry(id);
    document.querySelector(`#journal-entry-card-${id}`).outerHTML = ""
}
const editToggle = (e) =>{
    let id = e.target.name;
    let i = findIndexById(id);
    data.currentId = i;
    data.journals[i].edit = true;
    renderPosts(data.journals);
    saveEventListener();
    editValueListener();
    deleteEventListener();
        editEventListener();
}
const saveEventListener = () =>{
    document.querySelector('#save-button').addEventListener('click', e=>{
        let id = data.journals[data.currentId].id
        delete data.journals[data.currentId].edit;
        API.updatJournalEntry(data.journals[data.currentId], id);
        renderPosts(data.journals);
        deleteEventListener();
        editEventListener();
       
    })
}
const editValueListener = () =>{
    document.querySelector('#form-date-input').addEventListener('input', inputEvent)
    document.querySelector('#form-concept-input').addEventListener('input', inputEvent)
    document.querySelector('#form-entry-input').addEventListener('input', inputEvent)
    document.querySelector('#mood-select-input').addEventListener('input', inputEvent)
}
const radioClicked = (e) =>{
    if(e.target.checked){
         document.getElementById(`${e.target.id}`).addEventListener('click', disableCheckListener)
         
         let filteredArr = filterArray(e.target.name);
         renderPosts(filteredArr);

    }else{
        console.log('still alive') 
    }
}
const radioEventListener=()=>{
    document.querySelector('#mood-wonderful').addEventListener('click', radioClicked);
    document.querySelector('#mood-great').addEventListener('click', radioClicked);
    document.querySelector('#mood-meh').addEventListener('click', radioClicked);
    document.querySelector('#mood-tired').addEventListener('click', radioClicked);
    document.querySelector('#mood-down').addEventListener('click', radioClicked);
}
const disableCheckListener = (e) =>{
    e.target.checked = false;
    renderPosts(data.journals);
    document.getElementById(`${e.target.id}`).removeEventListener('click', disableCheckListener);
}
const inputEvent = (e)=>{
   let target = e.target;
   let {name, value} = target;
   data.journals[data.currentId][name] = value;
   
}
const grabPostData = (e) =>{
    
    let date, concept, entry, mood;
    date = document.querySelector('#form-date').value;
    concept = document.querySelector('#form-concept').value;
    entry = document.querySelector('#form-entry').value;
    mood = document.querySelector('#mood-select').value;
    let newJournalEntry = 
    {journal_date: date,
    concepts_covered: concept,
    journal_entry: entry,
    selector: mood};
    return newJournalEntry;
}
const clearForm = ()=>{
    document.querySelector('#form-date').value = "";
    document.querySelector('#form-concept').value = "";
    document.querySelector('#form-entry').value = "";
    document.querySelector('#mood-select').value = "";
}
const clearJournals = ()=>{
    document.getElementById('journal-entries').innerHTML = ""
}
const renderPosts = (journals) =>{
    clearJournals();
    for(let i = 0; i < journals.length; i++){
        let journal = journals[i];
        let entry = makeJournalEntry(journal);
     
        document.getElementById('journal-entries').innerHTML += entry;
    }
}
const makeJournalEntry = (journal)=>{
    if(!journal.edit){
    return `<div class="container" id="journal-entry-card-${journal.id}">
    <div id="journal-entry-concept">
        <h1>${journal.concepts_covered}</h1>
    </div>
    <div id="journal-entry-date">
        <small>${journal.journal_date}</small>
    </div>
    <div id="journal-entry-entry">
        <p>${journal.journal_entry}</p>
    </div>
    <div id="journal-entry-mood">
        <h5>${journal.selector}</h5>
        <button type="button" name=${journal.id} id="edit-button">Edit</button>
        <button type="button" name=${journal.id} id="delete-button">Delete</button>
    </div>
</div>`
}else{
    return `<div class="container" id="journal-entry-card-${journal.id}">
    <form id="journal-form">
        <label>Date: </label>
        <input type="date" id="form-date-input"name="journal_date" value=${journal.journal_date}>
        <label>Subject: </label>
        <input type="text" id="form-concept-input" name="concepts_covered" value="${journal.concepts_covered}">
        <label>Entry: </label>
        <input type="text" id="form-entry-input" name="journal_entry" value="${journal.journal_entry}">
        <label>Mood: </label>
        <select id="mood-select-input" name="selector" value="${journal.selector}">
        <option value="happy">Wonderful</option>
        <option value="great">Great</option>
        <option value="meh">Meh</option>
        <option value="tired">Tired</option>
        <option value="down">Down</option>
    </select>
    <button type="button" name=${journal.id} id="save-button">Save</button>
    </form>
    </div>`
}
}
const postData =(e)=>{
    let post = grabPostData();
    API.addJournalEntry(post);
    clearForm();
}
//Helper Functions //
const findIndexById = (id) =>{
    let index;
    for(let i = 0; i < data.journals.length; i++){
        if(data.journals[i].id == id){
            index = i
        }
    }
    if(index === undefined || null){
        console.log('findIndex Error');
    }
    return index;
}
const filterArray = (mood) =>{
    let newArr = [];
    for(let i = 0; i < data.journals.length; i++){
        let journal = data.journals[i]
        if(journal["selector"]==mood){
            newArr.push(journal)
        }
    }
    return newArr;
}