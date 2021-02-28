/**
 * Autor: Arroyo Chávez Brayan Alberto
 * Fecha: February 22, 2021
 */

/**
 * + Se importa la libreria cheerio y axios
 * + La libreria cheerio se utiliza para recolectar la información de la página destino
 * + La libreria axios nos permite acceder a la página destino
 * + ./connection para importar la conexion a la base de datos
 */
const cheerio = require('cheerio');
const axios = require('axios');
const date = require('date-and-time');
const connection = require('./connection')

async function init(){
    /**
     * + En la constante html se guarda la página destino y la constante $ se guarda la página extraida 
     * convertida en un objetivo de cheerio.
     * + Se utiliza el await ya que es una operación que podria requerir de mucho tiempo y es necesario que 
     * se concluya con la ejecución de estas dos operaciones antes de poder continuar.
     */
    const html = await axios.get('https://mx.investing.com/crypto/');
    const $ = await cheerio.load(html.data);

    /**
     * + Extracción de la información de interes de la página para el caso en especifico de esta página la 
     * información se encontraba dentro de los registros del cuerpo de una tabla.
     * + Esto nos trae todo el codigo html de la tabla que se encuentra en la página.
     * + Para este caso se extrajeron tres valores en especifico name, symb y price son los nombres de las 
     * clases que contienen la información deseada, se hace uso de la función text para traer unicamente el
     * texto encontrada en la etiqueta de la clase.
     */
    const now = new Date();
    var datetime = date.format(now, 'YYYY-MM-DD HH:mm:ss'); 
    $('tbody tr').each((i,el) =>{
    var name = $(el).find('.name').text();
    var symb = $(el).find('.symb').text();
    var price = $(el).find('.price').text();
    var sql = "INSERT INTO criptomonedas (name, symb, price, date) VALUES ('"+name+"', '"+symb+"','"+price+"','"+datetime+"')";
    connection.con.query(sql, function (err, result) {
        if (err) throw err;
    });
    });
}


init();
