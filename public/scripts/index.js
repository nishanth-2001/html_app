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

const todos = getDataFromLocalStorage()



const renderToDo = () => {
    // for (let i = 0; i < todos.length; i++){
    //     const todo = todos[i]
    //     console.log(`index ${i} value:`, todo)
    // },
    toDoContainer.innerHTML = ""
    todos.forEach((todo, i) => {
        toDoContainer.innerHTML += getHtml(todo.value)


    })
}



const getHtml = (input) => {
    return `<div class="flex flex-row items-center justify-between pr-2 w-4/12 mx-auto mt-2 bg-white">
    <div class="font-semibold py-2 pl-4">
        ${input}
    </div>
    <div class="flex justify-around w-2/12">
        <svg class="hover:cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
            fill="currentColor" class="bi bi-check2" viewBox="0 0 16 16">
            <path
                d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
        </svg>
        <svg class="hover:cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
            fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
            <path
                d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
            <path
                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
        </svg>
    </div>
</div>`
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