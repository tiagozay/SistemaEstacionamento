import {$, $all, createDomElement, elementosComAlturasIguais} from './lib/funcoesUtilitarias.js';
import { listarMensalistas } from './listagemMensalistas.js';
import { listarTikets } from './listagemTikets.js';
import { listarMensalidades } from './listagemMensalidades.js';
import { listarPrecificacoes } from './listagemPrecificacoes.js';
import { listarFormasDePagamento } from './listagemFormasDePagamento.js';
import { listarUsuarios } from './listagemUsuarios.js';
import { Paginacao } from './Paginacao.js';
import { RepresentacaoEstacionamento } from './RepresentacaoEstacionamento.js';
import { Tiket } from './models/Tiket.js';
import { Veiculo } from './models/Veiculo.js';
import { FormaDePagamento } from './models/FormaDePagamento.js';
import { TiketController } from './controllers/tiket-controller.js';
import { configuraInputsDePlaca } from './padraoInputPlaca.js';

elementosComAlturasIguais($("#header") as HTMLElement, $("#headerMenu") as HTMLElement);

configuraInputsDePlaca();
listarTikets();
listarMensalistas();
listarMensalidades();
listarPrecificacoes();
listarFormasDePagamento();
listarUsuarios();

RepresentacaoEstacionamento.estacionarVeiculo("c1", 'APN-2018');

const paginacao = new Paginacao();

paginacao.addEventToPage('formularioAdcNovoTiket', () => new TiketController())