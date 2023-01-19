import { createDomElement } from "../lib/funcoesUtilitarias.js";
export class ErrorInputService {
    static openError(input, message) {
        const element = createDomElement('p', null, message, 'msgErroInput');
        input.after(element);
    }
    static closeError(input) {
        const element = input.nextElementSibling;
        if (element === null || element === void 0 ? void 0 : element.classList.contains("msgErroInput")) {
            element.remove();
        }
    }
}
//# sourceMappingURL=ErrorInputService.js.map