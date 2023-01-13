export class ProxyFactory {
    static create(objeto, acao, ...props) {
        return new Proxy(objeto, {
            get(target, prop, receiver) {
                if (props.includes(prop) && typeof (target[prop]) == typeof (Function)) {
                    return function () {
                        const retorno = Reflect.apply(target[prop], target, arguments);
                        acao(target);
                        return retorno;
                    };
                }
                return Reflect.get(target, prop, receiver);
            }
        });
    }
}
//# sourceMappingURL=ProxyFactory.js.map