const form = document.getElementById("todoForm")
const toDoContainer = document.getElementById("toDoContainer")
const localStorageKey = "todo-list"

const isDataValid = (todo) => {
    const idValid = typeof todo?.id === "string" && todo?.id
    const isValueValid = typeof todo?.value === "string" && todo?.value
    const isDoneValid = typeof todo?.done === "boolean"

    return idValid && isValueValid && isDoneValid
}

const getDataFromLocalStorage = () => {
    try {
        // return JSON.parse(localStorage.getItem(localStorageKey))
        const strVal = localStorage.getItem(localStorageKey)
        if (!strVal) {
            return []
        }
        const objVal = JSON.parse(strVal)
        if (!Array.isArray(objVal)) {
            localStorage.removeItem(localStorageKey)
            return []

        }

        //array
        const newData = []
        objVal.forEach(val => {
            const isValid = isDataValid(val)
            if (isValid) {
                newData.push(val)
            }
        })


        return newData
    } catch (err) {
        localStorage.removeItem(localStorageKey)
        return []
    }
}

let todos = getDataFromLocalStorage()



const renderToDo = () => {
    // for (let i = 0; i < todos.length; i++){
    //     const todo = todos[i]
    //     console.log(`index ${i} value:`, todo)
    // },
    toDoContainer.innerHTML = ""
    todos.forEach((todo) => {
        const html = getHtml(todo)
        toDoContainer.append(html)


    })
}



const getHtml = (todo) => {
    const undoIcon = `<svg class="undoIcon hover:cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-counterclockwise" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"/>
    <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z"/>
  </svg>`

    const completeIcon = ` <svg class="completeIcon hover:cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
    fill="currentColor" class="bi bi-check2" viewBox="0 0 16 16">
    <path
        d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
</svg>`
    const newDiv = document.createElement("div")
    newDiv.setAttribute("id", todo.id)
    newDiv.setAttribute("class", "flex flex-row items-center justify-between pr-2 w-4/12 mx-auto mt-2 bg-white")

    let textClassName = "font-semibold py-2 pl-4"
    if (todo.done) {
        textClassName += " line-through"
    }
    newDiv.innerHTML = `<div class="${textClassName}">
    ${todo.value}
</div>
<div class="flex justify-around w-2/12">
   ${todo.done ? undoIcon : completeIcon}
    <svg class="deleteIcon hover:cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
        fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
        <path
            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
        <path
            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
    </svg>
</div>`
    if (!todo.done) {
        const completeIconHtml = newDiv.querySelector(".completeIcon")
        completeIconHtml.addEventListener("click", () => {
            todo.done = true
            localStorage.setItem(localStorageKey, JSON.stringify(todos))
            renderToDo()
        })
        //changes
    } else {
        const undoIconHtml = newDiv.querySelector(".undoIcon")
        undoIconHtml.addEventListener("click", () => {
            todo.done = false
            localStorage.setItem(localStorageKey, JSON.stringify(todos))
            renderToDo()
        })
    }
    
    const deleteIconHtml = newDiv.querySelector(".deleteIcon")
    deleteIconHtml.addEventListener("click", () => {
        todos = todos.filter(t => t.id !== todo.id)
        localStorage.setItem(localStorageKey, JSON.stringify(todos))
        renderToDo()
    })
    return newDiv

}

form.addEventListener("submit", (event) => {
    event.preventDefault()
    const data = new FormData(form)
    const textData = data.get("userInput")
    if (!textData) {
        alert("Enter The Value")
    } else {
        // toDoContainer.innerHTML = toDoContainer.innerHTML + getHtml(textData)
        // toDoContainer.innerHTML += getHtml(textData)
        todos.push({
            id: crypto.randomUUID(),
            value: textData,
            done: false,

        })
        localStorage.setItem(localStorageKey, JSON.stringify(todos))
        form.reset()
        renderToDo()
    }

})
renderToDo()