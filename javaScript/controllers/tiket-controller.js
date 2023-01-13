import { Veiculo } from "../models/Veiculo.js";
import { PrecificacoesService } from "../services/PrecificacoesService.js";
import { FormAddTiketView } from "../views/formAddTiket-view.js";
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
        console.log(placa, marca, modelo, categoria);
        const veiculo = new Veiculo(placa, marca, modelo, categoria);
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