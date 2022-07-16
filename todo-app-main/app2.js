const formulario=document.querySelector(".content-form");
const barra=document.querySelector(".buscador");
const containerTareas=document.querySelector(".content-tareas")
let tareas=[];

eventListener();
function eventListener(){
    formulario.addEventListener("submit", leerTarea);
};

function leerTarea(e){
    e.preventDefault()
    let valor;
    valor.innerHTML="m"
    if(barra.value!=""){
        tareas.push(barra.value)
        // mostrarTareas();
        console.log("valor")
        formulario.reset();
    }

    console.log("Incorrecto")
};