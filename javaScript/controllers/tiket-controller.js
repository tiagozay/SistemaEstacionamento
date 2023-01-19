import { DateHelper } from "../helpers/DateHelper.js";
import { Veiculo } from "../models/Veiculo.js";
import { PrecificacoesService } from "../services/PrecificacoesService.js";
import { FormAddTiketView } from "../views/formAddTiket-view.js";
import { Tiket } from "../models/Tiket.js";
import { ConnectionFactory } from "../services/ConnectionFactory.js";
import { TiketsDao } from "../dao/TiketsDao.js";
import { ErrorInputService } from "../services/ErrorInputService.js";
export class TiketController {
    constructor() {
        this.formView = new FormAddTiketView("#formAdcTiketView", this);
        this.modelFormCadastroTiket = {
            categorias: PrecificacoesService.buscaTodasCategoriasAtivas(),
            placa: "",
            marcaVeiculo: "",
            modeloVeiculo: "",
            categoria: "",
            valorHora: 0
        };
        const configFormAdcTiket = {
            categorias: PrecificacoesService.buscaTodasCategoriasAtivas(),
        };
        this.formView.update(configFormAdcTiket);
    }
    cadastra(event) {
        const formulario = event.target;
        if (!this.validaInputs(formulario)) {
            return;
        }
        const placa = formulario.placa.value;
        const marca = formulario.marca.value;
        const modelo = formulario.modelo.value;
        const categoria = formulario.categoria.value;
        const precificacao = PrecificacoesService.buscaPrecificacaoDeCategoria(categoria);
        const valorHora = 0;
        if (precificacao) {
            const valorHora = precificacao.valorHora;
        }
        const numeroDaVaga = formulario.numeroDaVaga.value;
        const dataEntrada = formulario.dataEntrada.value;
        const veiculo = new Veiculo(placa, marca, modelo, categoria);
        const tiket = new Tiket(null, veiculo, DateHelper.transformaStringEmDate(dataEntrada), null, valorHora, "Em aberto", null, numeroDaVaga);
        let connection;
        ConnectionFactory.getConnection()
            .then(conn => {
            connection = conn;
            const tiketsDao = new TiketsDao(connection);
        });
    }
    validaInputs(formulario) {
        let formValido = true;
        const inputs = [...formulario.querySelectorAll(".inputObrigatorio")];
        const inputsDigitaveis = inputs.filter(input => !input.getAttribute("readonly"));
        inputsDigitaveis.forEach(input => {
            if (input.value.trim().length == 0 || input.value == 'null') {
                ErrorInputService.closeError(input);
                ErrorInputService.openError(input, `O campo ${input.name} é obrigatório`);
                formValido = false;
            }
            else {
                ErrorInputService.closeError(input);
            }
        });
        return formValido;
    }
    buscaVeiculoPorPlaca(placa) {
        if (placa == 'APN-2018') {
            this.modelFormCadastroTiket.placa = placa;
            this.modelFormCadastroTiket.marcaVeiculo = "Honda";
            this.modelFormCadastroTiket.modeloVeiculo = "CG";
            this.modelFormCadastroTiket.categoria = "Moto";
            const precificacao = PrecificacoesService.buscaPrecificacaoDeCategoria(this.modelFormCadastroTiket.categoria);
            if (precificacao) {
                this.modelFormCadastroTiket.valorHora = precificacao === null || precificacao === void 0 ? void 0 : precificacao.valorHora;
            }
            this.formView.update(this.modelFormCadastroTiket);
        }
    }
    alteraValorHoraDeAcordoComCategoria(categoria) {
        const precificacao = PrecificacoesService.buscaPrecificacaoDeCategoria(categoria);
        if (precificacao) {
            this.modelFormCadastroTiket.valorHora = precificacao.valorHora;
        }
        this.modelFormCadastroTiket.categoria = categoria;
        this.formView.update(this.modelFormCadastroTiket);
    }
}
//# sourceMappingURL=tiket-controller.js.map