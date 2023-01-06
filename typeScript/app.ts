import {$, $all, createDomElement, elementosComAlturasIguais} from './lib/funcoesUtilitarias.js';
import { listarMensalistas } from './listagemMensalistas.js';
import { listarTikets } from './listagemTikets.js';
import { listarMensalidades } from './listagemMensalidades.js';
import { listarPrecificacoes } from './listagemPrecificacoes.js';
import { listarFormasDePagamento } from './listagemFormasDePagamento.js';
import { listarUsuarios } from './listagemUsuarios.js';


elementosComAlturasIguais($("#header") as HTMLElement, $("#headerMenu") as HTMLElement);

const btnsDeTrocarDePaginaMenu = $all('.btnTrocarDePaginaMenu');
btnsDeTrocarDePaginaMenu.forEach( btn => btn.addEventListener('click', trocarDePaginaMenu) );

const btnTrocarDePagina = $all(".btnTrocarDePagina");
btnTrocarDePagina.forEach( btn => btn.addEventListener('click', (event) => {

    let target = event.target as HTMLElement;

    if(target.classList.contains('material-icons')){
        target = target.parentNode as HTMLElement;
    }

    mudarParaAPagina(target.dataset.pagina as string);

}) );


function trocarDePaginaMenu(event: Event)
{
    const btnAtivado = $('.opcaoMenuSelecionado') as HTMLElement;

    btnAtivado.classList.remove('opcaoMenuSelecionado');

    let target = event.target as HTMLElement; 

    if(target.classList.contains('material-icons')){
        target = target.parentNode as HTMLElement;
    }

    target.classList.add("opcaoMenuSelecionado");

    mudarParaAPagina(target.dataset.pagina as string);

}

function mudarParaAPagina(idPagina: string)
{
    const paginaAtivada = $('.pagina-ativada') as HTMLElement;

    paginaAtivada.classList.remove('pagina-ativada');
    paginaAtivada.classList.add('pagina-desativada');

    const pagina = $(`#${idPagina}`) as HTMLElement;

    pagina.classList.remove("pagina-desativada");
    pagina.classList.add('pagina-ativada');
}

listarTikets();
listarMensalistas();
listarMensalidades();
listarPrecificacoes();
listarFormasDePagamento();
listarUsuarios();