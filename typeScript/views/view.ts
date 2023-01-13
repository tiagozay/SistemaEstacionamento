import { $ } from "../lib/funcoesUtilitarias.js";
import { ProxyFactory } from "../services/ProxyFactory.js";

export abstract class View<T>
{
    protected elemento: HTMLElement;

    constructor(seletor: string){
        const elemento = $(seletor);

        if(elemento){
            this.elemento = elemento;
        }else{
            throw new Error(`O seletor ${seletor} não existe no dom. Verifique.`);
        }
    }

    public update(model: T): void{
        const template = this.template(model);
        this.elemento.innerHTML = template;
    }

    protected abstract template(model: T): string;

}