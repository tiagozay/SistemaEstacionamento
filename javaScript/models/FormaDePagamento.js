export class FormaDePagamento {
    constructor(nomeFormaDePagamento, ativa = true) {
        this.nomeFormaDePagamento = nomeFormaDePagamento;
        this.ativa = ativa;
    }
    set nomeFormaDePagamento(nomeFormaDePagamento) {
        if (nomeFormaDePagamento.trim().length == 0) {
            throw new Error("Nome para a forma de pagamento inválido.");
        }
        this._nomeFormaDePagamento = nomeFormaDePagamento;
    }
}
//# sourceMappingURL=FormaDePagamento.js.map