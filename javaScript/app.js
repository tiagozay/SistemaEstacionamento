import { $, elementosComAlturasIguais } from './lib/funcoesUtilitarias.js';
import { listarMensalistas } from './listagemMensalistas.js';
import { listarTikets } from './listagemTikets.js';
import { listarMensalidades } from './listagemMensalidades.js';
import { listarPrecificacoes } from './listagemPrecificacoes.js';
import { listarFormasDePagamento } from './listagemFormasDePagamento.js';
import { listarUsuarios } from './listagemUsuarios.js';
import { configuraPaginacao } from './paginacao.js';
import { RepresentacaoEstacionamento } from './RepresentacaoEstacionamento.js';
elementosComAlturasIguais($("#header"), $("#headerMenu"));
configuraPaginacao();
listarTikets();
listarMensalistas();
listarMensalidades();
listarPrecificacoes();
listarFormasDePagamento();
listarUsuarios();
RepresentacaoEstacionamento.estacionarVeiculo("c1", 'APN-2018');
//# sourceMappingURL=app.js.map