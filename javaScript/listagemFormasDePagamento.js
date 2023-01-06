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
    new FormaDePagamento('3', 'Débito', true),
    new FormaDePagamento('4', 'Grátis', false),
];
const btnEditarFormaDePagamento = createDomElement("button", null, 'edit', 'material-icons', 'tabela__btnEditar');
const btnExcluirFormaDePagamento = createDomElement("button", null, 'delete', 'material-icons', 'tabela__btnExcluir');
const nomeTabela = 'listagemFormasDePagamento';
export function listarFormasDePagamento() {
    const dados = FormaDePagamento.formataFormasDePagamentoParaListar(formasDePagamento);
    const zayDataTable__formasDePagamento = new ZayDataTable(nomeTabela, $("#tabelaFormasDePagamento"), [
        new CampoDosRegistros('Nome forma de pagamento', 'nome'),
        new CampoDosRegistros('Ativa', 'ativa', (ativa) => {
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
        new AcaoRegistro(btnEditarFormaDePagamento, () => { }),
        new AcaoRegistro(btnExcluirFormaDePagamento, () => { })
    ], null, 5);
}
//# sourceMappingURL=listagemFormasDePagamento.js.map