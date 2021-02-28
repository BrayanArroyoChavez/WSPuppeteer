/**
 * Autor: Arroyo Chávez Brayan Alberto
 * Fecha: February 22, 2021
 */
const db = require('./db')

async function main() {
    const body = document.getElementById("email");
    const cripto = await db.getCripto();
    cripto.forEach(element => {
        const card = document.createElement("div");
        card.className = "card";

        const cardBody = document.createElement("div");
        cardBody.className = "card-body";

        const cardTitle = document.createElement("h5");
        cardTitle.className = "card-title";
        cardTitle.innerHTML = "<b>" + element.name + "</b>";

        const cardSub = document.createElement("h6");
        cardSub.className = "card-subtitle mb-2 text-muted";
        cardSub.innerHTML = element.symb;

        const cardtext = document.createElement("p");
        cardtext.className = "card-text"
        cardtext.innerHTML = element.price;

        cardBody.appendChild(cardTitle)
        cardBody.appendChild(cardSub)
        cardBody.appendChild(cardtext)
        card.appendChild(cardBody);

        body.appendChild(card)
        console.log("hola")
    });
}

main();
