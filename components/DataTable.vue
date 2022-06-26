<template>
  <v-card
    class="
      flex flex-col
      flex2
      bg-[#17171B]
      rounded-[12px]
      border-none
      h-[100%]
      min-width-[2000px]
      mb-[30px]
      md:mb-[0px]
      display inline-block
    "
  >
    <v-card-title class="justify-center text-[14px] text-[#8a8c8f]">
      <div class="flex justify-center text-[14px] ">
        <img class="mr-[5px]" :src="_icon" alt="">
        <span class="text-[14px] text-[#FFFFFF]">{{ _title }}</span>
      </div>
    </v-card-title>
    <v-card-text class="pl-[16px]">
      <div
        v-if="_title === `$POLAR Price`"
        class="flex justify-center text-[24px] text-[#FFFFFF]"
      >
        <div class="flex-col justify-right text-[24px] text-[#FFFFFF] mr-[10px]">
          {{ (_price !== null) ? `$${_price}` : '-' }}
        </div>
        <div :class="(_percentage < 0) ? 'flex-col justify-center text-red-600' : 'text-green-400'">
          {{ (_percentage !== null) ? `${_percentage.toFixed(2)}%` : '-' }}
        </div>
      </div>

      <div
        v-if="_title === `Market Cap`"
        class="flex justify-center text-[24px] text-[#FFFFFF] "
      >
        <div class="flex-col justify-center text-[24px] text-[#FFFFFF] ">
          ${{ (_price !== null) ? _price.toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '-' }}
        </div>
      </div>

      <div
        v-if="_title === `Total Supply`"
        class="flex justify-center text-[24px] text-[#FFFFFF] "
      >
        <div class="text-[24px] text-[#FFFFFF] ">
          {{ (_price !== null) ? _price.toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '-' }}
        </div>
      </div>

      <div
        v-if="_title === `Total Nodes`"
        class="flex justify-center text-[24px] text-[#FFFFFF] "
      >
        <div class="text-[24px] text-[#FFFFFF] ">
          {{ (_price !== null) ? _price.toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '-' }}
        </div>
      </div>

      <div
        v-if="_title === `My Nodes`"
        class="flex justify-center text-[24px] text-[#FFFFFF]"
      >
        <div class="flex-col justify-center text-[24px] text-[#FFFFFF] ">
          {{ (_price !== null) ? _price.toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '-' }}
        </div>
      </div>

      <div
        v-if="_title === `My $POLAR Balance`"
        class="flex justify-center text-[24px] text-[#FFFFFF]"
      >
        <div class="text-[24px] text-[#FFFFFF]">
          {{ (_price !== null) ? parseFloat(_price).toFixed(2) + ' $POLAR' : '-' }}
        </div>
      </div>
      <div
        v-if="_title === `Daily Rewards`"
        class="flex justify-center text-[24px] text-[#FFFFFF] "
      >
        <div class="text-[24px] text-[#FFFFFF] ">
          {{ (_price !== null) ? parseFloat(_price).toFixed(2) + ' $POLAR' : '-' }}
        </div>
      </div>
      <div
        v-if="_title === `Pending Rewards`"
        class="flex justify-center text-[24px] text-[#FFFFFF] mr-[16px]"
      >
        <div class="flex justify-center text-[24px] text-[#FFFFFF] ">
          {{ (_price !== null) ? parseFloat(_price).toFixed(4) + ' $POLAR' : '-' }}
        </div>
        <div class="flex justify-center text-[14px] text-[#FFFFFF] ">
          (including ROI tax)
        </div>
      </div>
      <div
        v-if="_title === `Pending Rewards` || _title === `Daily Rewards` || _title === `My $POLAR Balance`"
        class="flex justify-center text-[12px] text-[#00c6ed] mt-[5px]">
        {{ (_price !== null) ? (parseFloat(_price_in_dollar/1000000000000000000).toFixed(2)) + ' $' : '-' }}
      </div>
        <div
        v-if="_title === `Total Nodes` && _boolDisplay===`true`"
        class="flex justify-center text-[12px] text-[#00c6ed] mt-[5px]">
         <br/>
      </div>
      <div
        v-if="_title === `My Nodes`"
        class="flex justify-center text-[12px] text-[#00c6ed] mt-[5px]">
         <br/>
      </div>
    </v-card-text>
  </v-card>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import * as eth from 'ethers';
import { BigNumber } from 'ethers';

@Component({
  props: {
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    price: {
      type: [Number, BigNumber],
    },
    price_in_dollar: {
      type: [Number, BigNumber],
    },
    percentage: {
      type: Number,
    },
    boolDisplay: {
      type: String,
    },
  },
})
export default class DataTable extends Vue {
  get _title () {
    return this.$props.title;
  }

  get _icon () {
    return this.$props.icon;
  }

  get _price () {
    if (BigNumber.isBigNumber(this.$props.price)) {
      return eth.utils.formatEther(this.$props.price);
    }

    return this.$props.price;
  }

  get _price_in_dollar () {
    if (BigNumber.isBigNumber(this.$props.price_in_dollar)) {
      return eth.utils.formatEther(this.$props.price_in_dollar);
    }

    return this.$props.price_in_dollar;
  }

  get _percentage () {
    return this.$props.percentage;
  }

  get _boolDisplay () {
    return this.$props.boolDisplay;
  }
}
</script>
