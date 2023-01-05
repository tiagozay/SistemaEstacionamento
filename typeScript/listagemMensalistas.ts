import { $, createDomElement, formata_cpf, formata_telefone, remove_formatacao_telefone } from "./lib/funcoesUtilitarias.js";
import { AcaoRegistro, CampoDosRegistros, ZayDataTable } from "./lib/ZayDataTable.js";

export class Mensalista
{
    constructor(
        public id: string,
        public nome: string, 
        public cpf: string,
        public email: string,
        public celular: string,
        public ativo: boolean
    ){}

    formataParaEscita(): object
    {
        return {
            id: this.id,
            nome: this.nome,
            cpf: formata_cpf(this.cpf),
            email: this.email,
            celular: formata_telefone(this.celular),
            ativo: this.ativo ? 'Sim' : 'Não'
        }
    }

    static formataMensalistasParaListar(mensalistas: Array<Mensalista>): Array<object>
    {
        return mensalistas.map(mensalista => mensalista.formataParaEscita());
    }
}

const mensalistas = [
    new Mensalista('1', "José", '11111111111', 'jose@gmail.com', '42999567084', false),
    new Mensalista('2', "Tiago zay", '13202597906', 'tiagozat@gmail.com', '42999318075', true),
    new Mensalista('1', "José", '11111111111', 'jose@gmail.com', '42999567084', true),
    new Mensalista('2', "Tiago zay", '13202597906', 'tiagozat@gmail.com', '42999318075', true),
    new Mensalista('1', "José", '11111111111', 'jose@gmail.com', '42999567084', false),
    new Mensalista('2', "Tiago zay", '13202597906', 'tiagozat@gmail.com', '42999318075', true),
    new Mensalista('1', "José", '11111111111', 'jose@gmail.com', '42999567084', true),
    new Mensalista('2', "Tiago zay", '13202597906', 'tiagozat@gmail.com', '42999318075', true),
    new Mensalista('1', "José", '11111111111', 'jose@gmail.com', '42999567084', true),
    new Mensalista('2', "Tiago zay", '13202597906', 'tiagozat@gmail.com', '42999318075', false),
    new Mensalista('1', "José", '11111111111', 'jose@gmail.com', '42999567084', true),
    new Mensalista('2', "Tiago zay", '13202597906', 'tiagozat@gmail.com', '42999318075', true),
]

const btnEditarMensalista = createDomElement("button", "btnEditarMensalista", 'edit', 'material-icons');
const btnExcluirMensalista = createDomElement("button", "btnExcluirMensalista", 'delete', 'material-icons');

const nomeTabela = 'listagemMensalistas';

export function listarMensalistas()
{
    const dados = Mensalista.formataMensalistasParaListar(mensalistas);
    
    const zayDataTable__mensalistas = new ZayDataTable(
        nomeTabela, 
        $("#tabelaMensalistas") as HTMLTableElement,
        [
            new CampoDosRegistros('Nome', 'nome'),
            new CampoDosRegistros('CPF', 'cpf'),
            new CampoDosRegistros('E-mail', 'email'),
            new CampoDosRegistros('Celular', 'celular'),
            new CampoDosRegistros('Ativo', 'ativo'),
        ],
        'id',
        dados,
        [
            new AcaoRegistro(btnEditarMensalista, () => {}),
            new AcaoRegistro(btnExcluirMensalista, () => {}),
        ],
        null,
        5
    );

    formataAtivoDeAcordoComValor();

    zayDataTable__mensalistas.onWriteRegisters = () => {
        formataAtivoDeAcordoComValor();
    }
    
}

function formataAtivoDeAcordoComValor()
{
    const tdsAtivo = document.querySelectorAll<HTMLElement>(`.${nomeTabela}-ativo`);

    tdsAtivo.forEach(td => {
        if(td.innerText == 'Sim'){

            const p = document.createElement("p");

            p.innerHTML = `
                <i class="material-icons">lock_open</i>
                ${td.innerText}
            `;

            td.innerHTML = "";

            td.appendChild(p);
            
            p.classList.add("mensalistaAtivo");
        }else if(td.innerText == 'Não'){
            const p = document.createElement("p");

            p.innerHTML = `
                <i class="material-icons">lock</i>
                ${td.innerText}
            `;

            td.innerHTML = "";

            td.appendChild(p);

            p.classList.add("mensalistaInativo");
        }
    })
}