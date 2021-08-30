const path = require("path");
const fs = require("fs");

class Ticket {
  constructor(number, desktop) {
    this.number = number;
    this.desktop = desktop;
  }
}

class TicketControl {
  constructor() {
    this.last = 0;
    this.today = new Date().getDate(); // 11
    this.tickets = [];
    this.lasts4 = [];

    this.init();
  }

  get toJson() {
    return {
      last: this.last,
      today: this.today,
      tickets: this.tickets,
      lasts4: this.lasts4,
    };
  }

  init() {
    const { today, tickets, last, lasts4 } = require("../db/data.json");
    if (today === this.today) {
      this.tickets = tickets;
      this.last = last;
      this.lasts4 = lasts4;
    } else {
      // Es otro dia
      this.saveBD();
    }
  }

  saveBD() {
    const dbPath = path.join(__dirname, "../db/data.json");
    fs.writeFileSync(dbPath, JSON.stringify(this.toJson));
  }

  next() {
    this.last += 1;
    const ticket = new Ticket(this.last, null);
    this.tickets.push(ticket);

    this.saveBD();
    return "Ticket " + ticket.number;
  }

  attendTicket(desktop) {
    // No tenemos tickets
    if (this.tickets.length === 0) {
      return null;
    }

    const ticket = this.tickets.shift(); // this.tickets[0];
    ticket.desktop = desktop;

    this.lasts4.unshift(ticket);

    if (this.lasts4.length > 4) {
      this.lasts4.splice(-1, 1);
    }

    this.saveBD();

    return ticket;
  }
}

module.exports = TicketControl;
