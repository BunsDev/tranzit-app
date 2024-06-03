
'use client'

import { useState, useRef, useContext } from "react";
import * as LitJsSdk from "@lit-protocol/lit-node-client";
import { ethConnect } from '@lit-protocol/auth-browser';
import { useAccount } from "wagmi";
import { useEthersSigner } from "@/utils/ethers-adapters";
import Modal from './Modal'
import AddStoreItemForm from './AddStoreItemForm'
import AppContext from "@/contexts/appContext";

function AddItemButton({storeAddress}:{storeAddress:string}) {
    const [file, setFile] = useState("");
    const [cid, setCid] = useState("");
    const [uploading, setUploading] = useState(false);
    const [decryptionCid, setDecryptionCid] = useState("");
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const { address, isConnected } = useAccount();

    const appHelpers = useContext(AppContext);

    const inputFile = useRef<HTMLInputElement>(null);

    const provider = useEthersSigner();

    const uploadFile = async (fileToUpload: any) => {
        try {
            setUploading(true);
            // Create our litNodeClient
            const litNodeClient = new LitJsSdk.LitNodeClient({
                litNetwork: 'cayenne',
            });
            // Then get the authSig
            await litNodeClient.connect();
            const authSig = await ethConnect.signAndSaveAuthMessage({
                web3: provider as any,
                account: address as string,
                chainId: 1,
                expiration: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
                resources: ""
            });
            // Define our access controls, this is set to be anyone
            const accs = [
                {
                    contractAddress: '0xF39cC9C3A28247E75147CC502F711e31Ce8CdD4F',
                    chain: 'sepolia',
                    functionName: 'getPaid',
                    functionParams: [':userAddress'],
                    functionAbi: {
                        "inputs": [
                            {
                                "internalType": "address",
                                "name": "user",
                                "type": "address"
                            }
                        ],
                        "name": "getPaid",
                        "outputs": [
                            {
                                "internalType": "bool",
                                "name": "",
                                "type": "bool"
                            }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                    },
                    returnValueTest: {
                        comparator: '=',
                        value: 'true',
                        key: ""
                    },
                },
            ];
            // Then we use our access controls and authSig to encrypt the file and zip it up with the metadata
            const encryptedZip = await LitJsSdk.encryptFileAndZipWithMetadata({
                evmContractConditions: accs,
                authSig,
                chain: 'mumbai',
                file: fileToUpload,
                litNodeClient: litNodeClient,
                readme: "Use IPFS CID of this file to decrypt it"
            });

            // Then we turn it into a file that will be accepted by the Pinata API
            const encryptedBlob = new Blob([encryptedZip], { type: 'text/plain' })
            const encryptedFile = new File([encryptedBlob], fileToUpload.name)

            // Finally we upload the file by passing it to our /api/files endpoint
            // Keep in mind this works for smaller files and you may need to do a presigned JWT and upload from the client if you're dealing with larger files
            // Read more about that here: https://www.pinata.cloud/blog/how-to-upload-to-ipfs-from-the-frontend-with-signed-jwts
            const formData = new FormData();
            formData.append("file", encryptedFile, encryptedFile.name)
            const res = await fetch("/api/files", {
                method: "POST",
                body: formData,
            });
            const ipfsHash = await res.text();
            console.log(ipfsHash);
            setCid(ipfsHash);
            setModalOpen(true);
            setUploading(false);
        } catch (e) {
            console.log(e);
            setUploading(false);
            alert("Trouble uploading file");
        }
    };

    const handleChange = (e: any) => {
        setFile(e.target.files[0]);
        uploadFile(e.target.files[0]);
    };

    return (
        <>
        
        {isConnected && <Modal title='Add Store Item' isOpen={modalOpen} setIsOpen={setModalOpen}>
            <AddStoreItemForm storeAddress={storeAddress} itemTokenUri={`${process.env.NEXT_PUBLIC_PINATA_IPFS_GATEWAY}/ipfs/${cid}`} />
        </Modal>}
        <div>
            <input
                type="file"
                id="file"
                ref={inputFile}
                onChange={handleChange}
                style={{ display: "none" }}
            />
            
            
            <button className='p-1 text-sm' disabled={uploading}
                onClick={() => setModalOpen(true)}>Add Item</button>
            {/* <button className='p-1 text-sm' disabled={uploading}
                onClick={() => inputFile.current!.click()}>Add Item</button> */}
        </div>
        </>
    )
}

export default AddItemButton