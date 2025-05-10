import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre from "hardhat";

// We define a fixture to reuse the same setup in every test.
// We use loadFixture to run this setup once, snapshot that state,
// and reset Hardhat Network to that snapshot in every test.
async function deployERCrefundFixture() {
    const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
   
    const unlockTime = (await time.latest()) + ONE_YEAR_IN_SECS;

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const ERCRefund = await hre.ethers.getContractFactory("ERCRefund");
    const ercRefund = await ERCRefund.deploy();

    return { ercRefund, owner, otherAccount };
};


describe("ERCRefund", function () {
  describe("Deployment", function () {
    it("should set the initial values correctly", async function () {
      const { ercRefund , owner} = await loadFixture(deployERCrefundFixture);
      expect(await ercRefund.owner()).to.equal(owner.address);
    })


  });
});
  