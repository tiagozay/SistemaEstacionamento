export function $(selector: string): HTMLElement | null
{
    return document.querySelector(selector);
}

export function $all(selector: string): NodeListOf<Element>
{
    return document.querySelectorAll(selector);
}


export function elementosComAlturasIguais(elementoPrincipal: HTMLElement, ...elementos: HTMLElement[])
{   
    const alturaDoElementoPrincipal = elementoPrincipal.clientHeight;

    elementos.forEach(elemento => elemento.style.height = alturaDoElementoPrincipal+"px")
}

export function createDomElement(element: string, id: string | null, innerHTML: string | null, ...classes: string[]): HTMLElement
{
    const elemento = document.createElement(element);

    if(id){
        elemento.id = id;
    }

    if(innerHTML){
        elemento.innerHTML = innerHTML;
    }
    
    elemento.classList.add(...classes);

    return elemento;

}

export function formata_cpf(cpf: string): string
{
    cpf = cpf.trim();
    let digitos1 = cpf.substr(0, 3);
    let digitos2 = cpf.substr(3, 3);
    let digitos3 = cpf.substr(6, 3);
    let verificadores = cpf.substr(9, 2);

    return digitos1+"."+digitos2+"."+digitos3+"-"+verificadores;
}

export function remove_mascara_cpf(cpf: string): string
{
    const arr_cpf = cpf.split('');

    const cpf_sem_mascara = arr_cpf.filter((caractere)=>{
        if(caractere != '.' && caractere != '-'){
            return caractere;
        }
    });

    return cpf_sem_mascara.join('');

}

export function formata_data(data: string): string
{
    let somente_data = data.split(" ")[0];

    const arrData = somente_data.split("-");

    arrData.reverse();

    somente_data = arrData.join("-");

    data = `${somente_data} ${data.split(" ")[1]}`;

    data = data.replace('-', '/');
    data = data.replace('-', '/');
    return data.substr(0, data.length -3);
}

export function formata_data_sem_horario(string: string): string
{
    let somente_data = string.split(" ")[0];

    const arrData = somente_data.split("-");

    arrData.reverse();

    somente_data = arrData.join("-");

    string = somente_data;

    string = string.replace('-', '/');
    string = string.replace('-', '/');
    return string;
}