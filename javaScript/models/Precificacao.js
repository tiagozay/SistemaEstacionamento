export class Precificacao {
    constructor(categoria, valorHora, valorMensalidade, status, numeroDeVagas) {
        if (status != 'ativa' && status != 'inativa') {
            throw new Error("Status inválido");
        }
        this.categoria = categoria;
        this.valorHora = valorHora;
        this.valorMensalidade = valorMensalidade;
        this.numeroDeVagas = numeroDeVagas;
    }
    set categoria(categoria) {
        if (categoria.trim().length == 0 || status.trim().length == 0) {
            throw new Error("Informações inválidas");
        }
    }
}
//# sourceMappingURL=Precificacao.js.map