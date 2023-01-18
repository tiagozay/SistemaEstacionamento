import { Tiket } from "../models/Tiket.js";
import { Veiculo } from "../models/Veiculo.js";

export class TiketsDao
{
    private connection: IDBDatabase;
    
    constructor(connection: IDBDatabase){
        this.connection = connection;
    }

    public adiciona(tiket: Tiket): Promise<void>
    {
        return new Promise( (resolve, reject) => {
            const trasaction = this.connection.transaction(['Tikets'], 'readwrite');
            const store = trasaction.objectStore('Tikets');
            const request = store.add(tiket, tiket.id ? tiket.id : undefined);
            request.onsuccess = () => {
                resolve();
            }
            request.onerror = e => {
                const target = e.target as IDBRequest;

                console.log(target?.error);
                reject('Não foi possível adicionar o tiket');
            }
        } );
    }

    public buscaTiket(id: number): Promise<Tiket>
    {
        return new Promise( (resolve, reject) => {
            const trasaction = this.connection.transaction(['Tikets'], 'readwrite');
            const store = trasaction.objectStore('Tikets');

            const request = store.get(id);

            request.onsuccess = e => {
                const target = e.target as IDBRequest;

                const dado = target.result;

                resolve(
                    new Tiket(
                        id,
                        new Veiculo(dado.veiculo.placa, dado.veiculo.marca, dado.veiculo.modelo, dado.veiculo.segmento),
                        new Date(dado.dataDeEntrada),
                        new Date(dado._dataDeSaida),
                        dado.valorPorHora,
                        dado.status,
                        dado._formaDePagamento,
                        dado.numeroDaVaga,  
                    )
                );
            }

            request.onerror = e => {
                const target = e.target as IDBRequest;

                console.log(target.error);
                reject('Não foi possível buscar o tiket.');
            }
        })
    }

    public buscaTodos(): Promise<Array<Tiket>>
    {
        return new Promise( (resolve, reject) => {
            const trasaction = this.connection.transaction(['Tikets'], 'readwrite');
            const store = trasaction.objectStore('Tikets');
            const cursor = store.openCursor();
            const tikets: Array<Tiket> = [];
            cursor.onsuccess = e => {
                const target = e.target as IDBRequest;

                let atual = target.result;

                console.log(atual);

                if(atual){
                    let dado = atual.value;

                    let tiket = new Tiket(
                        atual.key,
                        new Veiculo(dado.veiculo.placa, dado.veiculo.marca, dado.veiculo.modelo, dado.veiculo.segmento),
                        new Date(dado.dataDeEntrada),
                        new Date(dado._dataDeSaida),
                        dado.valorPorHora,
                        dado.status,
                        dado._formaDePagamento,
                        dado.numeroDaVaga,  

                    );

                    tikets.push(tiket);

                    atual.continue();
                }else{
                    resolve(tikets);
                }
            }

            cursor.onerror = e => {
                const target = e.target as IDBRequest;

                console.log(target.error);
                reject('Não foi possível buscar os tikets.');
            }
        } )
    }

    public excluirTiket(tiketId: number): Promise<void>
    {
        return new Promise( (resolve, reject) => {
            const trasaction = this.connection.transaction(['Tikets'], 'readwrite');
            const store = trasaction.objectStore('Tikets');
            const request = store.delete(tiketId);
            request.onsuccess = () => {
                resolve();
            }
            request.onerror = e => {
                const target = e.target as IDBRequest;

                console.log(target?.error);
                reject('Não foi possível excluir o tiket');
            }
        } )
    }

    public editarTiket(tiket: Tiket): Promise<void>
    {
        return new Promise( (resolve, reject) => {

            if(!tiket.id){
                reject("Tiket ainda não foi persistido, não pode ser editado.");
                return;
            }

            this.excluirTiket(tiket.id)
                .then( () => {
                    this.adiciona(tiket)
                        .then( () => resolve() );
                } )
                .catch( () => {
                    reject('Não foi possível editar o tiket');
                } );
        } );
    }
}