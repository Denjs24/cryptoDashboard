export function TableTopItem ({coin, index}){


    return(
        <div className="flex gap-x-2 items-center">
            <span className="text-base text-gray-200 font-bold basis-6">{index}</span>
            <div className="flex items-center gap-x-2 flex-auto">
                <img src={coin.icon} alt="Icon" className="w-6 h-6 basis-6" />
                <span className="text-lg text-white flex-auto font-medium">{coin.name}</span>
            </div>
            <span className="text-lg text-white basis-[100px]">{coin.price < 1000 ? coin.price.toFixed(2) : coin.price.toFixed(0)}$</span>
            <span className={'basis-[70px] text-lg text-right'}>
                {/* {coin.priceChange1d ? coin.priceChange1d + '%' : "No data!"} */}
                <span className={(+coin.priceChange1d) < 0 ?  'text-red-600' : "text-green-600"}>
                    {coin.priceChange1d}%
                </span>
            </span>
        </div>
    )
}