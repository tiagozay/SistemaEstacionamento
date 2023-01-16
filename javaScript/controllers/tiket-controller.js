import { DateHelper } from "../helpers/DateHelper.js";
import { Veiculo } from "../models/Veiculo.js";
import { PrecificacoesService } from "../services/PrecificacoesService.js";
import { FormAddTiketView } from "../views/formAddTiket-view.js";
import { Tiket } from "../models/Tiket.js";
import { StatusTiket } from "../enums/StatusTiket.js";
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
        const placa = formulario.placa.value;
        const marca = formulario.marca.value;
        const modelo = formulario.modelo.value;
        const categoria = formulario.categoria.value;
        const precificacao = PrecificacoesService.buscaPrecificacaoDeCategoria(categoria);
        const valorHora = precificacao.valorHora;
        const numeroDaVaga = formulario.numeroDaVaga.value;
        const dataEntrada = formulario.dataEntrada.value;
        const veiculo = new Veiculo(placa, marca, modelo, categoria);
        const tiket = new Tiket(veiculo, DateHelper.transformaStringEmDate(dataEntrada), null, valorHora, StatusTiket["Em aberto"], null, numeroDaVaga);
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