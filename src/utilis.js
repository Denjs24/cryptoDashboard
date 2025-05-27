export function percentDifference(a, b){
    return (100 * Math.abs((a - b) / ((a + b) / 2))).toFixed(2);
};

export function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.substr(1);
}

export function splitNumber(num){
    const parts = num.toFixed(2).split('.');
    // if (+(parts[1]) == 0) {
    //     parts[1] = undefined;
    // }
    const integerPart = parts[0].replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
    return `${integerPart}`;
}

export function getToTimeStamp(date = new Date()) {
    const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate()-1);
    return startOfDay.getTime();
}

export function reduceAddress(address) {
  if (!address || address.length < 10) return address;
  return `${address.slice(0, 5)}...${address.slice(-5)}`
}

export function mapAssets(assets, crypto) {
    return assets.map((asset) => {
        const coin = crypto.find((c) => c.id == asset.id);
        return {
            grow: asset.price < coin.price,
            growPercent: percentDifference(asset.price, coin.price),
            totalAmount: asset.amount * coin.price,
            totalProfit: asset.amount * coin.price - asset.amount * asset.price,
            name: coin.name,
            symbol: coin.symbol,
            ...asset,
        };
    });
}