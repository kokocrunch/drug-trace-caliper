# drug-trace-caliper

## Install Caliper
Reference: https://hyperledger.github.io/caliper/v0.4.2/fabric-tutorial/tutorials-fabric-existing/
```
npm install --only=prod @hyperledger/caliper-cli@0.4.2
npx caliper bind --caliper-bind-sut fabric:2.2
```

## Prepare network
1) Start fabric test network and deploy chaincode. <br/>
2) Change **clientPrivateKey** under **networks/config.yaml** to match key located at **\test-network\organizations\peerOrganizations\org1.example.com\users\User1@org1.example.com\msp\keystore**

## Run the Caliper benchmark
Command below runs a test benchmark.
```
npx caliper launch manager --caliper-workspace ./ --caliper-networkconfig networks/config.yaml --caliper-benchconfig benchmarks/test.yaml --caliper-flow-only-test --caliper-fabric-gateway-enabled
```