// Sobre de bienvenida: al tocarlo se abre y muestra la invitación.
    const introSobre = document.getElementById("introSobre");
    const abrirSobre = document.getElementById("abrirSobre");
    const musica = document.getElementById("musicaFondo");
    const controlMusica = document.getElementById("controlMusica");

    abrirSobre.addEventListener("click", () => {
      if (abrirSobre.classList.contains("abriendo")) return;
      abrirSobre.classList.add("abriendo");
      abrirSobre.querySelector(".portada-imagen").style.transform = "scale(1.08)";
      abrirSobre.style.opacity = "0";
      document.body.classList.remove("invitacion-cerrada");
      document.body.classList.add("abierta");
      musica.play().then(() => {
        controlMusica.textContent = "♫";
        controlMusica.setAttribute("aria-label", "Pausar música");
      }).catch(() => {
        controlMusica.textContent = "♪";
      });
      setTimeout(() => introSobre.classList.add("cerrado"), 1050);
    });

    controlMusica.addEventListener("click", () => {
      if (musica.paused) {
        musica.play().then(() => {
          controlMusica.textContent = "♫";
          controlMusica.setAttribute("aria-label", "Pausar música");
        }).catch(() => alert("Coloca el archivo musica.mp3 dentro de la carpeta music para reproducir la música."));
      } else {
        musica.pause();
        controlMusica.textContent = "♪";
        controlMusica.setAttribute("aria-label", "Activar música");
      }
    });

    // Carrusel 3D automático de cinco fotografías.
    const fotos3D = Array.from(document.querySelectorAll(".foto-3d"));
    let indiceFoto = 0;
    function moverGaleria3D() {
      fotos3D.forEach((foto, i) => {
        const posicion = (i - indiceFoto + fotos3D.length) % fotos3D.length;
        const angulo = posicion * 72;
        foto.style.transform =
          `translate(-50%,-50%) rotateY(${angulo}deg) translateZ(245px)`;
        foto.style.opacity = posicion === 0 ? "1" : "0.72";
        foto.style.filter = posicion === 0 ? "none" : "brightness(.72)";
        foto.style.zIndex = posicion === 0 ? "5" : String(5 - Math.min(posicion, 5 - posicion));
      });
      indiceFoto = (indiceFoto + 1) % fotos3D.length;
    }
    moverGaleria3D();
    setInterval(moverGaleria3D, 2800);

    // Cambia la fecha y hora de la boda aquí.
    const fechaBoda = new Date("2027-02-13T17:00:00-06:00").getTime();

    function actualizarCuenta() {
      const ahora = Date.now();
      const diferencia = fechaBoda - ahora;
      const ids = ["dias", "horas", "minutos", "segundos"];

      if (diferencia <= 0) {
        ids.forEach(id => document.getElementById(id).textContent = "00");
        return;
      }

      const valores = [
        Math.floor(diferencia / (1000 * 60 * 60 * 24)),
        Math.floor((diferencia / (1000 * 60 * 60)) % 24),
        Math.floor((diferencia / (1000 * 60)) % 60),
        Math.floor((diferencia / 1000) % 60)
      ];

      ids.forEach((id, i) => {
        document.getElementById(id).textContent =
          String(valores[i]).padStart(2, "0");
      });
    }

    actualizarCuenta();
    setInterval(actualizarCuenta, 1000);

    // Libro de mensajes: los mensajes se guardan en este navegador.
    const formMensajes = document.getElementById("formMensajes");
    const contenedorMensajes = document.getElementById("mensajesPublicados");
    const claveMensajes = "mensajesBodaValentinaMateo";

    function mostrarMensajes() {
      const mensajes = JSON.parse(localStorage.getItem(claveMensajes) || "[]");
      contenedorMensajes.querySelectorAll(".mensaje-publicado").forEach(el => el.remove());
      const aviso = document.getElementById("sinMensajes");
      aviso.style.display = mensajes.length ? "none" : "block";

      mensajes.slice().reverse().forEach(item => {
        const tarjeta = document.createElement("article");
        tarjeta.className = "mensaje-publicado";
        tarjeta.style.cssText = "padding:18px 20px;margin:12px 0;background:#fffdf9;border:1px solid #ded6ca;box-shadow:0 4px 14px #4a403311;";
        const nombre = document.createElement("strong");
        nombre.style.cssText = "display:block;color:#8c754e;font-size:17px;font-weight:400;margin-bottom:8px;";
        nombre.textContent = item.nombre;
        const texto = document.createElement("p");
        texto.style.cssText = "margin:0;color:#514b43;line-height:1.7;white-space:pre-wrap;";
        texto.textContent = item.mensaje;
        tarjeta.append(nombre, texto);
        contenedorMensajes.appendChild(tarjeta);
      });
    }

    formMensajes.addEventListener("submit", function(event) {
      event.preventDefault();
      const nombre = document.getElementById("nombreMensaje").value.trim();
      const mensaje = document.getElementById("textoMensaje").value.trim();
      if (!nombre || !mensaje) return;

      const mensajes = JSON.parse(localStorage.getItem(claveMensajes) || "[]");
      mensajes.push({ nombre, mensaje });
      localStorage.setItem(claveMensajes, JSON.stringify(mensajes));
      formMensajes.reset();
      mostrarMensajes();
    });

    mostrarMensajes();
