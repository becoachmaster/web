// Aumenta la velocidad de reproducción del video de vimeo
const iframe = document.getElementById("vimeo-video");
const player = new Vimeo.Player(iframe);

// Declaramos los elementos DESPUÉS de que el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  const paso2 = document.getElementById("paso2");
  const waitingMessage = document.getElementById("waiting-message");
  const timerEl = document.getElementById("timer");
  const progressBar = document.getElementById("progress-bar");

  // Tiempo específico en segundos para desbloquear
  const unlockTime = 194;

  player.ready().then(() => {
    player.setPlaybackRate(1.15).catch(error => {
      if (error.name === "RateNotSupportedError") {
        console.warn("La velocidad no está permitida para este video.");
      } else {
        console.error(error);
      }
    });

    // ✅ Aseguramos que la barra empiece en 0%
    progressBar.style.width = "0%";

    // ✅ Escuchar el progreso del video
    player.on("timeupdate", data => {
      const currentTime = data.seconds;

      if (currentTime < unlockTime) {
        // Calcula tiempo restante
        const remaining = unlockTime - currentTime;
        const minutes = Math.floor(remaining / 60);
        const seconds = Math.floor(remaining % 60);

        timerEl.textContent =
          (minutes < 10 ? "0" : "") +
          minutes +
          ":" +
          (seconds < 10 ? "0" : "") +
          seconds;

        // ✅ Actualiza la barra correctamente
        const percentage = (currentTime / unlockTime) * 100;
        progressBar.style.width = percentage + "%";
      } else {
        // ✅ Desbloquea el paso 2
        paso2.style.display = "block";
        waitingMessage.style.display = "none";
        progressBar.style.width = "100%"; // Forzamos a llenarse al final
      }
    });
  });
});
