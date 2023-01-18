import { Tiket } from "../models/Tiket.js";
import { Veiculo } from "../models/Veiculo.js";
export class TiketsDao {
    constructor(connection) {
        this.connection = connection;
    }
    adiciona(tiket) {
        return new Promise((resolve, reject) => {
            const trasaction = this.connection.transaction(['Tikets'], 'readwrite');
            const store = trasaction.objectStore('Tikets');
            const request = store.add(tiket, tiket.id ? tiket.id : undefined);
            request.onsuccess = () => {
                resolve();
            };
            request.onerror = e => {
                const target = e.target;
                console.log(target === null || target === void 0 ? void 0 : target.error);
                reject('Não foi possível adicionar o tiket');
            };
        });
    }
    buscaTiket(id) {
        return new Promise((resolve, reject) => {
            const trasaction = this.connection.transaction(['Tikets'], 'readwrite');
            const store = trasaction.objectStore('Tikets');
            const request = store.get(id);
            request.onsuccess = e => {
                const target = e.target;
                const dado = target.result;
                resolve(new Tiket(id, new Veiculo(dado.veiculo.placa, dado.veiculo.marca, dado.veiculo.modelo, dado.veiculo.segmento), new Date(dado.dataDeEntrada), new Date(dado._dataDeSaida), dado.valorPorHora, dado.status, dado._formaDePagamento, dado.numeroDaVaga));
            };
            request.onerror = e => {
                const target = e.target;
                console.log(target.error);
                reject('Não foi possível buscar o tiket.');
            };
        });
    }
    buscaTodos() {
        return new Promise((resolve, reject) => {
            const trasaction = this.connection.transaction(['Tikets'], 'readwrite');
            const store = trasaction.objectStore('Tikets');
            const cursor = store.openCursor();
            const tikets = [];
            cursor.onsuccess = e => {
                const target = e.target;
                let atual = target.result;
                console.log(atual);
                if (atual) {
                    let dado = atual.value;
                    let tiket = new Tiket(atual.key, new Veiculo(dado.veiculo.placa, dado.veiculo.marca, dado.veiculo.modelo, dado.veiculo.segmento), new Date(dado.dataDeEntrada), new Date(dado._dataDeSaida), dado.valorPorHora, dado.status, dado._formaDePagamento, dado.numeroDaVaga);
                    tikets.push(tiket);
                    atual.continue();
                }
                else {
                    resolve(tikets);
                }
            };
            cursor.onerror = e => {
                const target = e.target;
                console.log(target.error);
                reject('Não foi possível buscar os tikets.');
            };
        });
    }
    excluirTiket(tiketId) {
        return new Promise((resolve, reject) => {
            const trasaction = this.connection.transaction(['Tikets'], 'readwrite');
            const store = trasaction.objectStore('Tikets');
            const request = store.delete(tiketId);
            request.onsuccess = () => {
                resolve();
            };
            request.onerror = e => {
                const target = e.target;
                console.log(target === null || target === void 0 ? void 0 : target.error);
                reject('Não foi possível excluir o tiket');
            };
        });
    }
    editarTiket(tiket) {
        return new Promise((resolve, reject) => {
            if (!tiket.id) {
                reject("Tiket ainda não foi persistido, não pode ser editado.");
                return;
            }
            this.excluirTiket(tiket.id)
                .then(() => {
                this.adiciona(tiket)
                    .then(() => resolve());
            })
                .catch(() => {
                reject('Não foi possível editar o tiket');
            });
        });
    }
}
//# sourceMappingURL=TiketsDao.js.map