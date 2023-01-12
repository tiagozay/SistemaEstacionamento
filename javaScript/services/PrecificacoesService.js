import { Precificacao } from "../models/Precificacao.js";
export class PrecificacoesService {
    static buscaPrecificacaoDeCategoria(categoria) {
        const precificacoes = [
            new Precificacao('Carro', 15, 150, 'ativa', 36),
            new Precificacao('Moto', 10, 120, 'ativa', 27),
        ];
        return precificacoes.find(precificacao => precificacao.categoria == categoria);
    }
}
//# sourceMappingURL=PrecificacoesService.js.map