async function deploy() {
    const factory = await ethers.getContractFactory("Counter");
    const factory2 = await ethers.getContractFactory("Media");
    
    const contract = await factory.deploy();
    const contract2 = await factory2.deploy();

    await contract.waitForDeployment();
    await contract2.waitForDeployment();

    console.log("Contract addresses: " + await contract.getAddress() + " | " + await contract2.getAddress())
}

deploy().catch((err) => {
    console.error(err);
})
