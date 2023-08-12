const input = document.querySelector('.input')
const form = document.querySelector('form')
const ul = document.querySelector('.list')
const clear = document.querySelector('.clear')
const filter = document.querySelector('.filter')

function loadStorage(){
    let itemStored = checkStorage()
    // after check the local storage for each item run the function createNewTodo(and pass the item) the item is the value from the key 'items'
    itemStored.forEach(item => createNewTodo(item))
}

function addItemOnSubmit(e){
    e.preventDefault()

    const newItem = input.value

    if(newItem === ''){
        alert('Add some text')
        return
    }
    checkUI()
    createNewTodo(newItem)
    addLocalStorager(newItem)

    input.value = ''

}


function createNewTodo(item){
    const div = document.createElement('div')
    const li = document.createElement('li')
    const button = createButton('delLi')
    div.style.display = 'flex'
    li.classList.add('li')
    li.append(document.createTextNode(item))
    div.append(li, button)
    ul.append(div)
    checkUI()
    
}

function createButton(classes){
    const button = document.createElement('button')
    button.className = classes
    button.innerHTML = 'X'
    return button

}
function filterItem(e){
    const allItem = ul.querySelectorAll('div li')
    const text = e.target.value.toLowerCase()
    allItem.forEach(item => {
        const itemName = item.firstChild.textContent.toLowerCase()
        if(itemName.indexOf(text) != -1){
            item.parentElement.style.display = 'flex'
        }else{
            item.parentElement.style.display = 'none' 
        }
    })
}

function removeItem(e){
    if(e.target.classList.contains('delLi')){
       e.target.parentElement.remove()
       removeStorageItem(e.target.parentElement.children[0].textContent);
    }
    checkUI()
}
function deletAll(){
    ul.innerHTML = ''
    localStorage.clear()
    checkUI()
}

function removeStorageItem(item){
    let itemStored = checkStorage()
    // after checl the local storage filter the item with filter(verifica i din array cu cel primit prin item si primesti inapoi un array cu toate itemele diferite de item) acum acel array filtrat trebuie trimis inapoi in local storage
    itemStored = itemStored.filter(i => i !== item)
    localStorage.setItem('items', JSON.stringify(itemStored))
    console.log(item);
}

function addLocalStorager(item){
    let itemStored = checkStorage()
    // after check the local storage push the new item in the array and set the array back. stringify the array when you set it bcs in local storage you need to send a string.
    itemStored.push(item)
    localStorage.setItem('items', JSON.stringify(itemStored))
    
}

function checkStorage(){
    // Check the local storage if the key 'items' is empty then create an empty array else take the array from local storage and pass it in the variable itemStored.
    let itemStored
    if(localStorage.getItem('items') === null){
        itemStored = []
    }else{
        itemStored = JSON.parse(localStorage.getItem('items'))
    }
    return itemStored
}


function checkUI(){
    const allItem = ul.querySelectorAll('div')
    if(allItem.length === 0){
        clear.style.display = 'none'
        filter.style.display = 'none'
    }else{
        clear.style.display = 'block'
        filter.style.display = 'block'
    }
}

form.addEventListener('submit', addItemOnSubmit)
ul.addEventListener('click', removeItem)
filter.addEventListener('keyup', filterItem)
clear.addEventListener('click', deletAll)
document.addEventListener('DOMContentLoaded', loadStorage)
checkUI()