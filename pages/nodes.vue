<template>
  <div class="flex flex-col md:mx-[197px] mx-[10%] mt-[30px] md:mt-4">
    <span class="text-[24px] text-white">Node Station 🚉️</span>
    <div class="md:inline-flex flex-wrap gap-2 md:gap-[24px] mt-[32px]">
      <DataTable
        v-for="(item, i) in nodeStation"
        :key="i"
        :title="item.title"
        :icon="item.icon"
        :price="item.price"
        :price_in_dollar="item.price_in_dollar"
        :percentage="item.percentage"
        :boolDisplay="item.boolDisplay"
      />
    </div>
    <span class="mt-[64px] text-[24px] text-white">Create Node 🗻️</span>
    <div
      v-if="nodeNames && nodeNames.length > 0"
      class="md:flex flex-wrap gap-2 md:gap-[24px] my-[32px]"
      style="color: white"
    >
      <NodeNft
        v-for="(node, i) of nodeNames"
        :key="`${node}-${i}`"
        :name="node"
      />
    </div>
    <div
      v-else
      class="md:flex flex-wrap gap-2 md:gap-[24px] my-[32px]"
      style="color: white"
    >
      <NodeNftLoading v-for="index of 5" :key="`loading-node-${index}`" />  
    </div>
    <span ref="lucky-box" class="mt-[64px] text-[24px] text-white">Node Lucky Boxes 📦️</span>
    <div
      v-if="this.isWalletConnected"
      class="md:flex flex-wrap gap-2 md:gap-[24px] my-[32px]"
      style="color: white"
    >
      <NodeNftLuckyBox
        v-for="({ id, name, price }) of luckyBoxesList"
        :key="`${name}-${id}`"
        :index="id"
        :name="name"
        :cost="price"
      />
    </div>
    <div
      v-else="this.isWalletConnected"
      class="md:flex flex-wrap gap-2 md:gap-[24px] my-[32px]"
      style="color: white"
    >
     <NodeNftLoading v-for="index of 8" :key="`loading-node-${index}`" />  
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator';
import WalletReactiveFetch, { IReactiveFetch } from '~/mixins/wallet-reactive-fetch';
import addresses from '~/config/addresses'

@Component
export default class Nodes extends WalletReactiveFetch implements IReactiveFetch {
  mounted () {
    if (window.location.hash && window.location.hash === '#lucky-box') {
      const el = this.$refs['lucky-box'];

      if (el) {
        (el as any).scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  get nodeStation () {
    return [
      {
        icon: require('../assets/img/nodesIcon/totalnodes_icon.svg'),
        title: 'Total Nodes',
        price: this.$store.getters['nodes/totalCreated'],
        percentage: null,
        boolDisplay: 'true',
      },
      {
        icon: require('../assets/img/nodesIcon/mynodes_icon.svg'),
        title: 'My Nodes',
        price: this.isWalletConnected ? this.$store.getters['nodes/myTotalCreated'] : null,
        percentage: null,
        boolDisplay: null,
      },
      {
        icon: require('../assets/img/nodesIcon/polarbalance_icon.svg'),
        title: 'My $POLAR Balance',
        price: this.isWalletConnected ? this.$store.getters['tokens/balanceForToken'](addresses.Token) : null,
        price_in_dollar: (this.isWalletConnected ? this.$store.getters['tokens/balanceForToken'](addresses.Token) : null) * this.$store.state.coingecko.price,
        percentage: null,
        boolDisplay: null,
      },
    ];
  }

  get luckyBoxesList () {
    return this.$store.state.luckyboxes.luckyBoxTypes ?? [];
  }

  get nodeNames () {
    return this.$store.getters['nodes/nodeTypesNames'];
  }

  async reactiveFetch () {
    await Promise.all([
      this.$store.dispatch('nodes/loadNodeTypes'),
      this.$store.dispatch('luckyboxes/loadLuckyBoxTypes'),
      ...(
        (this.isWalletConnected)
          ? [
              this.$store.dispatch('tokens/loadBalance', addresses.Token),            ]
          : []),
    ]);
  }
}
</script>
