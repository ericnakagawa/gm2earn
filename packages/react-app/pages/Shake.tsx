import { useEffect, useState } from "react";
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

export default function Shake() {
  const { config } = usePrepareContractWrite({
    address: '0xdb8249173F9826842d886AaB01e598C4f4d45f9E',
    abi: [
      {
        "inputs": [],
        "name": "addShaker",
        "outputs": [
          {
            "internalType": "address[]",
            "name": "",
            "type": "address[]"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
    ],
    functionName: 'addShaker',
  })
  const { data, write } = useContractWrite(config)
 
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })
 
  return (
    <div>
      <button disabled={!write || isLoading} onClick={() => write()}>
        {isLoading ? 'Shaking...' : 'Shake'}
      </button>
      {isSuccess && (
        <div>
          Successfully joined the Shake off!
          <div>
            <a href={`https://celoscan.io/tx/${data?.hash}`}>Celoscan</a>
          </div>
        </div>
      )}
    </div>
  )
}

