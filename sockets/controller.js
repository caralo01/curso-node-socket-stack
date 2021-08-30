const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl();

const socketController = (socket) => {
  socket.emit("last-ticket", ticketControl.last);
  socket.emit("tickets-pending", ticketControl.tickets.length);
  socket.emit("last-tickets", ticketControl.lasts4);

  socket.on("next-ticket", (payload, callback) => {
    const next = ticketControl.next();
    callback(next);
    socket.broadcast.emit("tickets-pending", ticketControl.tickets.length);
  });

  socket.on("attend-ticket", ({ desktop }, callback) => {
    if (!desktop) {
      return callback({
        ok: false,
        msg: "Desktop is required",
      });
    }
    const ticket = ticketControl.attendTicket(desktop);

    socket.broadcast.emit("last-tickets", ticketControl.lasts4);
    socket.emit("tickets-pending", ticketControl.tickets.length);
    socket.broadcast.emit("tickets-pending", ticketControl.tickets.length);

    if (!ticket) {
      callback({
        ok: false,
        msg: "There are not tickets",
      });
    } else {
      callback({
        ok: true,
        ticket,
      });
    }
  });
};

module.exports = {
  socketController,
};
