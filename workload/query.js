'use strict';

const { WorkloadModuleBase } = require('@hyperledger/caliper-core');

class QueryWorkload extends WorkloadModuleBase {
    constructor() {
        super();
    }

    async initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext) {
        await super.initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext);

        for (let i = 0; i < this.roundArguments.assets; i++) {
            const batchNum = `${this.workerIndex}_${i}`;
            console.log(`Worker ${this.workerIndex} transferring drug batch ${batchNum}.`)
            const myArgs = {
                contractId: this.roundArguments.contractId,
                contractFunction: 'addDrug',
                invokerIdentity: 'User1',
                contractArguments: [`{"batchNum":"${batchNum}","description":"Ascorbic Acid","quantity":"5","expiry":"2022-10-29","unitPrice":"1200","manufacturer":"manufacturer1","distributor":"distributor1","distributorId":"D1"}`],
                readOnly: false
            };
            await this.sutAdapter.sendRequests(myArgs);
        }
    }

    async submitTransaction() {
        const batch = Math.floor(Math.random() * this.roundArguments.assets);
        const myArgs = {
            contractId: this.roundArguments.contractId,
            contractFunction: 'queryBatch',
            invokerIdentity: 'User1',
            contractArguments: [`${this.workerIndex}_${batch}`],
            readOnly: true
        };
        await this.sutAdapter.sendRequests(myArgs);
    }

    async cleanupWorkloadModule() {
        for (let i = 0; i < this.roundArguments.assets; i++) {
            const batch = `${this.workerIndex}_${i}`;
            console.log(`Worker ${this.workerIndex}: Deleting asset ${batch}`);
            const request = {
                contractId: this.roundArguments.contractId,
                contractFunction: 'deleteData',
                invokerIdentity: 'User1',
                contractArguments: [batch],
                readOnly: false
            };

            await this.sutAdapter.sendRequests(request);
        }
    }
}

function createQueryWorkloadModule() {
    return new QueryWorkload();
}

module.exports.createWorkloadModule = createQueryWorkloadModule;