import {$, $all} from './lib/funcoesUtilitarias.js';

export function configuraPaginacao()
{
    const btnsDeTrocarDePaginaMenu = $all('.btnTrocarDePaginaMenu');
    btnsDeTrocarDePaginaMenu.forEach( btn => btn.addEventListener('click', event => {
       
        let target = event.target as HTMLElement;
    
        if(target.classList.contains('material-icons')){
            target = target.parentNode as HTMLElement;
        }
    
        trocarDePagina(target.dataset.pagina as string);
    
    } ) );
    
    const btnTrocarDePagina = $all(".btnTrocarDePagina");
    btnTrocarDePagina.forEach( btn => btn.addEventListener('click', event => {
    
        let target = event.target as HTMLElement;
    
        if(target.classList.contains('material-icons')){
            target = target.parentNode as HTMLElement;
        }
    
        trocarDePagina(target.dataset.pagina as string);
    
    }) );
}

const paginas = [
    {idPagina: 'home', paginaMae: null},
    {idPagina: 'estacionamento', paginaMae: null},
    {idPagina: 'mensalistas', paginaMae: null},
    {idPagina: 'mensalidades', paginaMae: null},
    {idPagina: 'precificacoes', paginaMae: null},
    {idPagina: 'formas_de_pagamento', paginaMae: null},
    {idPagina: 'usuarios', paginaMae: null},
    {idPagina: 'sistema', paginaMae: null},
    {idPagina: 'formularioAdcNovoTiket', paginaMae: 'estacionamento'},
];


function trocarDePagina(idPagina: string)
{
    const paginaAtivada = $('.pagina-ativada') as HTMLElement;

    paginaAtivada.classList.remove('pagina-ativada');
    paginaAtivada.classList.add('pagina-desativada');

    const pagina = $(`#${idPagina}`) as HTMLElement;

    pagina.classList.remove("pagina-desativada");
    pagina.classList.add('pagina-ativada'); 

    ativaBtnMenuDeAcordoComPagina(idPagina);
}

function ativaBtnMenuDeAcordoComPagina(idPaginaAtivada: string)
{
    //Verifica se a página selecionada tem uma mãe, se ela tiver é sinal que o botão que chamou ela não é do menu lateral, assim não é nescessário adicionar uma classe de estilo à ele.
    const pagBuscada = paginas.find( pagina => pagina.idPagina == idPaginaAtivada )
    if(pagBuscada && pagBuscada.paginaMae){
        return;
    }

    const btnAtivado = $('.opcaoMenuSelecionado') as HTMLElement;

    btnAtivado.classList.remove('opcaoMenuSelecionado');

    const btnMenu = $(`[data-pagina=${idPaginaAtivada}]`) as HTMLElement;

    btnMenu.classList.add("opcaoMenuSelecionado");
}