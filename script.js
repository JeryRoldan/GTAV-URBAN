// ===============================
// CONFIGURACIÓN
// ===============================

// Cambia por tu número de WhatsApp en formato internacional
// Perú: 51 + número (sin + ni espacios)
const WHATSAPP_NUMBER = "51921584279";

// ===============================
// UTILIDADES
// ===============================
function encode(text) {
  return encodeURIComponent(text.trim());
}

// ===============================
// INICIALIZACIÓN
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const form = document.getElementById("formPostulacion");
  if (form) {
    form.addEventListener("submit", enviarWhatsApp);
  }
});

// ===============================
// AGREGAR USUARIO DE ROCKSTAR
// ===============================

function buscarRockstar() {
  const input = document.getElementById("rockstarUser");
  const msg = document.getElementById("rockstarMsg");
  const user = input.value.trim().toLowerCase();

  if (!user) {
    mostrarMensaje("Ingresa tu usuario de Rockstar.", "error");
    return;
  }

  let registrados = JSON.parse(localStorage.getItem("rockstarRegistrados")) || [];

  if (registrados.includes(user)) {
    mostrarMensaje("Este usuario ya está registrado.", "error");
    return;
  }

  registrados.push(user);
  localStorage.setItem("rockstarRegistrados", JSON.stringify(registrados));

  mostrarMensaje("Usuario registrado correctamente.", "success");

  // Abrir búsqueda Rockstar
  const url = `https://socialclub.rockstargames.com/search?query=${encodeURIComponent(user)}`;
  window.open(url, "_blank");

  input.value = "";
}

function mostrarMensaje(texto, tipo) {
  const msg = document.getElementById("rockstarMsg");
  msg.textContent = texto;
  msg.className = `rockstar-msg ${tipo}`;
}


// ===============================
// ENVÍO A WHATSAPP
// ===============================
function enviarWhatsApp(e) {
  e.preventDefault();

  const gtaName   = document.getElementById("gtaName").value;
  const realName = document.getElementById("realName").value;
  const social   = document.getElementById("socialFrom").value;
  const platform = document.getElementById("platform").value;
  const extraMsg = document.getElementById("extraMsg").value;

  // Validación básica
  if (!gtaName || !realName || !social || !platform) {
    alert("Por favor completa todos los campos obligatorios.");
    return;
  }

  // Mensaje WhatsApp
  let mensaje =
    `Hola, Urban Legacy Clan.%0A%0A` +
    `Nombre en GTA V: ${encode(gtaName)}%0A` +
    `Nombre real: ${encode(realName)}%0A` +
    `Red social: ${encode(social)}%0A` +
    `Plataforma: ${encode(platform)}%0A`;

  if (extraMsg.trim() !== "") {
    mensaje += `Mensaje adicional: ${encode(extraMsg)}%0A`;
  }

  mensaje += `%0AQuedo atento. Gracias.`;

  // URL compatible con Android / iOS / PC
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${mensaje}`;

  window.open(url, "_blank");
}
