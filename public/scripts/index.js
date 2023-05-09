const form = document.getElementById("todoForm")

form.addEventListener("submit", (event) => {
    event.preventDefault()
    const data = new FormData(form)
    const textData = data.get("userInput")
    if(!textData){
        alert("Enter The Value")
    } else {
    console.log(textData)
    form.reset()
    }

})