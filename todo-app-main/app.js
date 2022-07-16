const formulario=document.querySelector(".content-form");
const barra=document.querySelector(".buscador");
const containerTareas=document.querySelector(".tareas-container");
const all=document.querySelector(".all");
const activo=document.querySelector(".activo");
const complete=document.querySelector(".completed");
const clear=document.querySelector(".clear");
const darkMode=document.querySelector(".mode");
const body=document.querySelector("body");

let tareas=[];
let total=0;

eventListener();
function eventListener(){
    formulario.addEventListener("submit", leerTarea);

    all.addEventListener("click", allTareas);

    activo.addEventListener("click",(e)=>{
        desactivar();
        e.target.classList.add("active")
       
        allFiltro(true);
       
    });

    complete.addEventListener("click",(e)=>{
        desactivar();
        e.target.classList.add("active")
        allFiltro(false);
        
    });

    clear.addEventListener("click", clearComplete);

    darkMode.addEventListener("click", modeDark);
};


function leerTarea(e){
    e.preventDefault()
    if(barra.value!=""){

        const tarea={
            valor:barra.value,
            estado:true,
        }
        tareas.push(tarea);
         mostrarTareas(tareas);
        formulario.reset();
    }
    
};

function mostrarTareas(tareass){
    limpiarHtml();
    tareass.forEach(tarea=>{
        let valor=document.createElement("div");
        valor.classList.add("content-tarea","item");
      valor.innerHTML=`
          <a href="#" class="radio "></a>
          <h2 class="tarea">${tarea.valor}</h2>
      `;

      
        valor.onclick=(e)=>{
            
            if(e.target.classList.contains("radio")){
                let v=e.target.nextSibling.nextElementSibling.textContent;
                let newArray = tareas.map(tarea=>{
                    if(tarea.valor===v){
                        if(tarea.estado){
                            tarea.estado=false;
                            
                        }else{
                            tarea.estado=true;
                           
                        }
                        return tarea;
                    }else{
                        return tarea;
                    }
                });

                tareas=newArray;
                e.target.classList.toggle("active")
            }
           totalTareas();
        }
        totalTareas();

        if(tarea.estado==false){
            valor.firstChild.nextElementSibling.classList.toggle("active");
        }
      
      containerTareas.appendChild(valor);
    })
}

function limpiarHtml(){
    while(containerTareas.firstChild){
        containerTareas.removeChild(containerTareas.firstChild);
    }
}

function totalTareas(){
   
  const t=tareas.filter(tarea=>tarea.estado!=false);

  document.querySelector(".restantes").innerHTML=`${t.length} Items left`;
}

function allTareas(e){
    desactivar();
    mostrarTareas(tareas);
    e.target.classList.add("active");
}

function allFiltro(estado){
    let activos;
    if(estado){
        activos=tareas.filter(tarea=>tarea.estado===true);
        
    }else{
        activos=tareas.filter(tarea=>tarea.estado===false);
    }

    mostrarTareas(activos);
}

function clearComplete(){
   const result=tareas.filter(tarea=>tarea.estado===true);
   tareas=[...result];
    desactivar();
    all.classList.add("active");
   mostrarTareas(tareas);
}

function desactivar(){
    if(activo.classList.contains("active")){
        activo.classList.remove("active")
        return;
    }

    if(all.classList.contains("active")){
        all.classList.remove("active")
        return;
    }
     if(complete.classList.contains("active")){
        complete.classList.remove("active")
        return;
    } 
}

function modeDark(e){
    if(!body.classList.contains("active")){
        
        e.target.src="images/icon-sun.svg";
    }else{
        e.target.src="images/icon-moon.svg";
    }

    body.classList.toggle("active")
}

