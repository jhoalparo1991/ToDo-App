// Variables
let tareas = document.querySelector("#task");
let btnAgregar = document.querySelector("#btn-agregar");
let listaUl = document.querySelector("#lista-ul");
let form = document.querySelector("form");

let todos = [];

// Events
btnAgregar.addEventListener("click", crearTareas);
document.addEventListener("DOMContentLoaded", () => {
  sincronizarLocalStorage();
});

// Functions
function crearTareas(e) {
  e.preventDefault();
  let tarea = tareas.value;
  if (tarea.length <= 0) {
    validar_campos();
    return false;
  }
  let nuevaTarea = { id: Date.now(), tarea };
  todos = [...todos, nuevaTarea];
  guardarEnLocalStorage(todos);
}

function guardarEnLocalStorage(todos) {
  let dato = JSON.stringify(todos);
  localStorage.setItem("todo", dato);
  sincronizarLocalStorage();
  form.reset();
}

function sincronizarLocalStorage() {
  todos = JSON.parse(localStorage.getItem("todo"));

  mostrarTareas(todos);
}

function mostrarTareas(datos) {
  limpiar();
  if (datos.length > 0) {
    datos.forEach((dato) => {
      let { id, tarea } = dato;
      let li = document.createElement("li");

      li.innerHTML = `
        <span>${tarea}</span>
        <button class="btn-borrar" onclick=borrar(event) id="btn-borrar" data-id=${id}>X</button>
    `;
      listaUl.appendChild(li);
    });
  }
}

function borrar(e) {
  let id = e.target.dataset.id;
  let lista = todos.filter((todo) => todo.id !== parseInt(id));
  guardarEnLocalStorage(lista);
}

function limpiar() {
  while (listaUl.firstChild) {
    listaUl.removeChild(listaUl.firstChild);
  }
}

function validar_campos() {
  let p = document.createElement("p");
  p.className = "error";
  p.textContent = "Ingres el nombre de la tarea";
  form.appendChild(p);
  setTimeout(() => {
    p.remove();
  }, 3000);
}
