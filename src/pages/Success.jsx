import { useCrypto } from "../context/crypto-context";

export function Success() {
    const {callbackData} = useCrypto();

    return (
        <div className="success">
            <h2 className="success__title _title">Success!</h2>
            <ul className="grid grid-cols-1 gap-1 mt-5">
                {Object.entries(callbackData).map((key ) => 
                    
                    
                    <li className="grid grid-cols-2 border-2 border-blue-300">
                        <span className="border-r-2 border-blue-300 px-3 py-2">{key[0]}</span>
                        <span className=" px-3 py-2">{key[1]}</span>
                    </li>
                )}
            </ul>
        </div>
    );
}