import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
//import styles from '@/styles/Home.module.css'
import React, {useState, useEffect} from 'react'
import Caver from "caver-js"
import axios from "axios";

import styles from "@/styles/Main.module.css";

import abi from "../../contract/ABI.json"
import contractAddress from "../../contract/ADDRESS.json"


function Header(){
  return (
    <header>
      Hello, next.js
    </header>
  )
}

function Nav(props) {
  return (
    <nav>
      <div>
        <p>{props.message}</p>
      </div>
      
      <div>
        <p>지갑 주소:</p>
        <p>{props.wallet_addr}</p>
      </div>
  </nav>
  )
}

function Home() {
  let caver = null;
  let temp = null;

  const [message, setMessage] = useState(null);
  const [addr, setAddr] = useState(null);
  const [balancMe, setBalancMe] = useState(null);
  const [balanceNFT, setBalanceNFT] = useState(null);


  const onLogin = async () => {
    console.log("onLogin");

    const accounts = await window.klaytn.enable();

    console.log("success");
    const url = "http://localhost:5000/login-result";
    axios.post(url, {
          addr: accounts[0]
      }).then((res) => {
        console.log("resData", res);
    })
    
    setAddr(accounts[0]);
    console.log(addr);
    setMessage("로그인 되었습니다.")
  }


  const onBalance = async () => {
    let temp2 = null;

    caver = new Caver(window.klaytn);
    console.log(caver)

    temp2 = await caver.klay.getBalance(addr);
    //temp = Number(temp)/(10**8);
    setBalancMe(temp2);
    console.log(balancMe)

    const contract = new caver.klay.Contract(abi,contractAddress, {
      from: addr
    });
    console.log(contract)

    temp2 = await contract.methods.balanceOf(addr).call();
    setBalanceNFT(temp2);
    console.log(balanceNFT);

  }

  return (
    <>
      <a id="btn_wallet" onClick={onLogin}>
        <Image src="/kaikasLoginButton.png" className={styles.img} width={300} height={60} alt="카이카스 로그인 이미지"/>
      </a>
      
    </>
    //<Nav className={styles.Nav} wallet_addr={addr} message={message}></Nav>
    
  )
}

export default Home;