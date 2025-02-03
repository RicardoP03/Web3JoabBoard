require("dotenv").config();

async function main() {
    const privateKey = process.env.PRIVATE_KEY;
    if (!privateKey) {
        console.error("Private key not found in .env file!");
        process.exit(1);
    }
  
    const ManageAccount = await ethers.getContractFactory("ManageAccount");
    const ManageAccountContract = await ManageAccount.deploy();
    const ManageAccountContractAddress = ManageAccountContract.target;
    console.log("ManageAccounts contract deployed to:", ManageAccountContractAddress);

    const ManageJob = await ethers.getContractFactory("ManageJob");
    const ManageJobContract = await ManageJob.deploy(ManageAccountContractAddress);
    const ManageJobContractAddress = ManageJobContract.target;
    console.log("ManageJobs contract deployed to:", ManageJobContractAddress);

    const ManageApplications = await ethers.getContractFactory("ManageApplications");
    const ManageApplicationsContract = await ManageApplications.deploy(ManageAccountContractAddress, ManageJobContractAddress);
    const ManageApplicationsContractAddress = ManageApplicationsContract.target;
    console.log("ManageApplications contract deployed to:", ManageApplicationsContractAddress);

}
  
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
  