import {$, $all, createDomElement, elementosComAlturasIguais} from './lib/funcoesUtilitarias.js';
import { listarMensalistas } from './listagemMensalistas.js';
import { listarTikets } from './listagemTikets.js';
import { listarMensalidades } from './listagemMensalidades.js';
import { listarPrecificacoes } from './listagemPrecificacoes.js';
import { listarFormasDePagamento } from './listagemFormasDePagamento.js';


elementosComAlturasIguais($("#header") as HTMLElement, $("#headerMenu") as HTMLElement);

const btnsDeTrocarDePagina = $all('.opcaoMenu');
btnsDeTrocarDePagina.forEach( btn => btn.addEventListener('click', trocarDePagina) );

function trocarDePagina(event: Event)
{
    const paginaAtivada = $('.pagina-ativada') as HTMLElement;
    const btnAtivado = $('.opcaoMenuSelecionado') as HTMLElement;

    paginaAtivada.classList.remove('pagina-ativada');
    paginaAtivada.classList.add('pagina-desativada');

    btnAtivado.classList.remove('opcaoMenuSelecionado');

    let target = event.target as HTMLElement; 

    if(target.classList.contains('material-icons')){
        target = target.parentNode as HTMLElement;
    }

    const pagina = $(`#${target.dataset.pagina}`) as HTMLElement;

    target.classList.add("opcaoMenuSelecionado");

    pagina.classList.remove("pagina-desativada");
    pagina.classList.add('pagina-ativada');
}

listarTikets();
listarMensalistas();
listarMensalidades();
listarPrecificacoes();
listarFormasDePagamento();