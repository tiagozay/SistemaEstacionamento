import { DateHelper } from "../helpers/DateHelper.js";
import { Veiculo } from "../models/Veiculo.js";
import { PrecificacoesService } from "../services/PrecificacoesService.js";
import { ProxyFactory } from "../services/ProxyFactory.js";
import { FormAddTiketView } from "../views/formAddTiket-view.js";
import { $ } from "../lib/funcoesUtilitarias.js";


export class TiketController
{
    private formView = new FormAddTiketView("#formAdcTiketView", this);
    private modelFormCadastroTiket = {
        categorias: PrecificacoesService.buscaTodasCategoriasAtivas(),
        placa: "",
        marcaVeiculo: "",
        modeloVeiculo: "",
        categoria: "",
        valorHora: 0
    }
    
    constructor(){ 

        const configFormAdcTiket = {
            categorias: PrecificacoesService.buscaTodasCategoriasAtivas(),
        }

        this.formView.update(configFormAdcTiket);

    }

    cadastra(event: Event)
    {
        const formulario = event.target as HTMLFormElement;

        const placa = formulario.placa.value;
        const marca = formulario.marca.value;
        const modelo = formulario.modelo.value;
        const categoria = formulario.categoria.value;

        console.log(placa, marca, modelo, categoria);

        const veiculo = new Veiculo(placa, marca, modelo, categoria);


    }

    buscaVeiculoPorPlaca(placa: string){
        if(placa == 'APN-2018'){

            this.modelFormCadastroTiket.placa = placa;
            this.modelFormCadastroTiket.marcaVeiculo = "Honda";
            this.modelFormCadastroTiket.modeloVeiculo = "CG";
            this.modelFormCadastroTiket.categoria = "Moto";

            const precificacao = PrecificacoesService.buscaPrecificacaoDeCategoria(this.modelFormCadastroTiket.categoria);

            if(precificacao){
                this.modelFormCadastroTiket.valorHora = precificacao?.valorHora;
            }

            this.formView.update(this.modelFormCadastroTiket);
        }
    }

    alteraValorHoraDeAcordoComCategoria(categoria: string){
        const precificacao = PrecificacoesService.buscaPrecificacaoDeCategoria(categoria);

        if(precificacao){
            this.modelFormCadastroTiket.valorHora = precificacao.valorHora;
        }

        this.modelFormCadastroTiket.categoria = categoria;

        this.formView.update(this.modelFormCadastroTiket);
    }
}