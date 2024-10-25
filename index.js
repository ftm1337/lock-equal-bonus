function $(_) {return document.getElementById(_);}
let provider= {};
let signer= {};
window.addEventListener('load',async function()
{
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
	cw()
	dexstats()
}

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

	//004
	window.ethereum
	.request({ method: 'eth_requestAccounts' })
	.then(r=>{console.log("004: Success:",r);})	//re-curse to end curse, maybe..
	.catch((error) => {	console.error("004 - Failure", r, error); });


	//005
	const accounts = await window.ethereum.request({ method: 'eth_accounts' });
	if(Number(accounts[0])>0){console.log("005: Success - ", accounts)}
	else{console.log("005: Failure", accounts)}

	$("cw").innerHTML= (window.ethereum.selectedAddress).substr(0,6) + "|"+(window.ethereum.selectedAddress).substr(38);
	if(window.ethereum.chainId==250) (new ethers.Contract("0x14ffd1fa75491595c6fd22de8218738525892101",["function getNames(address) public view returns(string[] memory)"],provider)).getNames(window.ethereum.selectedAddress).then(rn=>{if(rn.length>0){$("cw").innerHTML="<span style='/*font-family:bold;font-size:1.337em*/'>"+rn[0]+"</span>"}else{$("cw").innerHTML= (window.ethereum.selectedAddress).substr(0,10) +"|"+(window.ethereum.selectedAddress).substr(38);}})
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
	let tr = new ethers.Contract(ROUTER, ["function getAmountOut(uint amountIn, address tokenIn, address tokenOut, bool stable) public view returns (uint amount)"], provider);
	var xfr = setInterval(function() {

		if(!(aval == $("lock-amt").value)) {
			aval = $("lock-amt").value;
			let tin = BigInt( Math.floor( aval * 1e18 ));
			tin = tin - (tin%1_000_000_000n);
			tr.getAmountOut(tin, WNATIVE, TOKEN, false).then(r => {
				let ve = (Number(r) / 1e18).toLocaleString('fullwide', { maximumFractionDigits: 8, useGrouping: false });
				$("nft-offer").innerHTML = "+" + ve + " veSCALE";
				$("nft-offer-usd").innerHTML = "worth $" + ve + " veSCALE";
				$("airdrop-offer").innerHTML = "+" + ve + " YeVe";
				$("airdrop-offer-usd").innerHTML = "worth $" + ve + " YeVe";
			});

		}
	},
	1000);
}


async function gubs() {
	rd = await Promise.all([
		provider.getBalance(window.ethereum.selectedAddress),
		(new ethers.Contract(VENFT,["function balanceOf(address) external view returns(uint)"],signer)).balanceOf(window.ethereum.selectedAddress)
	]);
	$("bal-eth").innerHTML = (Number(rd[0])/1e18).toFixed(6);
	if(Number(rd[1]) >= 20) notice(`<h2>You have 20+ veNFTs!</h2>Maximum NFTs allowed in a single wallet are 20. Please transfer or merge some nfts before locking!`);
	return;
}

async function confirmbuylock() {
	if(Number(rd[1]) >= 20) {
		notice(`<h2>You have 20+ veNFTs!</h2>Maximum NFTs allowed in a single wallet are 20. Please transfer or merge some nfts before locking!`);
		return;
	}
	_am = $("lock-amt").value;
	if(!isFinite(_am)){ notice(`<h2>Invalid Input~</h2>Your input: ${_am}`); return;}
	amt = BigInt( Math.floor( _am * 1e18 ));
	amt = amt - (amt%1_000_000_000n);
	rtr = new ethers.Contract(ROUTER, ["function getAmountOut(uint amountIn, address tokenIn, address tokenOut, bool stable) public view returns (uint amount)"], provider);
	min = await rtr.getAmountOut(amt, WNATIVE, TOKEN, false);
	notice(`
		<h2>Final Check</h2>
		You are spending
		<br> ${(Number(amt)/1e18).toFixed(6)} ${NATIVE_NAME}.
		<br>
		You will get a veNFT with
		<br> ${(Number(min)/1e18).toFixed(6)} ${TOKEN_NAME}
		<br> and a nice YeVe Airdrop!
		<br>
		<br>
		<div align="center" class="equal-gradient" onclick="buylock(${amt},${min})">Confirm Order</div>
	`);
}

async function buylock(amtin, minout) {
	notice(`
		<h3>Order Summary</h3>
		<img style='height:20px;position:relative;top:4px' src="${NATIVE_LOGO}"> Buying ${(Number(minout)/1e18).toFixed(6)} ${TOKEN_NAME}
		<br>
		<img style='height:20px;position:relative;top:4px' src="${NATIVE_LOGO}"> Using ${(Number(amtin)/1e18).toFixed(6)} ${NATIVE_NAME}
		<br>
		<img style='height:20px;position:relative;top:4px' src="${NATIVE_LOGO}"> A minimum of ${(Number(minout)*99/100/1e18).toFixed(6)} ${TOKEN_NAME}
		<br> as well as a nice YeVe Airdrop on Solana!
		<br>
		<h4><u><i>Please Confirm this transaction in your wallet!</i></u></h4>
	`)
	elb = new ethers.Contract(ELB, ["function buyAndLock(uint)"],signer);
	let _tr = await elb.buyAndLock( BigInt( Math.floor( Number(minout)*99/100 ) ) );
	console.log(_tr)
	notice(`
		<h3>Transaction Submitted!</h3>
		<img style='height:20px;position:relative;top:4px' src="${NATIVE_LOGO}"> Buying ${(Number(minout)/1e18).toFixed(6)} ${TOKEN_NAME}
		<br>
		<img style='height:20px;position:relative;top:4px' src="${NATIVE_LOGO}"> Using ${(Number(amtin)/1e18).toFixed(6)} ${NATIVE_NAME}
		<br>
		<img style='height:20px;position:relative;top:4px' src="${NATIVE_LOGO}"> A minimum of ${(Number(minout)*99/100/1e18).toFixed(6)} ${TOKEN_NAME}
		<br> as well as a nice YeVe Airdrop on Solana!
		<br>
		<h4><a target="_blank" href="${EXPLORT + _tr.hash}">View on Explorer</a></h4>
	`)
	_tw = await _tr.wait()
	console.log(_tw)
	notice(`
		<h3>Order Completed!</h3>
		<img style='height:20px;position:relative;top:4px' src="${NATIVE_LOGO}"> Buying ${(Number(minout)/1e18).toFixed(6)} ${TOKEN_NAME}
		<br>
		<img style='height:20px;position:relative;top:4px' src="${NATIVE_LOGO}"> Using ${(Number(amtin)/1e18).toFixed(6)} ${NATIVE_NAME}
		<br>
		<img style='height:20px;position:relative;top:4px' src="${NATIVE_LOGO}"> A minimum of ${(Number(minout)*99/100/1e18).toFixed(6)} ${TOKEN_NAME}
		<br> as well as a nice YeVe Airdrop on Solana!
		<br>
		<h4><a target="_blank" href="${EXPLORT + _tr.hash}">View on Explorer</a></h4>
	`)
	gubs()
}


function notice(c) {
	window.location = "#note"
	$("content1").innerHTML = c
}

async function dexstats() {
	return;
}
