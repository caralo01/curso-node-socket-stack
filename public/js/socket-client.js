const socket = io();

const lblOnline = document.querySelector("#lbl-online");
const lblOffline = document.querySelector("#lbl-offline");
const txtMessage = document.querySelector("#txtMessage");
const btnSend = document.querySelector("#btnSend");

socket.on("connect", () => {
  console.log("Conectado");
  lblOffline.style.display = "none";
  lblOnline.style.display = "";
});

socket.on("disconnect", () => {
  console.log("Desconectado");
  lblOnline.style.display = "none";
  lblOffline.style.display = "";
});

socket.on("send-message", (payload) => {
  console.log("payload", payload);
});

btnSend.addEventListener("click", () => {
  const message = txtMessage.value;
  socket.emit(
    "send-message",
    {
      message,
      id: "1234ABCD",
      dae: new Date().getTime(),
    },
    (id) => {
      console.log("id", id);
    }
  );
});
