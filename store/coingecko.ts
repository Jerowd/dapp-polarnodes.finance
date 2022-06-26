import { MutationTree, ActionTree, GetterTree } from 'vuex';
import axios from 'axios';

export const state = () => ({
  price: null as (number | null),
  percentage24h: null as (number | null),
  marketCap: null as (number | null),
  totalSupply: 3600000 as (number | null),
});

type State = ReturnType<typeof state>;

export const getters: GetterTree<State, {}> = {
  isDataReady: store => !!store.price && !!store.percentage24h && !!store.marketCap && !!store.totalSupply,
};

export const mutations: MutationTree<State> = {
  setPrice (state, price: number) {
    state.price = price;
  },

  setPercentage24h (state, percentage24h: number) {
    state.percentage24h = percentage24h;
  },

  setMarketCap (state, marketCap: number) {
    state.marketCap = marketCap;
  },

  setTotalSupply (state, totalSupply: number) {
    state.totalSupply = totalSupply;
  },
};

export const actions: ActionTree<State, {}> = {
  async loadCoinData ({ commit }) {
    await axios
      .get(
        'https://api.dexscreener.com/latest/dex/tokens/0x6C1c0319d8dDcb0ffE1a68C5b3829Fd361587DB4', { headers: { 'Access-Control-Allow-Origin': '*' } }
      )
      .then((response: any) => {
        const keyArray = Object.keys(response.data);
        commit('setPrice', Number(response.data[keyArray[1]][0].priceUsd));
        commit('setPercentage24h', response.data[keyArray[1]][0]['priceChange'].h24);
        commit('setMarketCap', response.data[keyArray[1]][0]['fdv']);
      });
  },
};