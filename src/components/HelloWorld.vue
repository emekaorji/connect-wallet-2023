<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Web3 from 'web3'

defineProps<{ msg: string }>()

const address = ref('')
const amount = ref('')

const connectWallet = async () => {
  let primaryAccount;
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' }) as string[]
      primaryAccount = accounts[0];
    } catch (error) {
      console.log('User denied access:', error)
    }
  } else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider)
    const accounts = await window.web3.eth.getAccounts()
    primaryAccount = accounts[0];
  } else {
    console.warn('Buuuzz! Non-ethereum browser detected. Install metamask on Chrome or Firefox, or use the Opera Crypto Browser, or Brave or something else')
  }

  if (primaryAccount) {
    address.value = primaryAccount
    window.web3 = new Web3(window.ethereum)
    const balance = await window.web3.eth.getBalance(primaryAccount)
    const balanceInEther = window.web3.utils.fromWei(balance, 'ether')
    amount.value = balanceInEther
  }
}


onMounted(() => {
  connectWallet();
})
</script>

<template>
  <h1>{{ msg }}</h1>
  <p>Account Address: {{ address }}</p>
  <p>Amount: {{ amount }} ethers</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
