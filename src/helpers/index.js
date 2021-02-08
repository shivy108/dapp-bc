export const ether = (n) => {
  return new web3.utils.toBN(web3.utils.toWei(n.toString(), "ether"));
};
export const tokens = (n) => {
  return ether(n);
};

export const EVM_REVERT = "VM Exception while processing transaction: revert";

export const ETHER_ADDRESS = "0x0000000000000000000000000000000000000000";
