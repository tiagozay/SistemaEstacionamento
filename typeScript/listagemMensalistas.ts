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

const btnEditarMensalista = createDomElement("button", null, 'edit', 'material-icons', 'tabela__btnEditar');
const btnExcluirMensalista = createDomElement("button", null, 'delete', 'material-icons', 'tabela__btnExcluir');

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
            new CampoDosRegistros('Ativo', 'ativo', (ativo: string) => {

                if(ativo == "Sim"){
                    return `
                        <p class="p_textoAtivo">
                            <i class="material-icons">lock_open</i>
                            Sim
                        </p>
                    `;
                }else if(ativo == "Não"){
                    return `
                        <p class="p_textoInativo">
                            <i class="material-icons">lock</i>
                            Não
                        </p>
                    
                    `;
                }

                return ativo;
            }),
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
    
}