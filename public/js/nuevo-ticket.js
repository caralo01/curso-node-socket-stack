const socket = io();

const btnGenerate = document.querySelector("#btnGenerate");
const lblNewTicket = document.querySelector("#lblNewTicket");

socket.on("connect", () => {
  btnGenerate.disabled = false;
});

socket.on("disconnect", () => {
  btnGenerate.disabled = true;
});

socket.on("last-ticket", (data) => {
  lblNewTicket.innerText = `Ticket ${data}`;
});

btnGenerate.addEventListener("click", () => {
  socket.emit("next-ticket", null, (ticket) => {
    lblNewTicket.innerText = ticket;
  });
});
