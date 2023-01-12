export class Precificacao
{
    private _categoria: string;
    public valorHora: number;
    public valorMensalidade: number;
    public status: boolean;
    public numeroDeVagas: number;

    constructor(categoria: string, valorHora:number, valorMensalidade: number, status: boolean, numeroDeVagas: number)
    {   
        this.categoria = categoria;
        this.valorHora = valorHora;
        this.valorMensalidade = valorMensalidade;
        this.status = status;
        this.numeroDeVagas = numeroDeVagas;
    }

    set categoria(categoria: string)
    {
        if(categoria.trim().length == 0 ){
            throw new Error("Informações inválidas");
        }

        this._categoria = categoria;
    }

}
