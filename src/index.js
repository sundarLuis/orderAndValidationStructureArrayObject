/*Imports*/
const _ = require('lodash')
let {books,ACTIVE,INACTIVE} = require('./helper/consts')
/*Functions Globals*/
const validateStatus = (status) => status === ACTIVE || status === INACTIVE ? true : false
const addEditionNumber = (book) => {
    let result = {}
    result.status = 400
    let edition = _.lowerCase(book.edition)
    if(book.status){
        book.status =  validateStatus(_.upperCase(book.status)) ? _.upperCase(book.status) : INACTIVE
    }else{
        book.status = INACTIVE
    }
    switch (edition) {
        case "primera":
            result.status = 200
            result.data = { ...book, ...{ editionNumber: 1 } }
            break;
        case "segunda":
            result.status = 200
            result.data = { ...book, ...{ editionNumber: 2 } }
            break;
        case "tercera":
            result.status = 200
            result.data = { ...book, ...{ editionNumber: 3 } }
            break;
        default:
            result.data = book
            break;
    }
    return result
}
const booksModified_addEditionNumbe = _.map(books,book => {
    let addEditionNumber_ = addEditionNumber(book)
    if(addEditionNumber_.status === 200){
        return addEditionNumber_.data
    }
})
let booksModified_groupAuthor = _.groupBy(booksModified_addEditionNumbe, (book) => book.author);
let booksModified_groupAuthor_orderByEditionNumber = _.mapValues(booksModified_groupAuthor, function(value) { 
    return _.orderBy(value, (book) => book.editionNumber); 
});
let arrayFinish = []
for (const key in booksModified_groupAuthor_orderByEditionNumber) {
    _.map(booksModified_groupAuthor_orderByEditionNumber[key],(i) => arrayFinish.push(i) )
}
console.log(arrayFinish)
