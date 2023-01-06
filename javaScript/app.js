import { $, elementosComAlturasIguais } from './lib/funcoesUtilitarias.js';
import { listarMensalistas } from './listagemMensalistas.js';
import { listarTikets } from './listagemTikets.js';
import { listarMensalidades } from './listagemMensalidades.js';
import { listarPrecificacoes } from './listagemPrecificacoes.js';
import { listarFormasDePagamento } from './listagemFormasDePagamento.js';
import { listarUsuarios } from './listagemUsuarios.js';
import { configuraPaginacao } from './paginacao.js';
elementosComAlturasIguais($("#header"), $("#headerMenu"));
configuraPaginacao();
listarTikets();
listarMensalistas();
listarMensalidades();
listarPrecificacoes();
listarFormasDePagamento();
listarUsuarios();
//# sourceMappingURL=app.js.map