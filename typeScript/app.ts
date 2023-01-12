import {$, $all, createDomElement, elementosComAlturasIguais} from './lib/funcoesUtilitarias.js';
import { listarMensalistas } from './listagemMensalistas.js';
import { listarTikets } from './listagemTikets.js';
import { listarMensalidades } from './listagemMensalidades.js';
import { listarPrecificacoes } from './listagemPrecificacoes.js';
import { listarFormasDePagamento } from './listagemFormasDePagamento.js';
import { listarUsuarios } from './listagemUsuarios.js';
import { configuraPaginacao } from './paginacao.js';
import { RepresentacaoEstacionamento } from './RepresentacaoEstacionamento.js';
import { Tiket } from './models/Tiket.js';
import { Veiculo } from './models/Veiculo.js';
import { FormaDePagamento } from './models/FormaDePagamento.js';
import { StatusTiket } from './enums/StatusTiket.js';

elementosComAlturasIguais($("#header") as HTMLElement, $("#headerMenu") as HTMLElement);

configuraPaginacao();
listarTikets();
listarMensalistas();
listarMensalidades();
listarPrecificacoes();
listarFormasDePagamento();
listarUsuarios();

RepresentacaoEstacionamento.estacionarVeiculo("c1", 'APN-2018');

let tiket = new Tiket(
    new Veiculo("APN-2018", 'Gol', 'Gol', 'Carro'), 
    StatusTiket['Pago'],
    new FormaDePagamento("Dinheiro", false)
);

console.log(tiket);