import { merchantsStoreStateType } from "@/types";
import { defineStore } from "pinia";
import axios from "axios";
import Merchant from "@/models/Merchant";

const instance = axios.create({
    baseURL: "http://localhost:8000/api",
});

export default defineStore("merchants", {
    state: (): merchantsStoreStateType => ({
        merchants: [],
    }),
    getters: {
        getMerchants: (state) => state.merchants,
    },
    actions: {
        async fetchMerchants() {
            try {
                const response = await instance.get("/merchants");
                this.merchants = response.data.data.map((merchant: any) =>
                    Merchant.fromObject(merchant)
                );
            } catch (error) {
                console.log(error);
            }
        },
    },
});
