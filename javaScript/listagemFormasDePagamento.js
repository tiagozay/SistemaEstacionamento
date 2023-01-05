import { $, createDomElement } from "./lib/funcoesUtilitarias.js";
import { AcaoRegistro, CampoDosRegistros, ZayDataTable } from "./lib/ZayDataTable.js";
class FormaDePagamento {
    constructor(id, nome, ativa) {
        this.id = id;
        this.nome = nome;
        this.ativa = ativa;
    }
    formataParaEscita() {
        return {
            id: this.id,
            nome: this.nome,
            ativa: this.ativa ? "Sim" : "Não",
        };
    }
    static formataFormasDePagamentoParaListar(formasDePagamento) {
        return formasDePagamento.map(formaDePagamento => formaDePagamento.formataParaEscita());
    }
}
const formasDePagamento = [
    new FormaDePagamento('1', 'Dinheiro', true),
    new FormaDePagamento('2', 'Crédito', true),
    new FormaDePagamento('3', 'Débito', true)
];
const btnEditarFormaDePagamento = createDomElement("button", "btnEditarFormaDePagamento", 'edit', 'material-icons');
const btnExcluirFormaDePagamento = createDomElement("button", "btnExcluirFormaDePagamento", 'delete', 'material-icons');
const nomeTabela = 'listagemFormasDePagamento';
export function listarFormasDePagamento() {
    const dados = FormaDePagamento.formataFormasDePagamentoParaListar(formasDePagamento);
    const zayDataTable__formasDePagamento = new ZayDataTable(nomeTabela, $("#tabelaFormasDePagamento"), [
        new CampoDosRegistros('Nome forma de pagamento', 'nome'),
        new CampoDosRegistros('Ativa', 'ativa'),
    ], 'id', dados, [
        new AcaoRegistro(btnEditarFormaDePagamento, () => { }),
        new AcaoRegistro(btnExcluirFormaDePagamento, () => { })
    ], null, 5);
}
