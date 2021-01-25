window.addEventListener("load", function(){
    
    console.log("connected")

    var inputs = document.querySelectorAll(".input-control")
    var errores = document.querySelectorAll(".error-msg")
    var formulario = document.querySelector(".form-validation")

    for (let i = 0; i < inputs.length; i++){
        inputs[i].addEventListener("blur", function(){
       
            if (inputs[i].value == ""){
                inputs[i].classList.add("invalid-input");
                errores[i].innerHTML = "This field cannot be empty" + "<br>";
            } else if (inputs[i].value !== ""){
                inputs[i].classList.remove("invalid-input");
                errores[i].innerHTML = "";
            }
        })
    }

    formulario.addEventListener("submit", function(e){

        for (let i = 0; i < inputs.length; i++){
            if (inputs[i].value == ""){
                e.preventDefault();
                inputs[i].classList.add('invalid-input');
                errores[i].innerHTML = "This field cannot be empty" + "<br>";
            } else if (inputs[i].value !== ""){
                inputs[i].classList.remove('invalid-input');
                errores[i].innerHTML = "";
            }
        }

    })

})