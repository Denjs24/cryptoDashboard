import { useAccount, useEnsName } from "wagmi";
import { useCopyToClipboard } from "../shared/hooks/useCopyToClipboard";
import { reduceAddress } from "../utilis";
import { useNavigation } from "../shared/hooks/useNavigation";
import { useEffect } from "react";
import { FaCopy } from "react-icons/fa";

export const Profile = () => {
    const {address, isConnected} = useAccount()
    const { data, error, status } = useEnsName({ address })
    const {copyed, copyToClipboard} = useCopyToClipboard()
    const navigate = useNavigation()
    
    if (!isConnected) {
        return(
            <div className="loading">
                <h1 style={{fontSize: '32px', fontWeight: '600'}}>Not connected wallet!</h1>
            </div>
        )
    }

    // useEffect(() => {
    //     if (!isConnected) {
    //         navigate.to('/')
    //     }
        
    // }, [isConnected]);

    return (
        <div className="profile">
            {data && <h1>ENS Name: {data}</h1>}
            <h2>Address:  
                {address ? reduceAddress(address) : null}
                <button type="button" onClick={() => copyToClipboard(address)} style={{fontSize: '20px', marginLeft: '10px'}}>
                    <FaCopy />
                </button>
            </h2>
            <p>Profile page content goes here.</p>
        </div>
    )
}