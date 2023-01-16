import { DateHelper } from "../helpers/DateHelper.js";
import { formata_data } from "../lib/funcoesUtilitarias.js";
import { View } from "./view.js";
import { $ } from "../lib/funcoesUtilitarias.js";
import { TiketController } from "../controllers/tiket-controller.js";


export class FormAddTiketView extends View<object>
{
    private controller: TiketController;

    constructor(seletor: string, controller: TiketController){
        super(seletor);
        this.controller = controller;
    }

    //Sobreescreve o update para adicionar o evento de oninput ao input da placa para fazer a busca
    public update(model: object): void {

        const template = this.template(model);
        this.elemento.innerHTML = template;

        const formCadastrarTiket = $("#formularioCadatrarTiket");

        formCadastrarTiket?.addEventListener("submit", event => {
            event.preventDefault();
            this.controller.cadastra(event);
        });

        const inputPlaca = $("#formCadastroTiket__inputPlaca") as HTMLInputElement;

        inputPlaca?.addEventListener("input", () => {   
            const placa = inputPlaca.value.trim();

            this.controller.buscaVeiculoPorPlaca(placa);
        });

        const selectCategoria = $("#selectCategoria") as HTMLSelectElement;

        selectCategoria?.addEventListener("change", () => {
            const categoria = selectCategoria.value;

            this.controller.alteraValorHoraDeAcordoComCategoria(categoria);
        });

    }

    protected template(model: object): string
    {
        return `
            <form id="formularioCadatrarTiket" class="formPadrao">
            <div  class="linhaInputs">
                <label for="">
                    Placa veículo
                    <input type="text" class="padraoInputPlaca" name="placa" id="formCadastroTiket__inputPlaca" value="${ model['placa' as keyof object] ? model['placa' as keyof object] : "" }">
                </label>
                <label for="">
                    Marca veículo
                    <input type="text" name="marca" value="${ model['marcaVeiculo' as keyof object] ? model['marcaVeiculo' as keyof object] : "" }">
                </label>
                <label for="">
                    Modelo veículo
                    <input type="text" name="modelo" value="${ model['modeloVeiculo' as keyof object] ? model['modeloVeiculo' as keyof object] : "" }">
                </label>
            </div>

            <div  class="linhaInputs">
                <label for="">
                    Categoria
                    <select name="categoria" id="selectCategoria">
                     ${ function(){
                        const categorias = model['categorias' as keyof object] as Array<string>;

                        const categoriaVeiculo = model['categoria' as keyof object];

                        return categorias.map( categoria => `<option value=${categoria} ${ categoria == categoriaVeiculo ? "selected" : "" }>${categoria}</option>` );

                     }()
                    }
                    </select>
                </label>
                <label for="">
                    Valor hora
                    <input type="text" name="valorHora" class="inputDesativado" readonly value=${model['valorHora' as keyof object] ? model['valorHora' as keyof object] : ""}> 
                </label>
                <label for="">
                    Número vaga
                    <input type="text" name="numeroDaVaga">
                </label>
            </div>

            <div  class="linhaInputs">
                <label for="">
                    Data entrada
                    <input type="text" name="dataEntrada" class="inputDesativado" readonly value="${DateHelper.formataDataComHorario((new Date())) }">
                </label>
                <label for="">
                    Data saída
                    <input type="text" name="dataSaida" class="inputDesativado" readonly value="${DateHelper.formataDataComHorario((new Date())) } | Em aberto">
                </label>
                <label for="">
                    Tempo decorrido (horas e minutos)
                    <input type="text" class="inputDesativado" readonly value="0.0">
                </label>
            </div>

            <div class="formPadrao__divSalvarECancelar">
                <button class="formPadrao__btnSalvar">
                    <i class="material-icons">save</i>
                    Salvar
                </button>
                <button type="button" class="btnTrocarDePagina formPadrao__btnVoltar" data-pagina="estacionamento">Voltar</button>
            </div>
        </form>
        `;
    }
}