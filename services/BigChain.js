const driver = require('bigchaindb-driver')
const https = require('https')
const fetch = require('fetch').fetchUrl;

const API_PATH = 'https://test.ipdb.io/api/v1/';

class BigChain {

    constructor(key) {
        this.key = key;
        this.conn = new driver.Connection(API_PATH)

    }

    static generateKey() {
        return new driver.Ed25519Keypair();
    }


    async create(obj) {
        console.log(this.key);

        const tx = driver.Transaction.makeCreateTransaction(
            {...obj},

            {
                what: 'My first BigchainDB transaction'
            }
            ,

            // A transaction needs an output
            [driver.Transaction.makeOutput(
                driver.Transaction.makeEd25519Condition(this.key.publicKey))
            ],
            this.key.publicKey
        )


        const txSigned = driver.Transaction.signTransaction(tx, this.key.privateKey)
        const retrievedTx = await this.conn.postTransactionCommit(txSigned)
        return retrievedTx;

    }


    async getDocs() {
        const docs = await this.conn.listOutputs(this.key.publicKey, false);
        // let objs = await Promise.all(
        //     docs.map(async function(item){
        //         const response = await fetch(`https://test.ipdb.io/api/v1/transactions/${item.transaction_id}`);
        //         return body;
        //     })
        // );
        return docs;

        // const x = docs.map(async (item )=> {
        //     return await request(`https://test.ipdb.io/api/v1/transactions/${item.transaction_id}`, function (err, res, body) {
        //         return body;
        //     })
        //
        //
        // })
        // console.log(objs);
    }

    async getDocsData(item, index) {

        const response = await fetch(`https://test.ipdb.io/api/v1/transactions/${item.transaction_id}`);
        console.log(response);
        const body = await response.json();
        return body;
    }

    // return objs;
}


module.exports = BigChain