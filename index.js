function $(_) {return document.getElementById(_);}
let provider= {};
let signer= {};
window.addEventListener('load',async function()
{
	console.log("waitin for 3 secs..");
	$("cw_m").innerHTML = "Connecting.. Please wait."
	setTimeout(async () => { await basetrip(); arf(); dexstats(); }, 3000);
}, false);




async function basetrip()
{
	if(!(window.ethereum)){$("cw_m").innerHTML = "Wallet wasn't detected!";console.log("Wallet wasn't detected!");notice("<h3>Wallet wasn't detected!</h3>Please make sure that your device and browser have an active Web3 wallet like MetaMask installed and running.<br><br>Visit <a href='https://metamask.io' target='_blank'>metamask.io</a> to install MetaMask wallet.");provider = new ethers.providers.JsonRpcProvider(RPC_URL); await dexstats();return}
	else if(!Number(window.ethereum.chainId)==CHAINID){$("cw_m").innerHTML = "Wrong network! Please Switch to "+CHAINID;provider = new ethers.providers.Web3Provider(window.ethereum);await dexstats();notice("<h3>Wrong network!</h3>Please Switch to Chain #"+CHAINID+"<btr"+ CHAIN_NAME+ "</u> Blockchain.");}
	else if(//typeOf window.ethereum == Object &&Number(window.ethereum.chainId)
		Number(window.ethereum.chainId)==CHAINID)
	{
		console.log("Recognized Ethereum Chain:", window.ethereum.chainId,CHAINID);
		provider = new ethers.providers.Web3Provider(window.ethereum)
		signer = provider.getSigner();
		if(!(window.ethereum.selectedAddress==null)){console.log("Found old wallet:", window.ethereum.selectedAddress);cw();}
		else{console.log("Didnt find a connected wallet!");cw();}
		//chkAppr(tokes[1][0])
	}
	else //if(Number(window.ethereum.chainId)==CHAINID)
	{
		console.log("Couldn't find Ethereum Provider - ",CHAINID,window.ethereum.chainId)
		if((typeof Number(window.ethereum.chainId) == "number")){$("cw_m").innerHTML = "Wrong network! Switch from " + Number(window.ethereum.chainId)+" to "+CHAINID}
		provider = new ethers.providers.JsonRpcProvider(RPC_URL);
		signer = provider.getSigner()
		$("connect").innerHTML=`Wallet not found.<br><br><button onclick="window.location.reload()" id="btn-connect">Retry?</button>`;
	}
	if(Number(window.ethereum.chainId) != null &&(window.ethereum.chainId!=CHAINID))
	{
		await window.ethereum.request({
    		method: "wallet_addEthereumChain",
    		params: [{
        		chainId: "0x"+(CHAINID).toString(16),
        		rpcUrls: [RPC_URL],
        		chainName: RPC_URL.split(".")[1],
        		nativeCurrency: {
            		name: RPC_URL.split(".")[1],
            		symbol: (RPC_URL.split(".")[1]).toUpperCase(),
            		decimals: 18
        		},
        		blockExplorerUrls: [EXPLORE.split("/address")[0]]
    		}]
		});
		window.location.reload
	}
	//DrefreshFarm()
	//arf()
	cw()
	dexstats()
}



/*
function fornum(n,d)
{
	_n=(Number(n)/10**Number(d));
	n_=_n;
	if(_n>1e18){n_=(_n/1e18).toFixed(2)+" Qt."}
	else if(_n>1e15){n_=(_n/1e15).toFixed(2)+" Qd."}
	else if(_n>1e12){n_=(_n/1e12).toFixed(2)+" Tn."}
	else if(_n>1e9){n_=(_n/1e9).toFixed(2)+" Bn."}
	else if(_n>1e6){n_=(_n/1e6).toFixed(2)+" Mn."}
	else if(_n>1e3){n_=(_n/1e3).toFixed(2)+" Th."}
	else if(_n>0){n_=(_n/1e0).toFixed(5)+""}
	return(n_);
}
*/
function fornum(n,d)
{
	_n=(Number(n)/10**Number(d));
	n_=_n;
	if(_n>1e18){n_=(_n/1e18).toFixed(3)+"Qt"}
	else if(_n>1e15){n_=(_n/1e15).toFixed(3)+"Qd"}
	else if(_n>1e12){n_=(_n/1e12).toFixed(3)+"T"}
	else if(_n>1e9){n_=(_n/1e9).toFixed(3)+"B"}
	else if(_n>1e6){n_=(_n/1e6).toFixed(3)+"M"}
	else if(_n>1e3){n_=(_n/1e3).toFixed(3)+"K"}
	else if(_n>1e1){n_=(_n/1e0).toFixed(5)+""}
	else if(_n>0.0){n_=(_n/1e0).toFixed(8)+""}
	return(n_);
}

async function cw()
{
	let cs = await cw2(); cs?console.log("Good to Transact"):cw2();
	cw2();
}
async function cw2()
{
	if(!(window.ethereum)){$("cw_m").innerHTML="Metamask not detected! Trying a refresh";console.log("Metamask not found!");window.location.reload();return(0)}
	if(!(Number(window.ethereum.chainId)==CHAINID)){$("cw_m").innerHTML="Wrong network detected! Please switch to chain ID", CHAINID, "and refresh this page.";return(0)}
	if(typeof provider == "undefined"){$("cw_m").innerHTML="Provider not detected! Trying a refresh";console.log("Provider not found!");window.location.reload();return(0)}
	/*
	if(!
		(isFinite(Number(accounts[0])))
		|| (isFinite(Number(window.ethereum.selectedAddress)))
	){console.log("NAAAAAAAAAAAAAAAAA");window.location.reload();}
	*/

	//004
	window.ethereum
	.request({ method: 'eth_requestAccounts' })
	.then(r=>{console.log("004: Success:",r);})	//re-curse to end curse, maybe..
	.catch((error) => {	console.error("004 - Failure", r, error); });


	//005
	const accounts = await window.ethereum.request({ method: 'eth_accounts' });
	if(Number(accounts[0])>0){console.log("005: Success - ", accounts)}
	else{console.log("005: Failure", accounts)}


	/*006
	const en6 = await window.ethereum.enable()
	if(Number(en6[0]) > 0){console.log("006 - Success",en6)}
	else{console.log("006 - Failure", en6)}
	*/


	/*003
	try {
      console.log("attempting cw()")
      const addresses = await provider.request({ method: "eth_requestAccounts" });
      console.log("addresses:",addresses)
    } catch (e) {
      console.log("error in request", e);
      window.location.reload(true);
    }
    */

    //002
    //try{await provider.send("eth_requestAccounts", []);console.log("CWE:",e);}//await window.ethereum.enable();
	//catch(e){console.log("CWE:",e);window.location.reload(true)}
	console.log("doing the paints")
	$("cw").innerHTML= (window.ethereum.selectedAddress).substr(0,10) +"..."+(window.ethereum.selectedAddress).substr(34);
	if(window.ethereum.chainId==250) (new ethers.Contract("0x14ffd1fa75491595c6fd22de8218738525892101",["function getNames(address) public view returns(string[] memory)"],provider)).getNames(window.ethereum.selectedAddress).then(rn=>{if(rn.length>0){$("cw").innerHTML="hi, <span style='/*font-family:bold;font-size:1.337em*/'>"+rn[0]+"</span> 👋"}else{$("cw").innerHTML= (window.ethereum.selectedAddress).substr(0,10) +"..."+(window.ethereum.selectedAddress).substr(34);}})
	$("cw_m").innerHTML=""
	$("connect").style.display="none";
	$("switch").style.display="block";
	//farm_1_f_chappro()
	gubs();
	return(1);
}
function fornum2(n,d)
{
	_n=(Number(n)/10**Number(d));
	n_=_n;
	if(_n>1e18){n_=(_n/1e18).toFixed(2)+" Quintillion"}
	else if(_n>1e15){n_=(_n/1e15).toFixed(2)+" Quadrillion"}
	else if(_n>1e12){n_=(_n/1e12).toFixed(2)+" Trillion"}
	else if(_n>1e9){n_=(_n/1e9).toFixed(2)+" Billion"}
	else if(_n>1e6){n_=(_n/1e6).toFixed(2)+" Million"}
	else if(_n>1e3){n_=(_n/1e3).toFixed(2)+" Thousand"}
	else if(_n>1){n_=(_n/1e0).toFixed(8)+""}
	return(n_);
}

aval = $("lock-amt").value;

function arf() {
	var xfr = setInterval(function() {
		//console.log("refreshing farm stats", Date.now());
		//gubs()
		//DrefreshFarm()
		if(!(aval == $("lock-amt").value)) {
			aval = $("lock-amt").value;
			vme = new ethers.Contract(VME, VMEABI, provider);
			vme.offer(BigInt(aval*1e18)).then(r=>{$("nft-offer").innerHTML = "+" + fornum(Number(r)-aval*1e18,18) + " veEQUAL"})
		}
	},
	1000);
}

VEABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"delegator","type":"address"},{"indexed":true,"internalType":"address","name":"fromDelegate","type":"address"},{"indexed":true,"internalType":"address","name":"toDelegate","type":"address"}],"name":"DelegateChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"delegate","type":"address"},{"indexed":false,"internalType":"uint256","name":"previousBalance","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newBalance","type":"uint256"}],"name":"DelegateVotesChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"provider","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"locktime","type":"uint256"},{"indexed":false,"internalType":"enum VotingEscrow.DepositType","name":"deposit_type","type":"uint8"},{"indexed":false,"internalType":"uint256","name":"ts","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint8","name":"version","type":"uint8"}],"name":"Initialized","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"prevSupply","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"supply","type":"uint256"}],"name":"Supply","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"provider","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"ts","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"DELEGATION_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DOMAIN_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_DELEGATES","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"abstain","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_approved","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"artProxy","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"attach","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"attachments","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"uint256","name":"_block","type":"uint256"}],"name":"balanceOfAtNFT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"balanceOfNFT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"uint256","name":"_t","type":"uint256"}],"name":"balanceOfNFTAt","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"block_number","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"checkpoint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint32","name":"","type":"uint32"}],"name":"checkpoints","outputs":[{"internalType":"uint256","name":"timestamp","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_value","type":"uint256"},{"internalType":"uint256","name":"_lock_duration","type":"uint256"}],"name":"create_lock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_value","type":"uint256"},{"internalType":"uint256","name":"_lock_duration","type":"uint256"},{"internalType":"address","name":"_to","type":"address"}],"name":"create_lock_for","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"delegatee","type":"address"}],"name":"delegate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"delegatee","type":"address"},{"internalType":"uint256","name":"nonce","type":"uint256"},{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"delegateBySig","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"delegator","type":"address"}],"name":"delegates","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"deposit_for","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"detach","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"epoch","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"getPastTotalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"getPastVotes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"getPastVotesIndex","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"getVotes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"get_last_user_slope","outputs":[{"internalType":"int128","name":"","type":"int128"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"increase_amount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"increase_amount_for","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"uint256","name":"_lock_duration","type":"uint256"}],"name":"increase_unlock_time","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token_addr","type":"address"},{"internalType":"address","name":"art_proxy","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"address","name":"_operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_spender","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"isApprovedOrOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"locked","outputs":[{"internalType":"int128","name":"amount","type":"int128"},{"internalType":"uint256","name":"end","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"locked__end","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_from","type":"uint256"},{"internalType":"uint256","name":"_to","type":"uint256"}],"name":"merge","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"numCheckpoints","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"ownership_change","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"point_history","outputs":[{"internalType":"int128","name":"bias","type":"int128"},{"internalType":"int128","name":"slope","type":"int128"},{"internalType":"uint256","name":"ts","type":"uint256"},{"internalType":"uint256","name":"blk","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_operator","type":"address"},{"internalType":"bool","name":"_approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_proxy","type":"address"}],"name":"setArtProxy","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_team","type":"address"}],"name":"setTeam","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_voter","type":"address"}],"name":"setVoter","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"slope_changes","outputs":[{"internalType":"int128","name":"","type":"int128"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"supply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes4","name":"_interfaceID","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"team","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"uint256","name":"_tokenIndex","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_block","type":"uint256"}],"name":"totalSupplyAt","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"t","type":"uint256"}],"name":"totalSupplyAtT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"user_point_epoch","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"user_point_history","outputs":[{"internalType":"int128","name":"bias","type":"int128"},{"internalType":"int128","name":"slope","type":"int128"},{"internalType":"uint256","name":"ts","type":"uint256"},{"internalType":"uint256","name":"blk","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"uint256","name":"_idx","type":"uint256"}],"name":"user_point_history__ts","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"version","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"voted","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"voter","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"voting","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]

VMABI = [{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "seller","type": "address"},{"indexed": false,"internalType": "uint256","name": "id","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "paid","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "locked","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "wks","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "wen","type": "uint256"}],"name": "Sale","type": "event"},{"inputs": [{"internalType": "address","name": "_to","type": "address"},{"internalType": "bytes","name": "_data","type": "bytes"}],"name": "customCall","outputs": [{"internalType": "bytes","name": "","type": "bytes"}],"stateMutability": "payable","type": "function"},{"inputs": [{"internalType": "address","name": "to","type": "address"},{"internalType": "uint256","name": "amount","type": "uint256"},{"internalType": "bytes","name": "_data","type": "bytes"}],"name": "customCall","outputs": [{"internalType": "bytes","name": "","type": "bytes"}],"stateMutability": "payable","type": "function"},{"inputs": [{"internalType": "address[]","name": "_tos","type": "address[]"},{"internalType": "uint256[]","name": "_amounts","type": "uint256[]"},{"internalType": "bytes[]","name": "_datas","type": "bytes[]"}],"name": "customCall","outputs": [{"internalType": "bytes[]","name": "retdata","type": "bytes[]"}],"stateMutability": "payable","type": "function"},{"inputs": [],"name": "dao","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "v","type": "uint256"}],"name": "getQuote","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "v","type": "uint256"}],"name": "getQuoted","outputs": [{"internalType": "uint256","name": "","type": "uint256"},{"internalType": "uint256","name": "","type": "uint256"},{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "a","type": "uint256"},{"internalType": "uint256","name": "w","type": "uint256"}],"name": "getRawQuote","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "pure","type": "function"},{"inputs": [],"name": "homeID","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256[]","name": "f","type": "uint256[]"},{"internalType": "uint256","name": "t","type": "uint256"}],"name": "multiMerge","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "offerPrice","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "offerToken","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "","type": "address"},{"internalType": "address","name": "","type": "address"},{"internalType": "uint256","name": "","type": "uint256"},{"internalType": "bytes","name": "","type": "bytes"}],"name": "onERC721Received","outputs": [{"internalType": "bytes4","name": "","type": "bytes4"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "","type": "address"}],"name": "tokensPaid","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "","type": "address"}],"name": "tradesCounter","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "tokenAddress","type": "address"},{"internalType": "uint256","name": "tokens","type": "uint256"}],"name": "rescue","outputs": [{"internalType": "bool","name": "success","type": "bool"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "","type": "address"}],"name": "sales","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "veid","type": "uint256"}],"name": "sell","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "id","type": "uint256"}],"name": "setHomeID","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "t","type": "address"},{"internalType": "uint256","name": "p","type": "uint256"}],"name": "setOffer","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "totalTrades","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "totalVolume","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "veToken","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"}]

VMEABI = [{"inputs":[{"internalType":"address","name":"_ve","type":"address"},{"internalType":"address","name":"_eq","type":"address"},{"internalType":"address","name":"_vo","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"EQ","outputs":[{"internalType":"contract IT","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"FACTOR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAXTIME","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"VE","outputs":[{"internalType":"contract IVe","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"VO","outputs":[{"internalType":"contract IVo","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"},{"internalType":"uint256","name":"_amt","type":"uint256"}],"name":"extend","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amt","type":"uint256"}],"name":"initiate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amt","type":"uint256"}],"name":"offer","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"uint256","name":"tokens","type":"uint256"}],"name":"rescue","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_f","type":"uint256"}],"name":"setFactor","outputs":[],"stateMutability":"nonpayable","type":"function"}]
async function gubs() {
	veq = new ethers.Contract(VENFT, VEABI, provider);
	eq = new ethers.Contract(EQUAL, ["function balanceOf(address) public view returns(uint)"], provider);
	eq.balanceOf(window.ethereum.selectedAddress).then(r=>{$("nft-amt").innerHTML = fornum(r,18) + " EQUAL"})
	bal = await veq.balanceOf(window.ethereum.selectedAddress);
	if (bal == 0) $("nft-bal").innerHTML = "No NFTs owned!";
	else {
	  $("nft-bal").innerHTML = "Balance: "+bal+" veNFT";
	  nid=[];
	  for(i=0;i<bal;i++) {
	  	nid[i]=veq.tokenOfOwnerByIndex(window.ethereum.selectedAddress,i);
	  }
	  nids = await Promise.all(nid);
	  balid = [];
	  for(i=0;i<bal;i++) {
	  	balid[i]=veq.locked(Number(nids[i]));
	  }
	  balids = await Promise.all(balid);
	  $("nft-sel").innerHTML = '<option value="" selected>Choose a NFT</option>';
	  for(i=0;i<bal;i++) {
	  	$("nft-sel").innerHTML += `
	  	  <option value='${nids[i]}'>#${nids[i]} : ${fornum(Number(balids[i][0]),18)} </option>
	  	`
	  }
	}

}

async function quote() {
	return;
	_id = $("nft-sel").value;
	vm=new ethers.Contract(VENAMM,VMABI,provider);
	_qq = m.getQuoted(_id);
	_top = m.offerPrice();
	_pqt = await Promise.all([_qq, _top]);
	_q = _pqt[0];
	$("nft-amt").innerHTML = fornum(_q[1],18) + " EQUAL";
	$("nft-tl").innerHTML = Number(_q[2]) + " Weeks";
	$("nft-offer").innerHTML = fornum(_q[0]/1e18 * _pqt[1]/1e18 , 0) + " FTM";
	$("claim-offer").innerHTML = "Claim "+fornum(_q[0]/1e18 * _pqt[1]/1e18 , 0) + " FTM";
}

async function extend() {
	_id = $("nft-sel").value;
	if(_id<1) { notice("<h3>Please Select a veNFT first!</h3>"); return;}
	_am = $("lock-amt").value;
	veq = new ethers.Contract(VENFT, VEABI, signer);
	vme = new ethers.Contract(VME, VMEABI, provider);
	eq = new ethers.Contract(EQUAL, ["function approve(address,uint)", "function allowance(address,address) public view returns(uint)"], signer);
	al = await Promise.all([
		veq.isApprovedOrOwner(VME, _id),
		eq.allowance(window.ethereum.selectedAddress, VME)
	]);
	if(al[0]==false) {
		notice(`
			<h3>Approval required</h3>
			Approval is required to manage your veNFT#${_id}.
			<br>
			<h4><u><i>Please Confirm this transaction in your wallet!</i></u></h4>
		`);
		let _tr = await veq.approve(VME,_id);
		console.log(_tr)
		notice(`
			<h3>Submitting veNFT Approval Transaction!</h3>
			<h4><a target="_blank" href="https://ftmscan.com/tx/${_tr.hash}">View on Explorer</a></h4>
		`);
		_tw = await _tr.wait()
		console.log(_tw)
		notice(`
			<h3>Approval Completed!</h3>
			<br><br>
			<h4><a target="_blank" href="https://ftmscan.com/tx/${_tr.hash}">View on Explorer</a></h4>
			<br><br>
			Please confirm the remaining transaction(s) at your wallet provider now.
		`);
	}
	if(Number(al[1])<=_am*1e18) {
		notice(`
			<h3>Approval required for EQUAL</h3>
			Approval is required to add EQUAL to your veNFT#${_id}.
			<li>Approve EQUAL token</li>
			<br><br>
			<h4><u><i>Please Confirm this transaction in your wallet!</i></u></h4>
		`);
		let _tr = await eq.approve(VME,ethers.constants.MaxUint256);
		console.log(_tr)
		notice(`
			<h3>Submitting EQUAL Approval Transaction!</h3>
			<h4><a target="_blank" href="https://ftmscan.com/tx/${_tr.hash}">View on Explorer</a></h4>
		`);
		_tw = await _tr.wait()
		console.log(_tw)
		notice(`
			<h3>Approval Completed!</h3>
			<br><br>
			<h4><a target="_blank" href="https://ftmscan.com/tx/${_tr.hash}">View on Explorer</a></h4>
			<br><br>
			Please confirm the remaining transaction(s) at your wallet provider now.
		`);
	}
	_offer = vme.offer(_id);
	_current = vme.locked(_id);
	_pqt = await Promise.all([_offer,_current]);
	notice(`
		_q = [ _pqt[0], _pqt[1][0], Math.floor((Number(_pqt[1][1])*1e3-Date.Now()) /1e3/86400/7) ];

		<h3>Order Summary</h3>
		<img style='height:20px;position:relative;top:4px' src="https://equalizer.exchange/assets/logo/EQUAL.png"> <b>Extending old Lock:</b><br>
		Amount to add: <b>${_amt} EQUAL</b><br>
		NFT Token ID: <u>#<b>${_id}</b></u><br>
		<h3>Current Position</h3>
		Old Amount Locked: <u>${fornum(_q[1],18)} EQUAL</u><br>
		Old Time to Unlock: <u>${Number(_q[2])} Weeks</u> from now<br><br>
		<h3>Expected new position:</h3>
		Locked amount: <u>${fornum(_q[0] , 18)} EQUAL</u><br>
		Time to Unlock: 26 weeks<br><br><br>
		<h4><u><i>Please Confirm this transaction in your wallet!</i></u></h4>
	`)
	let _tr = await vme.extend(_id,BigInt(_amt*1e18));
	console.log(_tr)
	notice(`
		<h3>Transaction Submitted!</h3>
		<br><h4>Locking more EQUAL</h4>
		NFT Token ID: <u>#<b>${_id}</b></u><br>
		<h3>Current Position</h3>
		Old Amount Locked: <u>${fornum(_q[1],18)} EQUAL</u><br>
		Old Time to Unlock: <u>${Number(_q[2])} Weeks</u> from now<br><br>
		<h3>Expected new position:</h3>
		Locked amount: <u>${fornum(_q[0] , 18)} EQUAL</u><br>
		Time to Unlock: 26 weeks<br><br><br>
		<h4><a target="_blank" href="https://ftmscan.com/tx/${_tr.hash}">View on Explorer</a></h4>
	`)
	_tw = await _tr.wait()
	console.log(_tw)
	notice(`
		<h3>Order Completed!</h3>
		NFT Token ID: <u>#<b>${_id}</b></u><br>
		<h3>Current Position</h3>
		Locked amount: <u>${fornum(_q[0] , 18)} EQUAL</u><br>
		Time to Unlock: 26 weeks<br><br><br>
		<h4><a target="_blank" href="https://ftmscan.com/tx/${_tr.hash}">View on Explorer</a></h4>
	`)
	gubs()
}

function notice(c) {
	window.location = "#note"
	$("content1").innerHTML = c
}

async function dexstats() {
	vme = new ethers.Contract(VME, VMEABI, provider);
	eq = new ethers.Contract(EQUAL, ["function balanceOf(address) public view returns(uint)"], provider);
	rp = await Promise.all([
		vme.FACTOR(),
		eq.balanceOf(VME)
	]);
	console.log("rp",rp);
	$("stats").innerHTML = `
		<br>
		<br>Current Bonus: ${(fornum((rp[0]-1e18)*100,18))} %
    	<br>Available Incentives: ${(fornum(rp[1],18))} EQUAL
	`
}