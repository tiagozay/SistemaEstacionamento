export class Tiket {
    constructor(id, veiculo, dataEntrada, dataSaida, valorPorHora, status, formaDePagamento = null, numeroDaVaga) {
        this.id = null;
        this.id = id;
        this.veiculo = veiculo;
        this.valorPorHora = valorPorHora;
        this.dataDeEntrada = dataEntrada;
        this.formaDePagamento = formaDePagamento;
        this.status = status;
        if (dataSaida && status == "Pago") {
            this._dataDeSaida = dataSaida;
        }
        else if (this.status == "Em aberto") {
            this._dataDeSaida = new Date();
        }
        this.numeroDaVaga = numeroDaVaga;
    }
    set formaDePagamento(formaDePagamento) {
        if (formaDePagamento && !formaDePagamento.ativa) {
            throw new Error("Forma de pagamento intativa");
        }
        this._formaDePagamento = formaDePagamento;
    }
    get formaDePagamento() {
        return this._formaDePagamento;
    }
    get dataDeSaida() {
        return this._dataDeSaida;
    }
    fecharTiket(formaDePagamento) {
        if (this.status == "Pago") {
            console.warn("O tiket já foi pago.");
            return;
        }
        this.formaDePagamento = formaDePagamento;
        this._dataDeSaida = new Date();
    }
    get totalAPagar() {
        return this.tempoDecorrido * this.valorPorHora;
    }
    get tempoDecorrido() {
        if (this.status == "Em aberto") {
            this._dataDeSaida = new Date();
        }
        const diff = this._dataDeSaida.getTime() - this.dataDeEntrada.getTime();
        const totalMinutos = diff / 1000 / 60;
        const horas = Math.trunc(totalMinutos / 60);
        const minutos = totalMinutos % 60;
        return Number(`${horas}.${minutos}`);
    }
}
//# sourceMappingURL=Tiket.js.map