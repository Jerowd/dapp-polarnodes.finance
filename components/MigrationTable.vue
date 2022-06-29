<template>
  <div class="display-center lg:w-[70%] md:w-[70%] sm:w-[100%] mb-[32px] md:min-w-[420px] ml-auto mr-auto">
    <div class="flex flex-col">
      <div class="flex justify-between bg-[#00C6ED]  rounded-t-lg p-[16px]  w-full">
        <div class="text-white text-[16px]">
          Migration Node
        </div>
      </div>
      <div class="mx-auto w-[100%]  p-[20px] rounded-b-lg bg-[#17171B]">
        <div class="flex-column align-baseline">
          <span class="text-[16px] text-[#00C6ED] mr-[16px] mt-[1px]">Type:</span>
          <div class="w-[100%]">
            <v-select
              :items="nodeList"
              item-value="nodeList"
              placeholder="Select NodeType"
              dense
              class="w-[100%] focus:border-none focus:outline-none "
              @change="changeNodeType"
            ></v-select>
          </div>
        </div>
        <div class="flex text-center md:w-[100%]">
          <div class="bg-[#00C6ED] border-solid border-[#00C6ED] border-[2px] rounded-l-[16px] text-[white] text-[14px] w-[70%] py-[8px] font-[600]">
            Old Node Counter:
          </div>
          <div class="flex justify-center border-solid border-[#00C6ED] border-[2px] rounded-r-[16px] text-[white] text-[14px] px-[2px] w-[30%]">
            <div class="p-[10px] md:py-[8px]">
              <span class="text-[white] text-[14px] font-[500]">{{ oldNodeCounter }}</span>
            </div>
          </div>
        </div>
        <div class="flex text-center md:w-[100%] mt-[10px]">
          <div class="flex justify-center bg-[#00C6ED] border-solid border-[#00C6ED] border-[2px] rounded-l-[16px] text-[white] text-[14px] text-[center] w-[70%] py-[8px] font-[600]">
            Select Node Counter:
          </div>
          <div class="flex justify-center border-solid border-[#00C6ED] border-[2px] rounded-r-[16px] text-[white] text-[14px] w-[30%]">
            <input
              v-model.number="migrationCounter"
              class="text-[white] text-[14px] font-[500] text-center w-[50%]"
              type="number"
              placeholder="select Number"
            >
          </div>
        </div>
        <div class="flex mt-[16px] justify-center md:w-[100%]">
          <button class="rounded-[14px] h-[33px] px-[42px]  border-solid border-[#00C6ED] border-[1px] hover:bg-[#00C6ED] text-center text-white w-[50%]" @click="onMigrate">
            Migrate
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component
export default class MigrationTable extends Vue {
  private nodeList = ['Fuji', 'Mont Blanc', 'Kilimanjaro', 'Ushuaia', 'Everest'];
  private oldNodeCounter = 0;
  private migrationCounter = 0;
  private selectedNodeType : string = '';

  changeNodeType (nodeType : string) {
    this.selectedNodeType = nodeType;
    this.oldNodeCounter = this.$store.getters['nodes/oldNodeCount'](nodeType);
  }

  async onMigrate () {
    await this.$store.dispatch('nodes/onMigration', { nodeType: this.selectedNodeType, nodeCounter: this.migrationCounter });
  }
}
</script>
