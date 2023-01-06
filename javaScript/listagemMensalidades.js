import { DateHelper } from "./helpers/DateHelper.js";
import { $, createDomElement, formata_cpf } from "./lib/funcoesUtilitarias.js";
import { AcaoRegistro, CampoDosRegistros, ZayDataTable } from "./lib/ZayDataTable.js";
import { Mensalista } from "./listagemMensalistas.js";
class Mensalidade {
    constructor(id, mensalista, categoria, valor, formaDePagamento, dataDeCompra, dataDeVencimento, status) {
        this.id = id;
        this.mensalista = mensalista;
        this.categoria = categoria;
        this.valor = valor;
        this.formaDePagamento = formaDePagamento;
        this.dataDeCompra = dataDeCompra;
        this.dataDeVencimento = dataDeVencimento;
        this.status = status;
    }
    formataParaEscita() {
        return {
            id: this.id,
            nome_mensalista: this.mensalista.nome,
            cpf: formata_cpf(this.mensalista.cpf),
            categoria: this.categoria,
            valor: this.valor.toLocaleString('pt-BR', { style: "currency", currency: "BRL" }),
            formaDePagamento: this.formaDePagamento,
            dataDeCompra: DateHelper.formataData(this.dataDeCompra),
            dataDeVencimento: DateHelper.formataData(this.dataDeVencimento),
            status: this.status,
        };
    }
    static formataMensalidadesParaListar(mensalidades) {
        return mensalidades.map(mensalidade => mensalidade.formataParaEscita());
    }
}
const mensalidades = [
    new Mensalidade('1', new Mensalista('1', "José", '11111111111', 'jose@gmail.com', '42999999999', false), 'Moto', 130.00, "Dinheiro", new Date('2023-01-04T03:24:00'), new Date('2023-02-04T03:24:00'), 'Vencido'),
    new Mensalidade('1', new Mensalista('1', "José", '11111111111', 'jose@gmail.com', '42999999999', false), 'Moto', 130.00, "Dinheiro", new Date('2023-01-04T03:24:00'), new Date('2023-02-04T03:24:00'), 'Ativo'),
    new Mensalidade('1', new Mensalista('1', "José", '11111111111', 'jose@gmail.com', '42999999999', false), 'Moto', 130.00, "Dinheiro", new Date('2023-01-04T03:24:00'), new Date('2023-02-04T03:24:00'), 'Vencido'),
    new Mensalidade('1', new Mensalista('1', "José", '11111111111', 'jose@gmail.com', '42999999999', false), 'Moto', 130.00, "Dinheiro", new Date('2023-01-04T03:24:00'), new Date('2023-02-04T03:24:00'), 'Vencido'),
    new Mensalidade('1', new Mensalista('1', "José", '11111111111', 'jose@gmail.com', '42999999999', false), 'Moto', 130.00, "Dinheiro", new Date('2023-01-04T03:24:00'), new Date('2023-02-04T03:24:00'), 'Ativo'),
    new Mensalidade('1', new Mensalista('1', "José", '11111111111', 'jose@gmail.com', '42999999999', false), 'Moto', 130.00, "Dinheiro", new Date('2023-01-04T03:24:00'), new Date('2023-02-04T03:24:00'), 'Vencido'),
];
const btnExcluirMensalidade = createDomElement("button", null, 'delete', 'material-icons', 'tabela__btnExcluir');
const nomeTabela = 'listagemMensalidades';
export function listarMensalidades() {
    const dados = Mensalidade.formataMensalidadesParaListar(mensalidades);
    const zayDataTable__mensalidades = new ZayDataTable(nomeTabela, $("#tabelaMensalidades"), [
        new CampoDosRegistros("Mensalista", 'nome_mensalista'),
        new CampoDosRegistros("CPF", 'cpf'),
        new CampoDosRegistros("Categoria", 'categoria'),
        new CampoDosRegistros("Valor", 'valor'),
        new CampoDosRegistros("Forma de pagamento", 'formaDePagamento'),
        new CampoDosRegistros("Data de compra", 'dataDeCompra'),
        new CampoDosRegistros("Data de vencimento", 'dataDeVencimento'),
        new CampoDosRegistros("Status", 'status'),
    ], 'id', dados, [
        new AcaoRegistro(btnExcluirMensalidade, () => { })
    ], null, 5);
    formataStatusDeAcordoComValor();
    zayDataTable__mensalidades.onWriteRegisters = () => {
        formataStatusDeAcordoComValor();
    };
}
function formataStatusDeAcordoComValor() {
    const tdsStatus = document.querySelectorAll(`.${nomeTabela}-status`);
    tdsStatus.forEach(td => {
        if (td.innerText == 'Ativo') {
            const p = document.createElement("p");
            p.innerText = td.innerText;
            td.innerHTML = "";
            td.appendChild(p);
            p.classList.add("statusAtivo");
        }
        else if (td.innerText == 'Vencido') {
            const p = document.createElement("p");
            p.innerText = td.innerText;
            td.innerHTML = "";
            td.appendChild(p);
            p.classList.add("statusVencido");
        }
    });
}
//# sourceMappingURL=listagemMensalidades.js.map