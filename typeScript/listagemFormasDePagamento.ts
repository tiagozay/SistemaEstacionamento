import { DateHelper } from "./helpers/DateHelper.js";
import { $, createDomElement, formata_cpf } from "./lib/funcoesUtilitarias.js";
import { AcaoRegistro, CampoDosRegistros, ZayDataTable } from "./lib/ZayDataTable.js";
import { Mensalista } from "./listagemMensalistas.js";

class FormaDePagamento
{
    constructor(
        public id: string,
        public nome: string,
        public ativa: boolean
    ){}

    formataParaEscita(): object
    {
        return {
            id: this.id,
            nome: this.nome,
            ativa: this.ativa ? "Sim" : "Não",
        }
    }

    static formataFormasDePagamentoParaListar(formasDePagamento: Array<FormaDePagamento>): Array<object>
    {
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

export function listarFormasDePagamento()
{
    const dados = FormaDePagamento.formataFormasDePagamentoParaListar(formasDePagamento);
    
    const zayDataTable__formasDePagamento = new ZayDataTable(
        nomeTabela,
        $("#tabelaFormasDePagamento") as HTMLTableElement,
        [
            new CampoDosRegistros('Nome forma de pagamento', 'nome'),
            new CampoDosRegistros('Ativa', 'ativa'),
        ],
        'id',
        dados,
        [
            new AcaoRegistro(btnEditarFormaDePagamento, () => {}),
            new AcaoRegistro(btnExcluirFormaDePagamento, () => {})
        ],
        null,
        5
    );

}