<template>
  <div v-if="name == `Olympus`" class="node-nft-Olympus" @click="onSelectNode">
    <div class="node-nft__title text-[orange]">
      {{ name }}
    </div>
    <div class="node-nft__blue-text_Olympus my-1">
      Earn {{ dailyEarnings }} $POLAR / day
    </div>
    <div class="divider mt-2" />

    <img :src="image" class="node-image">

    <div class="divider" />

    <div class="inline-block text-left">
      <div class="mt-2">
        <span class="node-nft__blue-text_Olympus">Cost: </span>
        {{ cost }} $POLAR
      </div>
      <div class="mt-1">
        <span class="node-nft__blue-text_Olympus">Tax before ROI</span>
        {{ claimTax }}%
      </div>
      <div class="mt-1">
        <span class="node-nft__blue-text_Olympus">Tax after ROI</span>
        {{ globalTax }}%
      </div>
    </div>
  </div>
  <div v-else class="node-nft" @click="onSelectNode">
    <div class="node-nft__title">
      {{ name }}
    </div>
    <div class="node-nft__blue-text my-1">
      Earn {{ dailyEarnings }} $POLAR / day
    </div>
    <div class="divider mt-2" />

    <img :src="image" class="node-image">

    <div class="divider" />

    <div class="inline-block text-left">
      <div class="mt-2">
        <span class="node-nft__blue-text">Cost: </span>
        {{ cost }} $POLAR
      </div>
      <div class="mt-1">
        <span class="node-nft__blue-text">Tax before ROI</span>
        {{ claimTax }}%
      </div>
      <div class="mt-1">
        <span class="node-nft__blue-text">Tax after ROI</span>
        {{ globalTax }}%
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import * as eth from 'ethers';
import * as NodeType from '~/models/NodeType';
import { NAME_TO_URL, NODENAME_TO_IMAGE } from '~/models/constants';

const formatEther = eth.utils.formatEther;

@Component({
  props: {
    name: { type: String },
  },
})
export default class NodeNft extends Vue {
  public onSelectNode () {
    this.$router.push(
      `/create/${(NAME_TO_URL as any)[this.$props.name]}`
    );
  }

  get image (): any {
    return (NODENAME_TO_IMAGE as any)[this.$props.name];
  }

  get nodeType () {
    return this.$store.getters['nodes/nodeTypeByName'](this.$props.name);
  }

  get dailyEarnings () {
    return parseFloat(formatEther(NodeType.dailyRewardPerNode(this.nodeType))).toFixed(2);
  }

  get cost () {
    return formatEther(this.nodeType.cost);
  }

  get claimTax () {
    return this.nodeType.claimTax;
  }

  get globalTax () {
    return this.nodeType.globalTax;
  }
}
</script>

<style scoped>
.node-image {
  width: 100%;
  height: 70%;
  object-fit: cover;
}

.divider {
  height: 1px;
  flex-grow: 1;
  background-color: rgba(255, 255, 255, 0.1);
}

.node-nft:hover {
  box-shadow: 0 0 2px 2px rgba(0, 198, 237, 0.5);
}
.node-nft-Olympus:hover {
  box-shadow: 0 0 2px 2px orange;
}


.node-nft {
  min-width: 160px;
  max-width: 100%;
  cursor: pointer;
  text-align: center;
  font-size: 12px;
  height: 400px;
  padding: 12px 0;
  border-radius: 14px;
  border: solid 1px #00c6ed;
  background-color: #17171b;
  font-family: WorkSans;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #fff;
  margin-bottom:10px;
}
.node-nft-Olympus {
  min-width: 160px;
  max-width: 100%;
  cursor: pointer;
  text-align: center;
  font-size: 12px;
  height: 400px;
  padding: 12px 0;
  border-radius: 14px;
  border: solid 1px orange;
  background-color: #17171b;
  font-family: WorkSans;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #fff;
}

.node-nft__title {
  font-size: 16px;
}

.node-nft__blue-text {
  color: #00c6ed;
}
.node-nft__blue-text_Olympus {
  color: orange;
}
</style>
