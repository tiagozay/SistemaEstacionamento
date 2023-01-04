import { $, $all, elementosComAlturasIguais } from './lib/funcoesUtilitarias.js';
import { listarMensalistas } from './listagemMensalistas.js';
import { listarTikets } from './listagemTikets.js';
import { listarMensalidades } from './listagemMensalidades.js';
elementosComAlturasIguais($("#header"), $("#headerMenu"));
const btnsDeTrocarDePagina = $all('.opcaoMenu');
btnsDeTrocarDePagina.forEach(btn => btn.addEventListener('click', trocarDePagina));
function trocarDePagina(event) {
    const paginaAtivada = $('.pagina-ativada');
    const btnAtivado = $('.opcaoMenuSelecionado');
    paginaAtivada.classList.remove('pagina-ativada');
    paginaAtivada.classList.add('pagina-desativada');
    btnAtivado.classList.remove('opcaoMenuSelecionado');
    let target = event.target;
    if (target.classList.contains('material-icons')) {
        target = target.parentNode;
    }
    const pagina = $(`#${target.dataset.pagina}`);
    target.classList.add("opcaoMenuSelecionado");
    pagina.classList.remove("pagina-desativada");
    pagina.classList.add('pagina-ativada');
}
listarTikets();
listarMensalistas();
listarMensalidades();
