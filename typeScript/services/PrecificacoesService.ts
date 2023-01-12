import { Precificacao } from "../models/Precificacao.js";

export abstract class PrecificacoesService
{
    static buscaPrecificacaoDeCategoria(categoria: string): Precificacao | undefined
    {
        const precificacoes = [
            new Precificacao('Carro', 15, 150, 'ativa', 36),
            new Precificacao('Moto', 10, 120, 'ativa', 27),
        ];

        return precificacoes.find( precificacao => precificacao.categoria == categoria );
    }
}