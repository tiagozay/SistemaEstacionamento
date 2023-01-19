import { createDomElement } from "../lib/funcoesUtilitarias.js";

export abstract class ErrorInputService
{
    public static openError(input: HTMLElement, message: string): void
    {
        const element = createDomElement('p', null, message, 'msgErroInput');

        input.after(element);
    }

    public static closeError(input: HTMLElement): void
    {
        const element = input.nextElementSibling;

        if(element?.classList.contains("msgErroInput")){
            element.remove();
        }
    
    }
}