import { $, $all, elementosComAlturasIguais } from './lib/funcoesUtilitarias.js';
import { listarMensalistas } from './listagemMensalistas.js';
import { listarTikets } from './listagemTikets.js';
import { listarMensalidades } from './listagemMensalidades.js';
import { listarPrecificacoes } from './listagemPrecificacoes.js';
import { listarFormasDePagamento } from './listagemFormasDePagamento.js';
import { listarUsuarios } from './listagemUsuarios.js';
elementosComAlturasIguais($("#header"), $("#headerMenu"));
const btnsDeTrocarDePaginaMenu = $all('.btnTrocarDePaginaMenu');
btnsDeTrocarDePaginaMenu.forEach(btn => btn.addEventListener('click', trocarDePaginaMenu));
const btnTrocarDePagina = $all(".btnTrocarDePagina");
btnTrocarDePagina.forEach(btn => btn.addEventListener('click', (event) => {
    let target = event.target;
    if (target.classList.contains('material-icons')) {
        target = target.parentNode;
    }
    mudarParaAPagina(target.dataset.pagina);
}));
function trocarDePaginaMenu(event) {
    const btnAtivado = $('.opcaoMenuSelecionado');
    btnAtivado.classList.remove('opcaoMenuSelecionado');
    let target = event.target;
    if (target.classList.contains('material-icons')) {
        target = target.parentNode;
    }
    target.classList.add("opcaoMenuSelecionado");
    mudarParaAPagina(target.dataset.pagina);
}
function mudarParaAPagina(idPagina) {
    const paginaAtivada = $('.pagina-ativada');
    paginaAtivada.classList.remove('pagina-ativada');
    paginaAtivada.classList.add('pagina-desativada');
    const pagina = $(`#${idPagina}`);
    pagina.classList.remove("pagina-desativada");
    pagina.classList.add('pagina-ativada');
}
listarTikets();
listarMensalistas();
listarMensalidades();
listarPrecificacoes();
listarFormasDePagamento();
listarUsuarios();
//# sourceMappingURL=app.js.map