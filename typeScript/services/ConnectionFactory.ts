export abstract class ConnectionFactory
{
    private static stores: Array<string> = ['Tikets'];
    private static version: number = 3;
    private static dbname: string = 'sistemaEstacionamento';
    private static metodoCloseConnection: Function | null;
    private static connection: IDBDatabase | null = null;

    public static getConnection(){
        return new Promise((resolve, reject) => {
            const openRequest = window.indexedDB.open(
                this.dbname, 
                this.version
            );
    
            openRequest.onupgradeneeded = e =>  {
    
                const target = e.target as IDBRequest;
    
                this.createStores(target.result);
    
                
            }
    
            openRequest.onsuccess = e => {

                if(!this.connection){
                    const target = e.target as IDBRequest;
                    this.connection = target.result;
                    this.metodoCloseConnection = this.connection?.close.bind(this.connection);

                    if(this.connection){
                        this.connection.close = () => {
                            throw new Error('Você não pode fechar diretamente a conexão');
                        }
                    }                   
                }

                resolve(this.connection);
            }
    
            openRequest.onerror = e => {
                const target = e.target as IDBRequest;

                console.log(target.error);
                reject(target.error?.name);
            }
        })
    }

    public static closeConnection() {

        if(this.connection && this.metodoCloseConnection) {
            this.metodoCloseConnection();
            this.connection = null;
            this.metodoCloseConnection = null;
        }
    }

    private static createStores(connection: IDBDatabase)
    {
        this.stores.forEach( store => {
            if(connection.objectStoreNames.contains(store)){
                connection.deleteObjectStore(store);
            }

            connection.createObjectStore(store, {autoIncrement: true});
        } ); 
    }
}