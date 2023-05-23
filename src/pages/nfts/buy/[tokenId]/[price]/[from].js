import { useEffect, useState } from "react";
import { useRouter } from "next/router"
import Caver from "caver-js"
import axios from "axios";
import Image from 'next/image'

import styles from "@/styles/Main.module.css";

import abi from "../../../../../../contract/ABI.json"
import contractAddress from "../../../../../../contract/ADDRESS.json"


export default function BuyId(){
    const router = useRouter();
    const [buyParam, setBuyParam] = useState(["tokenId","price","from","info"])
    let tempParam = null;
    let addr = null;

    /*if (typeof window.klaytn !== "undefined") {
        // Kaikas user detected. You can now use the provider.
        const provider = window["klaytn"];
    }*/

    console.log(router.query)
    console.log(router.query.tokenId)
    console.log(router.query.price)
    console.log(router.query.from)

    tempParam = [...buyParam]

    tempParam[0] = router.query.tokenId
    tempParam[1] = router.query.price
    tempParam[2] = router.query.from
    tempParam[3] = "거래중입니다."
    addr = tempParam[2]

    useEffect(() => {
        setBuyParam(tempParam)
    }, [tempParam[1],tempParam[2],tempParam[0]]);
    console.log(buyParam)

    //buy(buyParam[0], buyParam[1], addr);

    /*async function buy(_tokeId, _price, _addr) {
        caver = new Caver(window.klaytn);
        console.log(caver)
    
        const contract = new caver.klay.Contract(abi,contractAddress, {
          from: addr
        });
        console.log(contract)
    
        //0x6ef333308269711b6ACf61C7a239A626490c65F5
        //0xd026F9247E982f087F8CcB4FD334C7d78039c37A
        const val = await contract.methods.buyNFT(parseInt(_tokeId)).send({from: _addr, gas: 3000000, value: parseInt(parseFloat(_price)*(10**18)) })
        console.log("구매 테스트 결과: ")
        console.log(val)
        tempParam = [...buyParam]
        tempParam[3] = "거래 완료 - 다시 애옹으로 돌아가주세요."
    }
*/
    const onBuy = async () => {
        caver = new Caver(window.klaytn);
        console.log(caver)
    
        const contract = new caver.klay.Contract(abi,contractAddress, {
          from: addr
        });
        console.log(contract)
    
        //0x6ef333308269711b6ACf61C7a239A626490c65F5
        //0xd026F9247E982f087F8CcB4FD334C7d78039c37A
        const val = await contract.methods.buyNFT(buyParam[0]).send({from: addr, gas: 3000000, value: parseInt(parseFloat(buyParam[1])*(10**18)) })
        console.log("구매 테스트 결과: ")
        console.log(val)
        tempParam = [...buyParam]
        tempParam[3] = "거래 완료 - 다시 애옹으로 돌아가주세요."
      }

    //http://localhost:3000/nfts/buy/2/0.01/0xd026F9247E982f087F8CcB4FD334C7d78039c37A
    

    return(
        <>
            <a id="btn_buy" onClick={onBuy}>
                <Image src="/kaikasBuyButton.png" className={styles.img} width={300} height={60} alt="카이카스 구매 이미지"/>
            </a>
        </>
    )
    /*
            <div>parameter tokenId: {buyParam[0]}</div>
            <div>parameter price: {buyParam[1]}</div>
            <div>parameter buyer: {buyParam[2]}</div>
            <div>{buyParam[3]}</div>
    */
}