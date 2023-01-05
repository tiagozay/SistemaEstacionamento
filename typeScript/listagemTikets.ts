import { $, createDomElement } from "./lib/funcoesUtilitarias.js";
import { AcaoRegistro, AcaoDiferenteParaCadaRegistro,  CampoDosRegistros, ZayDataTable } from './lib/ZayDataTable.js';

class Tiket 
{
    constructor(
        public id: string,
        public segmento: string,
        public valor_hora: number,
        public veiculo: Veiculo,
        public forma_de_pagamento: string,
        public status: string,
    ){}

    formataParaEscita(): object
    {
        return {
            id: this.id,
            segmento: this.segmento,
            valor_hora: this.valor_hora.toLocaleString('pt-BR', {style: "currency", currency: "BRL"}),
            placa: this.veiculo.placa,
            veiculo: this.veiculo.marca+" "+this.veiculo.modelo,
            forma_de_pagamento: this.forma_de_pagamento,
            status: this.status
        }
    }

    static formataTiketsParaListar(tikets: Array<Tiket>): Array<object>
    {
        return tikets.map(tiket => tiket.formataParaEscita());
    }
}

class Veiculo 
{
    constructor(
        public id: string,
        public segmento: string,
        public placa: string,
        public marca: string,
        public modelo: string,
    ){}
}

const tikets = [
    new Tiket('1', "Moto", 10.00, new Veiculo('1', "Moto", "APN-2018", "Honda", "CG FAN"), 'Em aberto', 'Em aberto'),
    new Tiket('2', "Carro", 20.00, new Veiculo('2', "Carro", 'AQQ-2450', 'Volwkswagen', 'GOL'), 'Em aberto', 'Em aberto'),
    new Tiket('3', "Carro", 20.00, new Veiculo('3', 'Carro', 'AXG-2955', 'Chevorllet', 'Astra'), 'Dinheiro', 'Pago'),
    new Tiket('1', "Moto", 10.00, new Veiculo('1', "Moto", "APN-2018", "Honda", "CG FAN"), 'Em aberto', 'Em aberto'),
    new Tiket('2', "Carro", 20.00, new Veiculo('2', "Carro", 'AQQ-2450', 'Volwkswagen', 'GOL'), 'Em aberto', 'Em aberto'),
    new Tiket('3', "Carro", 20.00, new Veiculo('3', 'Carro', 'AXG-2955', 'Chevorllet', 'Astra'), 'Dinheiro', 'Pago'),
    new Tiket('1', "Moto", 10.00, new Veiculo('1', "Moto", "APN-2018", "Honda", "CG FAN"), 'Em aberto', 'Em aberto'),
    new Tiket('2', "Carro", 20.00, new Veiculo('2', "Carro", 'AQQ-2450', 'Volwkswagen', 'GOL'), 'Em aberto', 'Em aberto'),
    new Tiket('3', "Carro", 20.00, new Veiculo('3', 'Carro', 'AXG-2955', 'Chevorllet', 'Astra'), 'Dinheiro', 'Pago'),
    new Tiket('1', "Moto", 10.00, new Veiculo('1', "Moto", "APN-2018", "Honda", "CG FAN"), 'Em aberto', 'Em aberto'),
    new Tiket('2', "Carro", 20.00, new Veiculo('2', "Carro", 'AQQ-2450', 'Volwkswagen', 'GOL'), 'Em aberto', 'Em aberto'),
    new Tiket('3', "Carro", 20.00, new Veiculo('3', 'Carro', 'AXG-2955', 'Chevorllet', 'Astra'), 'Dinheiro', 'Pago'),
];

const dados = Tiket.formataTiketsParaListar(tikets);

const nomeTabela = 'listagemTikets';

const btnImprimirTiket = createDomElement('button', 'btnImprimirTiket', 'print', 'material-icons');
const btnVisualizarTiket = createDomElement('button', 'btnVisualizarTiket', 'visibility', 'material-icons');
const btnEditarTiket = createDomElement('button', 'btnEditarTiket', 'edit', 'material-icons');
const btnExcluirTiket = createDomElement('button', 'btnExcluirTiket', 'delete', 'material-icons');

export function listarTikets()
{
    const zayDataTable_tikets = new ZayDataTable(
        nomeTabela,
        $("#tabelaTikets") as HTMLTableElement,
        [
            new CampoDosRegistros("Segmento", 'segmento'),
            new CampoDosRegistros("Valor hora", 'valor_hora'),
            new CampoDosRegistros("Placa", 'placa'),
            new CampoDosRegistros("Veículo", 'veiculo'),
            new CampoDosRegistros("Forma de pagamento", 'forma_de_pagamento'),
            new CampoDosRegistros("Status", 'status'),
        ],
        'id',
        dados,
        [
            new AcaoRegistro(btnImprimirTiket, (event: Event) => {}),
    
            new AcaoDiferenteParaCadaRegistro((tiket: Tiket) => {
                if(tiket.status == 'Pago'){
                    return 0;
                }else{
                    return 1;
                }
            }, [
                new AcaoRegistro(btnVisualizarTiket, ()=>{
                    console.log("Visualizando tiket Pago!");
                }),
                new AcaoRegistro(btnEditarTiket, ()=>{
                    console.log("Editando tiket aberto!");
                })
            ]),
    
            new AcaoRegistro(btnExcluirTiket, (event: Event) => {}),
        ],
        null,
        5
    );
    
    formataStatusDeAcordoComValor();
    
    zayDataTable_tikets.onWriteRegisters = () => {
        formataStatusDeAcordoComValor();
    }
}

function formataStatusDeAcordoComValor()
{
    const tdsStatus = document.querySelectorAll<HTMLElement>(`.${nomeTabela}-status`);

    tdsStatus.forEach(td => {
        if(td.innerText == 'Pago'){

            const p = document.createElement("p");

            p.innerText = td.innerText;

            td.innerHTML = "";

            td.appendChild(p);
            
            p.classList.add("statusPago");
        }else if(td.innerText == 'Em aberto'){
            const p = document.createElement("p");

            p.innerText = td.innerText;

            td.innerHTML = "";

            td.appendChild(p);

            p.classList.add("statusEmAberto");
        }
    })
}