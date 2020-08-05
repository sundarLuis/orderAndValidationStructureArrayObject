/* 
   1 agrupar y ordenar por lenguaje y edition si es que es el mismo author
   2 solo a ese data necesitamos validar su estado (ACTIVO y NO ACTIVO) y guardar ese estado
    en mayúscula si no tiene por defecto agregar (NO ACTIVO).
*/
const bookController = require('./controllers/bookController')
console.log(bookController())