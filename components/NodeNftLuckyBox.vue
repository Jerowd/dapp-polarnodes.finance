<template>
  <div v-if="name == `Olympus Lucky Box`" class="node-nft-Olympus" @click="onSelectNode">
    <div class="node-nft__title text-[orange] d-flex align-center justify-center">
      {{ name }}
    </div>
    <div class="divider" />

    <img
      :src="image"
      class="node-image"
    >

    <div class="divider" />

    <div class="node-nft__footer d-flex align-center justify-center">
      <span class="node-nft__blue-text_Olympus text-[orange] mr-1">Cost: </span>
      {{ price ? `${price} $POLAR` : "-" }}
    </div>
  </div>
  <div v-else class="node-nft" @click="onSelectNode">
    <div class="node-nft__title d-flex align-center justify-center">
      {{ name }}
    </div>
    <div class="divider" />

    <img
      :src="image"
      class="node-image"
    >

    <div class="divider" />

    <div class="node-nft__footer d-flex align-center justify-center">
      <span class="node-nft__blue-text mr-1">Cost: </span>
      {{ price ? `${price} $POLAR` : "-" }}
    </div>
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue';
import { Component, Vue } from 'nuxt-property-decorator';
import * as ethers from 'ethers';
import { NodeNftNames } from '~/models/types';
import { LUCKYBOX_INDEX_TO_IMAGE } from '~/models/constants';

@Component({
  props: {
    index: { type: Number },
    name: { type: String as PropType<NodeNftNames> },
    cost: { type: ethers.BigNumber },
  },
})
export default class NodeNft extends Vue {
  public onSelectNode () {
    this.$router.push(`/luckybox/${this.$props.index}`);
  }

  get image (): any {
    return (LUCKYBOX_INDEX_TO_IMAGE as any)[this.$props.index];
  }

  get price () {
    return this.$props.cost ? ethers.utils.formatEther(this.$props.cost) : null;
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
  flex-grow: 0;
  background-color: rgba(255, 255, 255, 0.1);
}

.node-nft:hover {
  box-shadow: 0 0 2x 2px rgba(0, 198, 237, 0.5);
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
    margin-bottom:10px;
}
.node-nft__blue-text_Olympus {
  color: orange;
}
.node-nft-Olympus:hover {
  box-shadow: 0 0 2px 2px orange;
}
.node-nft__title {
  font-size: 16px;
  height: 58px;
}

.node-nft__footer {
  height: 55px;
}

.node-nft__blue-text {
  color: #00c6ed;
}
</style>
