export abstract class ProxyFactory
{
    static create<T extends object>(objeto: T, acao: Function, ...props: Array<string> ): T
    {
        return new Proxy(objeto , {
            get(target, prop: string, receiver){
                if(props.includes(prop) && typeof(target[prop as keyof object]) == typeof(Function)){
                    return function(){
                        const retorno = Reflect.apply(target[prop as keyof object], target, arguments);
                        acao(target); 
                        return retorno;
                    }
                }

                return Reflect.get(target, prop, receiver);
            }
        })
    }
}