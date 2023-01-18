export class ConnectionFactory {
    static getConnection() {
        return new Promise((resolve, reject) => {
            const openRequest = window.indexedDB.open(this.dbname, this.version);
            openRequest.onupgradeneeded = e => {
                const target = e.target;
                this.createStores(target.result);
            };
            openRequest.onsuccess = e => {
                var _a;
                if (!this.connection) {
                    const target = e.target;
                    this.connection = target.result;
                    this.metodoCloseConnection = (_a = this.connection) === null || _a === void 0 ? void 0 : _a.close.bind(this.connection);
                    if (this.connection) {
                        this.connection.close = () => {
                            throw new Error('Você não pode fechar diretamente a conexão');
                        };
                    }
                }
                resolve(this.connection);
            };
            openRequest.onerror = e => {
                var _a;
                const target = e.target;
                console.log(target.error);
                reject((_a = target.error) === null || _a === void 0 ? void 0 : _a.name);
            };
        });
    }
    static closeConnection() {
        if (this.connection && this.metodoCloseConnection) {
            this.metodoCloseConnection();
            this.connection = null;
            this.metodoCloseConnection = null;
        }
    }
    static createStores(connection) {
        this.stores.forEach(store => {
            if (connection.objectStoreNames.contains(store)) {
                connection.deleteObjectStore(store);
            }
            connection.createObjectStore(store, { autoIncrement: true });
        });
    }
}
ConnectionFactory.stores = ['Tikets'];
ConnectionFactory.version = 3;
ConnectionFactory.dbname = 'sistemaEstacionamento';
ConnectionFactory.connection = null;
//# sourceMappingURL=ConnectionFactory.js.map