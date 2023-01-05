import { $, createDomElement } from "./lib/funcoesUtilitarias.js";
import { AcaoRegistro, CampoDosRegistros, ZayDataTable } from "./lib/ZayDataTable.js";
class Categoria {
    constructor(id, nome, valorDaHora, valorDaMensalidade, numeroDeVagas, ativa) {
        this.id = id;
        this.nome = nome;
        this.valorDaHora = valorDaHora;
        this.valorDaMensalidade = valorDaMensalidade;
        this.numeroDeVagas = numeroDeVagas;
        this.ativa = ativa;
    }
    formataParaEscita() {
        return {
            id: this.id,
            nome: this.nome,
            valorDaHora: this.valorDaHora.toLocaleString('pt-BR', { style: "currency", currency: "BRL" }),
            valorDaMensalidade: this.valorDaMensalidade.toLocaleString('pt-BR', { style: "currency", currency: "BRL" }),
            numeroDeVagas: this.numeroDeVagas,
            ativa: this.ativa ? "Sim" : "Não"
        };
    }
    static formataCategoriasParaListar(categorias) {
        return categorias.map(categoria => categoria.formataParaEscita());
    }
}
const categorias = [
    new Categoria('1', 'Carro', 15, 150, 33, true),
    new Categoria('2', 'Moto', 10, 120, 25, true),
];
const btnEditarPrecificacao = createDomElement("button", "btnEditarPrecificacao", 'edit', 'material-icons');
const btnExcluirPrecificacao = createDomElement("button", "btnExcluirPrecificacao", 'delete', 'material-icons');
const nomeTabela = 'listagemPrecificacoes';
export function listarPrecificacoes() {
    const dados = Categoria.formataCategoriasParaListar(categorias);
    const zayDataTable__precificacoes = new ZayDataTable(nomeTabela, $("#tabelaPrecificacoes"), [
        new CampoDosRegistros("Categoria", 'nome'),
        new CampoDosRegistros("Valor da hora", 'valorDaHora'),
        new CampoDosRegistros("Valor da mensalidade", 'valorDaMensalidade'),
        new CampoDosRegistros("Numero de vagas", 'numeroDeVagas'),
        new CampoDosRegistros("Ativa", 'ativa', (ativa) => {
            if (ativa == "Sim") {
                return `
                        <p class="p_textoAtivo">
                            <i class="material-icons">lock_open</i>
                            Sim
                        </p>
                    `;
            }
            else if (ativa == "Não") {
                return `
                        <p class="p_textoInativo">
                            <i class="material-icons">lock</i>
                            Não
                        </p>
                    
                    `;
            }
            return ativa;
        }),
    ], 'id', dados, [
        new AcaoRegistro(btnEditarPrecificacao, () => { }),
        new AcaoRegistro(btnExcluirPrecificacao, () => { }),
    ], null, 5);
}
