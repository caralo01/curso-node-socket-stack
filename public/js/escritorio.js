const searchParams = new URLSearchParams(window.location.search);

const lblDesk = document.querySelector("h1");
const btnAttend = document.querySelector("button");
const lblTicket = document.querySelector("small");
const divAlert = document.querySelector(".alert");
const lblPending = document.querySelector("#lblPending");

if (!searchParams.has("desktop")) {
  window.location = "index.html";
  throw Error("The param desktop is required");
} else {
  const socket = io();

  const desktop = searchParams.get("desktop");
  lblDesk.innerText = desktop;

  divAlert.style.display = "none";

  socket.on("connect", () => {
    btnAttend.disabled = false;
  });

  socket.on("disconnect", () => {
    btnAttend.disabled = true;
  });

  socket.on("tickets-pending", (pending) => {
    if (pending === 0) {
      lblPending.style.display = "none";
    } else {
      lblPending.innerText = pending;
      lblPending.style.display = "";
    }
  });

  btnAttend.addEventListener("click", () => {
    socket.emit("attend-ticket", { desktop }, ({ ok, ticket, msg }) => {
      if (!ok) {
        lblTicket.innerText = "Nadie.";
        return (divAlert.style.display = "");
      }

      lblTicket.innerText = "Ticket " + ticket.number;
    });
  });
}
