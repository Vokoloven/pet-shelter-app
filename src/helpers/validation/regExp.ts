const nameRegExp = /^[a-zA-Zа-яА-Я-а-щА-ЩЬьЮюЯяЇїІіЄєҐґ]+$/
const descriptionRexExp = /^[a-zA-Zа-яА-Я-а-щА-ЩЬьЮюЯяЇїІіЄєҐґ]/im
const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

const regExp = {
    nameRegExp,
    descriptionRexExp,
    emailRegExp,
}

export default regExp
