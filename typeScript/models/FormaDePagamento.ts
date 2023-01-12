export class FormaDePagamento
{
    public _nomeFormaDePagamento: string;
    public ativa: boolean;

    constructor(nomeFormaDePagamento: string, ativa: boolean = true){
        this.nomeFormaDePagamento = nomeFormaDePagamento;
        this.ativa = ativa;
    }

    set nomeFormaDePagamento(nomeFormaDePagamento: string)
    {
        if(nomeFormaDePagamento.trim().length == 0){
            throw new Error("Nome para a forma de pagamento inválido.");
        }

        this._nomeFormaDePagamento = nomeFormaDePagamento;
    }

}