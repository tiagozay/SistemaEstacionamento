export class Precificacao {
    constructor(categoria, valorHora, valorMensalidade, ativa, numeroDeVagas) {
        this.categoria = categoria;
        this.valorHora = valorHora;
        this.valorMensalidade = valorMensalidade;
        this.ativa = ativa;
        this.numeroDeVagas = numeroDeVagas;
    }
    set categoria(categoria) {
        if (categoria.trim().length == 0) {
            throw new Error("Categoria inválida.");
        }
        this._categoria = categoria;
    }
    get categoria() {
        return this._categoria;
    }
}
//# sourceMappingURL=Precificacao.js.map