import { useEffect, useState } from "react";
import {
  useAccount,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useContractRead,
} from "wagmi";
import { formatEther } from "viem";

function onlyUnique(value, index, array) {
  return array.indexOf(value) === index;
}

export default function Home() {
  const [userAddress, setUserAddress] = useState("");
  const { address, isConnected } = useAccount();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (isConnected && address) {
      setUserAddress(address);
    }
  }, [address, isConnected]);

  const contractAddress = "0xA00A299d264d4d5F8164AeCB78A9127cfA8F3a2E";
  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: [
      {
        inputs: [],
        name: "addGmer",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "payable",
        type: "function",
      },
    ],
    value: 10000000000000000n,
    functionName: "addGmer",
    chainId: 44787,
  });
  const { data, write } = useContractWrite(config);
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  const [gmers, setGmers] = useState(0);
  const [gameTime, setGameTime] = useState(0);
  const [gamePool, setGamePool] = useState(0);
  const { gmData } = useContractRead({
    address: contractAddress,
    abi: [
      {
        inputs: [],
        name: "getGameInfo",
        outputs: [
          {
            internalType: "uint256[]",
            name: "gameTimeLeft",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "gamePool",
            type: "uint256",
          },
          {
            internalType: "address[]",
            name: "arrGmers",
            type: "address[]",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ],
    functionName: "getGameInfo",
    chainId: 44787,
    watch: true,
    onSuccess(gmData) {
      setGameTime(Number(gmData[0]));
      setGamePool(formatEther(gmData[1]));
      setGmers(gmData[2]);
    },
  });

  return (
    <div className="flex flex-col justify-center items-center">
      <div class="relative flex flex-col justify-center overflow-hidden py-6 sm:py-12">
        <div class="relative bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
          <div class="mx-auto max-w-md">
            <div class="space-y-6 py-8 text-base leading-7 text-gray-600">
              <h1 className="text-xl">
                Welcome to - <strong>GM 2 Earn</strong>!
              </h1>
              <p>
                gm2earn is a small example built on celo-composer showcasing the
                new Opera MiniPay Celo wallet.
              </p>

              {!isConnected && (
                <ul class="space-y-4">
                  <li class="flex items-center">
                    <p class="ml-4">Connect your wallet to get started.</p>
                  </li>
                </ul>
              )}
            </div>
            <div class="pt-8 text-base font-semibold leading-7">
              <div>
                <div className="h1">
                  Current prize pool:{" "}
                  <strong class="text-xl">{gamePool} CELO</strong>
                </div>
                <div className="h1">
                  Game terms: 5 hours to go (
                  {new Date(gameTime * 1000).getUTCDate})<br />
                  cost2play : 0.01 A-CELO
                  <br />
                </div>
                <hr />

                {gmers && (
                  <ol>
                    <p>
                      <strong>
                        {gmers &&
                          gmers.length &&
                          gmers.filter(onlyUnique).length}
                      </strong>{" "}
                      GMers playing, <strong>{gmers.length}</strong> total GMs!
                    </p>
                    {gmers.filter(onlyUnique).map((address, i) => {
                      return (
                        <li key={i}>
                          {address == userAddress && <strong>you</strong>}
                          {address !== userAddress && address}
                        </li>
                      );
                    })}
                  </ol>
                )}
              </div>
              {isConnected && (
                <>
                  <button
                    class="rounded-md bg-prosperity py-2 px-4"
                    disabled={!write || isLoading}
                    onClick={() => write?.()}
                  >
                    {!isLoading ? "GM" : "GMing..."}
                  </button>
                  {isSuccess && (
                    <div>
                      GM! You've joined the game!
                      <div>
                        <a href={`https://celoscan.io/tx/${data?.hash}`}>
                          <small>( view tx )</small>
                        </a>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
