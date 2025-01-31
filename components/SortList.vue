<template>
  <div class="flex flex-col md:flex-row md:justify-between gap-2">
    <div class="flex flex-col md:flex-row gap-[6px] md:w-[30%]">
      <v-select
        v-model="selectedNftTypes"
        :items="nftTypesSelect"
        label="Filter by NFT Type"
        multiple
        dark
        class="bg-[#00C6ED] my-0 border-solid border-[#00C6ED] border-[2px] rounded-[14px] px-[10px] md:w-[60%] mr-[15px]"
        hide-details
      />
      <v-select
        v-model="selectedView"
        :items="views"
        label="Selected view"
        dark
        class="bg-[#00C6ED] my-0 border-solid border-[#00C6ED] border-[2px] rounded-[14px] px-[10px] md:w-[40%]"
        hide-details
      />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { NFTType } from '~/models/marketplace';
import { NFTTypeFilter, ViewType } from '~/store/marketplace/view/state';

@Component({
  watch: {
    selectedNftTypes: {
      handler: 'onSelectedNftTypesChange',
    },
  },
})
export default class SortList extends Vue {
  selectedNftTypes: NFTTypeFilter[] = [];

  get selectedView () {
    return this.$store.state.marketplace.view.viewType;
  }

  set selectedView (viewType) {
    this.$store.commit('marketplace/view/setView', viewType);
  }

  onSelectedNftTypesChange (filters: NFTTypeFilter[]) {
    this.$store.commit('marketplace/view/setFilter', filters);
  }

  get nftTypesSelect () {
    const wrapTextValue = (type: NFTType) =>
      (val: string): { text: string, value: NFTTypeFilter } =>
        ({ text: val, value: { type, name: val } });

    const luckyBoxes = (this.$store.getters['luckyboxes/typesNames'] ?? []).map(wrapTextValue(NFTType.LuckyBox));
    const nodeTypes = (this.$store.getters['nodes/nodeTypesNames'] ?? []).map(wrapTextValue(NFTType.Node));

    return [
      { header: 'Luckyboxes' },
      ...luckyBoxes,
      { header: 'Nodes' },
      ...nodeTypes,
    ];
  }

  get views () {
    return [
      { text: 'Latest deals', value: ViewType.Latest },
      { text: 'My NFTs', value: ViewType.MyNFTs },
      { text: '- to + Value', value: ViewType.AscValue },
      { text: '+ to - Value', value: ViewType.DescValue },
      { text: 'Expiring soon', value: ViewType.ExpiringSoon },
    ];
  }
}
</script>
