import { StatusTiket } from "../enums/StatusTiket.js";
import { FormaDePagamento } from "./FormaDePagamento.js";
import { Veiculo } from "./Veiculo.js";

export class Tiket
{
    private readonly veiculo: Veiculo;
    private _formaDePagamento: FormaDePagamento | string;
    private status: StatusTiket;

    constructor(veiculo: Veiculo, status: StatusTiket, formaDePagamento: FormaDePagamento | null = null,){
        this.veiculo = veiculo;

        if(!formaDePagamento || status == "Em aberto"){
            this._formaDePagamento = "Em aberto";
        }else{
            this.formaDePagamento = formaDePagamento as FormaDePagamento;
        }
        
        this.status = status;
    }

    set formaDePagamento(formaDePagamento: FormaDePagamento)
    {
        if(!formaDePagamento.ativa){
            throw new Error("Forma de pagamento intativa");
        }

        this._formaDePagamento = formaDePagamento;
    }
}

