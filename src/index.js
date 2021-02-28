/**
 * Autor: Arroyo Chávez Brayan Alberto
 * Fecha: February 22, 2021
 */
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
const puppeteer = require('puppeteer');

async function init(){
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    await page.goto('http://amazon.com.mx');
    
    await page.type('#twotabsearchtextbox','juegos nintendo switch');
    await page.click('#nav-search-submit-button')
    await page.waitForSelector('[data-component-type=s-search-result]')

    await page.waitForTimeout({timeout: 2000});
    await page.screenshot({ path: 'amazon.jpg'});

    const enlaces = await page.evaluate(() => {
        const elements = document.querySelectorAll('[data-component-type=s-search-result] h2 a');
        const enlaces = [];
        for (let element of elements){
            enlaces.push(element.href);
        }
        return enlaces;
    });

    result = [];
    for (let enlace of enlaces){
        await page.goto(enlace);
        await page.waitForSelector('#productTitle');

        const res = await page.evaluate(() => {
            const res = {};
            res.title = document.querySelector('#productTitle').innerText;
            return res;
        });
        result.push(res);
    }

    console.log(result)

    await browser.close();
}


init();
