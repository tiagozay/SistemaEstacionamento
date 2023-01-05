import { DateHelper } from "./helpers/DateHelper.js";
import { $, createDomElement, formata_cpf, formata_data } from "./lib/funcoesUtilitarias.js";
import { AcaoRegistro, CampoDosRegistros, ZayDataTable } from "./lib/ZayDataTable.js";

class Categoria
{
    constructor(
        public id: string,
        public nome: string,
        public valorDaHora: number,
        public valorDaMensalidade: number, 
        public numeroDeVagas: number,
        public ativa: boolean
    ){}

    formataParaEscita(): object
    {
        return {
            id: this.id,
            nome: this.nome,
            valorDaHora: this.valorDaHora.toLocaleString('pt-BR', {style: "currency", currency: "BRL"}),
            valorDaMensalidade: this.valorDaMensalidade.toLocaleString('pt-BR', {style: "currency", currency: "BRL"}),
            numeroDeVagas: this.numeroDeVagas,
            ativa: this.ativa ? "Sim" : "Não"
        }
    }

    static formataCategoriasParaListar(categorias: Array<Categoria>): Array<object>
    {
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

export function listarPrecificacoes()
{
    const dados = Categoria.formataCategoriasParaListar(categorias);
    
    const zayDataTable__precificacoes = new ZayDataTable(
        nomeTabela,
        $("#tabelaPrecificacoes") as HTMLTableElement,
        [
            new CampoDosRegistros("Categoria", 'nome'),
            new CampoDosRegistros("Valor da hora", 'valorDaHora'),
            new CampoDosRegistros("Valor da mensalidade", 'valorDaMensalidade'),
            new CampoDosRegistros("Numero de vagas", 'numeroDeVagas'),
            new CampoDosRegistros("Ativa", 'ativa'),
        ],
        'id',
        dados,
        [
            new AcaoRegistro(btnEditarPrecificacao, () => {}),
            new AcaoRegistro(btnExcluirPrecificacao, () => {}),
        ],
        null,
        5
    );

    formataAtivoDeAcordoComValor();

    zayDataTable__precificacoes.onWriteRegisters = () => {
        formataAtivoDeAcordoComValor();
    }
}

function formataAtivoDeAcordoComValor()
{
    const tdsAtivo = document.querySelectorAll<HTMLElement>(`.${nomeTabela}-ativa`);

    tdsAtivo.forEach(td => {
        if(td.innerText == 'Sim'){

            const p = document.createElement("p");

            p.innerHTML = `
                <i class="material-icons">lock_open</i>
                ${td.innerText}
            `;

            td.innerHTML = "";

            td.appendChild(p);
            
            p.classList.add("precificacaoAtiva");
        }else if(td.innerText == 'Não'){
            const p = document.createElement("p");

            p.innerHTML = `
                <i class="material-icons">lock</i>
                ${td.innerText}
            `;

            td.innerHTML = "";

            td.appendChild(p);

            p.classList.add("precificacaoInativa");
        }
    })
}
