
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

  const ahora = obtenerAhoraBogota();
  const proximoWebinar = calcularProximoWebinar(ahora, webinar.hora);

  // Mostrar fecha en el formato correcto
  document.getElementById("fecha-webinar").textContent = generarTextoFecha(ahora, proximoWebinar);

  // Iniciar contador
  iniciarContador(proximoWebinar);
}

function calcularProximoWebinar(ahora, horaWebinar) {
  const [h, m] = horaWebinar.split(":").map(Number);
  let proxima = new Date(ahora);
  proxima.setHours(h, m, 0, 0);

  const dia = ahora.getDay(); // 0=Dom, 1=Lun, ..., 6=Sab
  const hora = ahora.getHours();
  const minuto = ahora.getMinutes();

  // Hoy (Lun-Vie antes de 6:01pm)
  if (dia >= 1 && dia <= 5 && (hora < 18 || (hora === 18 && minuto === 0))) {
    return proxima;
  }

  // Mañana (Lun-Jue después de 6:01pm)
  if (dia >= 1 && dia <= 4 && (hora > 18 || (hora === 18 && minuto > 0))) {
    proxima.setDate(proxima.getDate() + 1);
    return proxima;
  }

  // Viernes tarde o sábado → próximo lunes
  if ((dia === 5 && (hora > 18 || (hora === 18 && minuto > 0))) || dia === 6) {
    const diasParaLunes = (8 - dia) % 7;
    proxima.setDate(proxima.getDate() + diasParaLunes);
    return proxima;
  }

  // Domingo → lunes
  if (dia === 0) {
    proxima.setDate(proxima.getDate() + 1);
    return proxima;
  }

  return proxima;
}

function generarTextoFecha(ahora, proxima) {
  const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const meses = ["enero","febrero","marzo","abril","mayo","junio","julio",
                 "agosto","septiembre","octubre","noviembre","diciembre"];

  // Normalizar fechas a medianoche para comparar solo días
  const hoyMid = new Date(ahora);
  hoyMid.setHours(0,0,0,0);

  const proxMid = new Date(proxima);
  proxMid.setHours(0,0,0,0);

  const diferenciaDias = Math.round((proxMid - hoyMid) / (1000 * 60 * 60 * 24));

  const diaSemana = diasSemana[proxima.getDay()];
  const mes = meses[proxima.getMonth()];
  const diaMes = proxima.getDate();

  if (diferenciaDias === 0) {
    return `Hoy, ${diaSemana} ${diaMes} de ${mes}, a las 7:00 pm`;
  }
  if (diferenciaDias === 1) {
    return `Mañana, ${diaSemana} ${diaMes} de ${mes}, a las 7:00 pm`;
  }
  return `${diaSemana}, ${diaMes} de ${mes}, a las 7:00 pm`;
}

function iniciarContador(fechaObjetivo) {
  function actualizarContador() {
    const ahora = obtenerAhoraBogota();
    const diferencia = fechaObjetivo - ahora;

    if (diferencia <= 0) {
      document.getElementById("contador").textContent = "¡El webinar ha comenzado!";
      clearInterval(intervalo);
      return;
    }

    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((diferencia / (1000 * 60)) % 60);
    const segundos = Math.floor((diferencia / 1000) % 60);

    let texto = "";
    if (dias > 0) {
      texto += `${dias}d `;
    }
    texto += `${horas}h ${minutos}m ${segundos}s`;

    document.getElementById("contador").textContent = texto;
  }

  actualizarContador();
  const intervalo = setInterval(actualizarContador, 1000);
}



// Función para obtener parámetros de la URL
function getParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Función para rellenar el formulario
function fillFormFromURL() {
  const nameField  = document.querySelector("#ml-modal input[name='fields[name]']");
  const emailField = document.querySelector("#ml-modal input[name='fields[email]']");
  const phoneField   = document.querySelector("#ml-modal input[name='fields[phone]']");

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

  // Asignar a TODOS los botones con clase .openModalBtn
  document.querySelectorAll(".openModalBtn").forEach(btn => {
    btn.addEventListener("click", () => {
      modal.style.display = "block";
      setTimeout(() => modal.classList.add("show"), 10);
      fillFormFromURL();
    });
  });

  // Cerrar modal
  closeBtn.addEventListener("click", () => {
    modal.classList.remove("show");
    setTimeout(() => modal.style.display = "none", 300);
  });

  // Cerrar al hacer click fuera
  window.addEventListener("click", (event) => {
    if (event.target == modal) {
      modal.classList.remove("show");
      setTimeout(() => modal.style.display = "none", 300);
    }
  });
});


function getParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param) || "";
  }

  document.addEventListener("DOMContentLoaded", () => {
    const name  = getParam("name");
    document.getElementById("user-name").textContent = name;
  });


