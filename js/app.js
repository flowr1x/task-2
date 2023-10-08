let form = document.querySelector(".form")
form.addEventListener("submit", (event) => {
    event.preventDefault();
    
    if (validation(event.currentTarget)) {
        alert("Форма отправлена!");
    }
})

function validation(form) {
    function createErrorElement(input, text) {
        const parentInput = input.parentNode;
        parentInput.classList.add("form__input_error");
        
        const elementError = document.createElement("p");
        elementError.classList.add("error-text");
        elementError.textContent = text;
        parentInput.append(elementError);
    }
    function removeErrorElement(input) {
        const parentInput = input.parentNode;
    
        if (parentInput.classList.contains("form__input_error")) {
            parentInput.classList.remove("form__input_error")
            parentInput.querySelector(".error-text").remove();
        }
        parentInput.querySelectorAll(".error-text")
    }
    
    let result = true;
    let inputs = form.querySelectorAll("input");
    inputs.forEach(input => {
        removeErrorElement(input);

        if (input.dataset.minLength) {
            if (input.value.length < input.dataset.minLength) {
                createErrorElement(input, "В поле недостаточно символов!");
                result = false;
            }
        }
        if (input.dataset.required) {
            if (!input.value) {
                createErrorElement(input, "Поле пустое!");
                result = false;
            }
        }
    });

    return result;
}
