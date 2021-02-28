"use strict";
/**
 * Autor: Arroyo Chávez Brayan Alberto
 * Fecha: February 22, 2021
 */

/**
 * + Se usa la libreria nodemailer para el envio de correo electronicos y nodemailer-express-handlebars para poder enviar archivos con contenido html, esto a través de un 
 * archivo con la extensión .handlebars.
 * + Se hace uso de path para trabajar rutas de archivos
 */
const nodemailer = require("nodemailer");
const path = require('path');
const db = require('./db')

async function main() {
  /**
   * Se hace uso del await para que el programa detenga su ejecución hasta que se obtengas los valores de las
   * variables login, contac, cripto y contentHTML
   */
  var login = await db.getAuth();
  var contact = await db.getContact();
  var from = ""
  contact.forEach(element => from = from.concat(',', element.email));
  from = from.substr(1);
  const cripto = await db.getCripto();
  console.log(cripto)
  var contentHTML = `<h1 class="title">Criptomonedas</h1>`;
  cripto.forEach(element => {
  contentHTML = contentHTML.concat(' ',`
  <div class="card" style="width: 18rem;">
		<div class="card-body">
			<h5 class="card-title">${element.name}</h5>
			<h6 class="card-subtitle mb-2 text-muted">${element.symb}</h6>
			<p class="card-text">${element.price}</p>
		</div>
  </div>
  `)
  });
  /**
   * crea un objeto transportador
   */
  let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: login[0].email,
    pass: login[0].password
  }
  });
  /**
   * envío del correo
   */
  let info = await transporter.sendMail({
  from: login[0].email,
  to: from,
  subject: 'Criptomonedas',
  html: contentHTML
  });

  console.log("Message sent: %s", info.messageId);
}

main().catch(console.error);