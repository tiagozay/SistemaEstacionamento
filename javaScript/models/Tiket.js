export class Tiket {
    constructor(veiculo, status, formaDePagamento = null) {
        this.veiculo = veiculo;
        if (!formaDePagamento || status == "Em aberto") {
            this._formaDePagamento = "Em aberto";
        }
        else {
            this.formaDePagamento = formaDePagamento;
        }
        this.status = status;
    }
    set formaDePagamento(formaDePagamento) {
        if (!formaDePagamento.ativa) {
            throw new Error("Forma de pagamento intativa");
        }
        this._formaDePagamento = formaDePagamento;
    }
}
//# sourceMappingURL=Tiket.js.map