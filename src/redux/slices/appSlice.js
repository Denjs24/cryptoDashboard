import { createSlice } from "@reduxjs/toolkit";
import { fakeFetchCrypto, getCurrency, getLocalStorageAssets, setLocalStorageAssets } from "../../api";

const currency = await getCurrency();

const initialState = {
    loading: true, // poka zagryzka
    crypto: await fakeFetchCrypto(1, 100) || [],
    assets: await getLocalStorageAssets || [],
    currency: currency || [],
    activeCurrency: currency.find(curr => curr.name == "USD") || {},
    callbackData: {},
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        changeLoading(state){
            console.log(state);
            state.loading = false;
            console.log(state);
            // state = {...state, loading: false}
        },
        addAsset(state, action){
            const newAsset = action.payload
            state.assets = mapAssets([state.assets, newAsset], state.crypto)
            localStorage.setItem('assets', JSON.stringify(state.assets))
            // localStorage.setItem('assets', JSON.stringify([...state.assets, newAsset]))
        },
        removeAsset(state, action){
            state.assets = state.assets.filter(asset => asset.name !== action.payload)
            setLocalStorageAssets(filteredAssets)
        },
        changeCurrency(state, action){
            state.activeCurrency = action.payload
        },
        changeCallbackData(state, action){
            state.callbackData = action.payload;
        }
    }
})

export const {addAsset, removeAsset, changeCallbackData, changeCurrency, changeLoading} = appSlice.actions;
export default appSlice.reducer;