/**
 * Autor: Arroyo Chávez Brayan Alberto
 * Fecha: February 22, 2021
 */

const connection = require('./connection')
    const db = {};
    /**
     * Consulta a la base de datos para extraer el correo que sera usado como remitente
     */
    function getAuth() {
    return dbQuery("SELECT p.email, u.password FROM `persona` AS p JOIN `persona_usuario` AS pu ON p.id = pu.id_persona JOIN `usuario` AS u ON u.id = pu.id_usuario WHERE p.type = 'admin'");
    }
    /**
     * Consulta a la base de datos para extraer todos los correcos de contacto
     */
    function getContact() {
    return dbQuery("SELECT email FROM `persona` WHERE type = 'contacto'");
    }
    /**
     * Consulta a la base de datos para extraer todos los registros de criptomonedas
     */
    function getCripto() {
        return dbQuery("SELECT * FROM `criptomonedas`");
    }
    /**
     * Se creo una función que recibe como parametro las consultas de las bases de datos para ejecutarlas
     * y que a su vez también devuelve el resultado obtenido haciendo uso de las promesas
     */
    function dbQuery(databaseQuery) {
    return new Promise(data => {
        connection.con.query(databaseQuery, function (error, result) {
        if (error) throw error;
        try {
            data(result);
        } catch (error) {
            data({});
            throw error;
        }
        });
    });
    }

    db.getAuth = getAuth;
    db.getContact = getContact;
    db.getCripto = getCripto;
    db.dbQuery = dbQuery;

    module.exports = db;