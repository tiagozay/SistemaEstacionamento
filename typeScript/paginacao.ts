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
    
    document.addEventListener('click', (event: Event) => {
        let alvo = event.target as HTMLElement;

        if(alvo.classList.contains('btnTrocarDePagina')){
    
            if(alvo.classList.contains('material-icons')){
                alvo = alvo.parentNode as HTMLElement;
            }
        
            trocarDePagina(alvo.dataset.pagina as string);
        }

    });
}

const paginas = [
    {idPagina: 'home', paginaMae: null},
    {idPagina: 'estacionamento', paginaMae: null},
    {idPagina: 'mensalistas', paginaMae: null},
    {idPagina: 'mensalidades', paginaMae: null},
    {idPagina: 'precificacoes', paginaMae: null},
    {idPagina: 'formas_de_pagamento', paginaMae: null},
    {idPagina: 'usuarios', paginaMae: null},
    {idPagina: 'formularioConfigSistema', paginaMae: null},
    {idPagina: 'formularioAdcNovoTiket', paginaMae: 'estacionamento'},
    {idPagina: 'formAdicionarMensalista', paginaMae: 'mensalistas'},
    {idPagina: 'formularioCadastroNovaMensalidade', paginaMae: 'mensalidades'},
    {idPagina: 'formularioCadastroNovaPrecificacao', paginaMae: 'precificacoes'},
    {idPagina: 'formCadastrarFormaDePagamento', paginaMae: 'formas_de_pagamento'},
    {idPagina: 'formularioAdicionarNovoUsuario', paginaMae: 'usuarios'},
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

    const btnAtivado = $('.opcaoMenuSelecionado');

    if(btnAtivado){
        btnAtivado.classList.remove('opcaoMenuSelecionado');
    }
 
    const btnMenu = $(`[data-pagina=${idPaginaAtivada}]`) as HTMLElement;

    btnMenu.classList.add("opcaoMenuSelecionado");
}