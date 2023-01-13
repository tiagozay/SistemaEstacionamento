import { $ } from "../lib/funcoesUtilitarias.js";
export class View {
    constructor(seletor) {
        const elemento = $(seletor);
        if (elemento) {
            this.elemento = elemento;
        }
        else {
            throw new Error(`O seletor ${seletor} não existe no dom. Verifique.`);
        }
    }
    update(model) {
        const template = this.template(model);
        this.elemento.innerHTML = template;
    }
}
//# sourceMappingURL=view.js.map