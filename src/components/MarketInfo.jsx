import { formattedNumber } from "../utilis";

export function MarketInfo({title, value}) {


    return(
        <div className="bg-blue-900 rounded-2xl flex flex-col items-center justify-center gap-y-6 p-6">
            <h4 className="text-white text-xl font-bold uppercase">{title}</h4>
            <span className="text-white text-3xl font-bold">{value > 100000 ? formattedNumber(value) : value}{title === 'marketCap' || title === 'volume' ? '' : '%'}</span>
        </div>
    )
} 