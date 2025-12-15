document.addEventListener("DOMContentLoaded", () => {
  cargarWebinar();
});

// Función para obtener la hora actual en Bogotá (GMT-5)
function obtenerAhoraBogota() {
  return new Date(
    new Date().toLocaleString("en-US", { timeZone: "America/Bogota" })
  );
}

async function cargarWebinar() {
  const response = await fetch("/data/webinarGE.json");
  const webinar = await response.json();

  // Fecha fija: 8 de noviembre de 2025, 10:00 p.m. hora Bogotá
  const proximoWebinar = new Date("2025-11-15T10:00:00-05:00");

  const ahora = obtenerAhoraBogota();

  // Mostrar fecha en el formato correcto
  document.getElementById("fecha-webinar").textContent = generarTextoFecha(ahora, proximoWebinar);

  // Iniciar contador
  iniciarContador(proximoWebinar);
}

function generarTextoFecha(ahora, proxima) {
  const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const meses = ["enero","febrero","marzo","abril","mayo","junio","julio",
                 "agosto","septiembre","octubre","noviembre","diciembre"];

  const diaSemana = diasSemana[proxima.getDay()];
  const mes = meses[proxima.getMonth()];
  const diaMes = proxima.getDate();

  return `${diaSemana}, ${diaMes} de ${mes}, a las 10:00 am`;
}

function iniciarContador(fechaObjetivo) {
  function actualizarContador() {
    const ahora = obtenerAhoraBogota();
    const diferencia = fechaObjetivo - ahora;

    if (diferencia <= 0) {
      document.getElementById("contador").textContent = "¡El evento ha comenzado!";
      clearInterval(intervalo);
      return;
    }

    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((diferencia / (1000 * 60)) % 60);
    const segundos = Math.floor((diferencia / 1000) % 60);

    let texto = "";
    if (dias > 0) texto += `${dias}d `;
    texto += `${horas}h ${minutos}m ${segundos}s`;

    document.getElementById("contador").textContent = texto;
  }

  actualizarContador();
  const intervalo = setInterval(actualizarContador, 1000);
}

// -------------------
// Funciones del modal
// -------------------

function getParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

function fillFormFromURL() {
  const nameField  = document.querySelector("#ml-modal input[name='fields[name]']");
  const emailField = document.querySelector("#ml-modal input[name='fields[email]']");
  const phoneField = document.querySelector("#ml-modal input[name='fields[phone]']");

  const name = getParam("name");
  if (name && nameField) nameField.value = name;

  const email = getParam("email");
  if (email && emailField) emailField.value = email;

  const phone = getParam("phone");
  if (phone && phoneField) {
    phoneField.value = phone;
    phoneField.setAttribute("readonly", "true");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("ml-modal");
  const closeBtn = document.querySelector(".close");

  document.querySelectorAll(".openModalBtn").forEach(btn => {
    btn.addEventListener("click", () => {
      modal.style.display = "block";
      setTimeout(() => modal.classList.add("show"), 10);
      fillFormFromURL();
    });
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.remove("show");
    setTimeout(() => modal.style.display = "none", 300);
  });

  window.addEventListener("click", (event) => {
    if (event.target == modal) {
      modal.classList.remove("show");
      setTimeout(() => modal.style.display = "none", 300);
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const name  = getParam("name");
  if (name) document.getElementById("user-name").textContent = name;
});
