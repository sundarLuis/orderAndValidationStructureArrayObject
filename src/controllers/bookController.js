/*Imports*/
const _ = require('lodash')
let books = require('../Data/book')
let funtionsGlobal = require('../helper')

const validatingeAndChangeTheStatus = status => {
    let statusUpperCase = funtionsGlobal.convertUpperCase(status)
    let reponseValidateStatus = funtionsGlobal.validateStatus(statusUpperCase)
    if (reponseValidateStatus)
        return  statusUpperCase
    else
        return funtionsGlobal.INACTIVE
}
const validatingByEdition = (book) => {
    let result = {}
    result.status = false
    let edition = funtionsGlobal.convertLowerCase(book.edition)
    switch (edition) {
        case "primera":
            result.status = true
            result.data = { ...book, ...{ editionNumber: 1 } }
            break;
        case "segunda":
            result.status = true
            result.data = { ...book, ...{ editionNumber: 2 } }
            break;
        case "tercera":
            result.status = true
            result.data = { ...book, ...{ editionNumber: 3 } }
            break;
        default:
            result.data = book
            break;
    }
    return result
}
const addingEditionNumber = (book) => {
    let result = {}
    result.status = 400
    book.status = validatingeAndChangeTheStatus(book.status)
    let response = validatingByEdition(book)
    if (response.status) {
        result.status = 200
        result.data = response.data
    }
    return result
}
function OrderByLenguajeAndEdition(){
    /**
     * resultBookOrderByLenguajeAndEdition: resultado final
     * bookWithNumberEdition: validamos el estado y añadimos el numero de edicion
     * booksGroupedByAuthor: agrupados en un array de objetos como key Autor
     */
    let resultBookOrderByLenguajeAndEdition = []
    const bookWithNumberEdition = _.map(books, book => {
        let responseAddingEditionNumber = addingEditionNumber(book)
        if (responseAddingEditionNumber.status === 200)
            return responseAddingEditionNumber.data
    })
    let booksGroupedByAuthor = _.groupBy(bookWithNumberEdition, (book) => book.author);

        /** _.mapValues recorrer por (valor, clave, objeto)
         *  valueGroupByAuthor: es el grupo por autor
         * orderBy:luego se ordena a ese grupo de autor por numero de edicion
        */
        let booksGroupedByAuthorAndSortedByIssueNumber = _.mapValues(booksGroupedByAuthor, function (valueGroupByAuthor) {
            return _.orderBy(valueGroupByAuthor, (book) => book.editionNumber)       
        });
        /**
         * for in es para recorrer objetos, luego a cada objecto que seria el grupo de autor
         * ordenador correctamente, se recorre por su objeto que es keyAuthor y se le agrega
         * a nuestro array final
         *  */    
        for (let keyAuthor in booksGroupedByAuthorAndSortedByIssueNumber) {
            _.map(booksGroupedByAuthorAndSortedByIssueNumber[keyAuthor], (valueSortedByIssueNumber) => resultBookOrderByLenguajeAndEdition.push(valueSortedByIssueNumber))
        }
    return resultBookOrderByLenguajeAndEdition
}

module.exports = OrderByLenguajeAndEdition
