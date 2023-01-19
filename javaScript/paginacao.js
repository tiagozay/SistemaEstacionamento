import { $, $all } from './lib/funcoesUtilitarias.js';
const paginas = [
    { idPagina: 'home', paginaMae: null },
    { idPagina: 'estacionamento', paginaMae: null },
    { idPagina: 'mensalistas', paginaMae: null },
    { idPagina: 'mensalidades', paginaMae: null },
    { idPagina: 'precificacoes', paginaMae: null },
    { idPagina: 'formas_de_pagamento', paginaMae: null },
    { idPagina: 'usuarios', paginaMae: null },
    { idPagina: 'formularioConfigSistema', paginaMae: null },
    { idPagina: 'formularioAdcNovoTiket', paginaMae: 'estacionamento' },
    { idPagina: 'formAdicionarMensalista', paginaMae: 'mensalistas' },
    { idPagina: 'formularioCadastroNovaMensalidade', paginaMae: 'mensalidades' },
    { idPagina: 'formularioCadastroNovaPrecificacao', paginaMae: 'precificacoes' },
    { idPagina: 'formCadastrarFormaDePagamento', paginaMae: 'formas_de_pagamento' },
    { idPagina: 'formularioAdicionarNovoUsuario', paginaMae: 'usuarios' },
];
export class Paginacao {
    constructor() {
        this.paginaAtivada = $(".pagina-ativada");
        this.btnAtivado = $(".opcaoMenuSelecionado");
        this.events = [];
        const btnsDeTrocarDePaginaMenu = $all('.btnTrocarDePaginaMenu');
        btnsDeTrocarDePaginaMenu.forEach(btn => btn.addEventListener('click', event => {
            let target = event.target;
            if (target.classList.contains('material-icons')) {
                target = target.parentNode;
            }
            this.trocarDePagina(target.dataset.pagina);
        }));
        document.addEventListener('click', (event) => {
            let alvo = event.target;
            if (alvo.classList.contains('btnTrocarDePagina')) {
                if (alvo.classList.contains('material-icons')) {
                    alvo = alvo.parentNode;
                }
                this.trocarDePagina(alvo.dataset.pagina);
            }
        });
    }
    trocarDePagina(idPagina) {
        if (this.paginaAtivada) {
            this.paginaAtivada.classList.remove('pagina-ativada');
            this.paginaAtivada.classList.add('pagina-desativada');
        }
        const pagina = $(`#${idPagina}`);
        pagina.classList.remove("pagina-desativada");
        pagina.classList.add('pagina-ativada');
        this.paginaAtivada = pagina;
        this.ativaBtnMenuDeAcordoComPagina(idPagina);
        const eventChangePage = this.events.find(event => event.pageId == idPagina);
        if (eventChangePage === null || eventChangePage === void 0 ? void 0 : eventChangePage.callBack) {
            eventChangePage.callBack();
        }
    }
    ativaBtnMenuDeAcordoComPagina(idPaginaAtivada) {
        //Verifica se a página selecionada tem uma mãe, se ela tiver é sinal que o botão que chamou ela não é do menu lateral, assim não é nescessário adicionar uma classe de estilo à ele.
        const pagBuscada = paginas.find(pagina => pagina.idPagina == idPaginaAtivada);
        if (pagBuscada && pagBuscada.paginaMae) {
            return;
        }
        if (this.btnAtivado) {
            this.btnAtivado.classList.remove('opcaoMenuSelecionado');
        }
        const btnMenu = $(`[data-pagina=${idPaginaAtivada}]`);
        btnMenu.classList.add("opcaoMenuSelecionado");
        this.btnAtivado = btnMenu;
    }
    addEventToPage(pageId, callBack) {
        this.events.push({ pageId: pageId, callBack: callBack });
    }
}
//# sourceMappingURL=paginacao.js.map