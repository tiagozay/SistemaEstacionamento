export function $(selector) {
    return document.querySelector(selector);
}
export function $all(selector) {
    return document.querySelectorAll(selector);
}
export function elementosComAlturasIguais(elementoPrincipal, ...elementos) {
    const alturaDoElementoPrincipal = elementoPrincipal.clientHeight;
    elementos.forEach(elemento => elemento.style.height = alturaDoElementoPrincipal + "px");
}
export function createDomElement(element, id, innerHTML, ...classes) {
    const elemento = document.createElement(element);
    if (id) {
        elemento.id = id;
    }
    if (innerHTML) {
        elemento.innerHTML = innerHTML;
    }
    elemento.classList.add(...classes);
    return elemento;
}
export function formata_cpf(cpf) {
    cpf = cpf.trim();
    let digitos1 = cpf.substr(0, 3);
    let digitos2 = cpf.substr(3, 3);
    let digitos3 = cpf.substr(6, 3);
    let verificadores = cpf.substr(9, 2);
    return digitos1 + "." + digitos2 + "." + digitos3 + "-" + verificadores;
}
export function remove_mascara_cpf(cpf) {
    const arr_cpf = cpf.split('');
    const cpf_sem_mascara = arr_cpf.filter((caractere) => {
        if (caractere != '.' && caractere != '-') {
            return caractere;
        }
    });
    return cpf_sem_mascara.join('');
}
export function formata_data(data) {
    let somente_data = data.split(" ")[0];
    const arrData = somente_data.split("-");
    arrData.reverse();
    somente_data = arrData.join("-");
    data = `${somente_data} ${data.split(" ")[1]}`;
    data = data.replace('-', '/');
    data = data.replace('-', '/');
    return data.substr(0, data.length - 3);
}
export function formata_data_sem_horario(string) {
    let somente_data = string.split(" ")[0];
    const arrData = somente_data.split("-");
    arrData.reverse();
    somente_data = arrData.join("-");
    string = somente_data;
    string = string.replace('-', '/');
    string = string.replace('-', '/');
    return string;
}
export function formata_telefone(telefone) {
    let ddd = telefone.substring(0, 2);
    let primeiros5digitos = telefone.substring(2, 7);
    let ultimos4digitos = telefone.substring(7);
    return `(${ddd}) ${primeiros5digitos}-${ultimos4digitos}`;
}
export function remove_formatacao_telefone(telefone) {
    return telefone.replace(/[()\s-]/g, '');
}
