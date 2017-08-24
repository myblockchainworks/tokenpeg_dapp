// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'


// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
var accounts;
var account;

var YoutubeTokenContract;

var youtubeTokenContractABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_amount","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferToken","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getSubscriberCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_subscribers","type":"uint256"}],"name":"calculateAndUpdateToken","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"title","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"version","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"who","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferTokenFrom","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getTotalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"channelId","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"inputs":[{"name":"_tokenName","type":"string"},{"name":"_tokenSymbol","type":"string"},{"name":"_initalToken","type":"uint256"},{"name":"_title","type":"string"},{"name":"_id","type":"string"},{"name":"_subscribers","type":"uint256"}],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"TokenTransfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"value","type":"uint256"}],"name":"TokenUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}];

var youtubeTokenContractBytecode = "0x60606040526040805190810160405280600381526020017f302e3100000000000000000000000000000000000000000000000000000000008152506003908051906020019062000051929190620001cc565b5034156200005e57600080fd5b6040516200154738038062001547833981016040528080518201919060200180518201919060200180519060200190919080518201919060200180518201919060200180519060200190919050505b8560009080519060200190620000c5929190620001cc565b508460019080519060200190620000de929190620001cc565b5060028060006101000a81548160ff021916908360ff16021790555033600860006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555083600960003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550826005908051906020019062000197929190620001cc565b508160069080519060200190620001b0929190620001cc565b5080600781905550836004819055505b5050505050506200027b565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200020f57805160ff191683800117855562000240565b8280016001018555821562000240579182015b828111156200023f57825182559160200191906001019062000222565b5b5090506200024f919062000253565b5090565b6200027891905b80821115620002745760008160009055506001016200025a565b5090565b90565b6112bc806200028b6000396000f300606060405236156100e4576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306fdde03146100e9578063095ea7b3146101785780631072cbea146101d257806317e703ab146102145780631dbb00ab1461023d578063313ce5671461026057806341c0e1b51461028f5780634a79d50c146102a457806354fd4d501461033357806370a08231146103c25780638da5cb5b1461040f57806395d89b4114610464578063ad221195146104f3578063c4e41b2214610554578063dd62ed3e1461057d578063e2cee544146105e9575b600080fd5b34156100f457600080fd5b6100fc610678565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561013d5780820151818401525b602081019050610121565b50505050905090810190601f16801561016a5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561018357600080fd5b6101b8600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610716565b604051808215151515815260200191505060405180910390f35b34156101dd57600080fd5b610212600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610809565b005b341561021f57600080fd5b610227610a54565b6040518082815260200191505060405180910390f35b341561024857600080fd5b61025e6004808035906020019091905050610a5f565b005b341561026b57600080fd5b610273610b67565b604051808260ff1660ff16815260200191505060405180910390f35b341561029a57600080fd5b6102a2610b7a565b005b34156102af57600080fd5b6102b7610c15565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156102f85780820151818401525b6020810190506102dc565b50505050905090810190601f1680156103255780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561033e57600080fd5b610346610cb3565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156103875780820151818401525b60208101905061036b565b50505050905090810190601f1680156103b45780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34156103cd57600080fd5b6103f9600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610d51565b6040518082815260200191505060405180910390f35b341561041a57600080fd5b610422610d9b565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561046f57600080fd5b610477610dc1565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156104b85780820151818401525b60208101905061049c565b50505050905090810190601f1680156104e55780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34156104fe57600080fd5b610552600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610e5f565b005b341561055f57600080fd5b61056761115f565b6040518082815260200191505060405180910390f35b341561058857600080fd5b6105d3600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061116a565b6040518082815260200191505060405180910390f35b34156105f457600080fd5b6105fc6111f2565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561063d5780820151818401525b602081019050610621565b50505050905090810190601f16801561066a5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b60008054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561070e5780601f106106e35761010080835404028352916020019161070e565b820191906000526020600020905b8154815290600101906020018083116106f157829003601f168201915b505050505081565b600081600a60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a3600190505b92915050565b600860009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561086557600080fd5b80600960003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054101580156108b45750600081115b801561093f5750600960008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205481600960008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205401115b15610a485780600960003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555080600960008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508173ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fd0ed88a3f042c6bbb1e3ea406079b5f2b4b198afccaa535d837f4c63abbc4de6836040518082815260200191505060405180910390a3610a4d565b600080fd5b5b5b5b5050565b600060075490505b90565b6000600860009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610abd57600080fd5b60075482039050816007819055506000811115610b60578160048190555080600960003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055507fc68c4763b92d6e0a0860fe907f5c1c7b600b759101cb568328ab7153ed495dda816040518082815260200191505060405180910390a15b5b5b5b5050565b600260009054906101000a900460ff1681565b600860009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610bd657600080fd5b600860009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b5b565b60058054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610cab5780601f10610c8057610100808354040283529160200191610cab565b820191906000526020600020905b815481529060010190602001808311610c8e57829003601f168201915b505050505081565b60038054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610d495780601f10610d1e57610100808354040283529160200191610d49565b820191906000526020600020905b815481529060010190602001808311610d2c57829003601f168201915b505050505081565b6000600960008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490505b919050565b600860009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60018054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610e575780601f10610e2c57610100808354040283529160200191610e57565b820191906000526020600020905b815481529060010190602001808311610e3a57829003601f168201915b505050505081565b80600960008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410158015610f2a575080600a60008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410155b8015610f365750600081115b8015610fc15750600960008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205481600960008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205401115b156111545780600960008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555080600a60008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555080600960008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fd0ed88a3f042c6bbb1e3ea406079b5f2b4b198afccaa535d837f4c63abbc4de6836040518082815260200191505060405180910390a3611159565b600080fd5b5b505050565b600060045490505b90565b6000600a60008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490505b92915050565b60068054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156112885780601f1061125d57610100808354040283529160200191611288565b820191906000526020600020905b81548152906001019060200180831161126b57829003601f168201915b5050505050815600a165627a7a72305820205175e133e6f8020ee729a981f84ac0aeb9db6bed93fb18b6fe83faec99e1400029";

window.App = {
  start: function() {
    var self = this;


    // Get the initial account balance so it can be displayed.
    web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        $('#currentUserName').html("YOU ARE OFFLINE");
        return;
      }

      if (accs.length == 0) {
        $('#currentUserName').html("YOU ARE OFFLINE");
        return;
      }

      accounts = accs;
      account = accounts[0];
      $('#currentUserName').html("Your Account: " + account);
      //self.loadContract("0xdF4cBc37e664A05a9409C3122B40075f99fC5182")
    });
  },
  updateTotalSupply : function() {
    var subscriberCount = $('#subscriberCount').val();
    $('#totalSupply').val(subscriberCount);
  },

  createNewToken : function () {
    var self = this;
    var youtubeTitle = $('#youtubeTitle').val();
    var youtubeId = $('#youtubeId').val();
    var subscriberCount = parseInt($('#subscriberCount').val());
    var totalSupply = parseInt($('#totalSupply').val());
    var tokenName = $('#tokenName').val();
    var tokenSymbol = $('#tokenSymbol').val();

    if (youtubeTitle == '' || youtubeTitle == undefined) {
      alert("Channel Title is empty!");
      return;
    } else if (youtubeId == '' || youtubeId == undefined) {
      alert("Channel Id is empty!");
      return;
    } else if (isNaN(subscriberCount)) {
      alert("Subscriber Count is empty!");
      return;
    } else if (isNaN(totalSupply)) {
      alert("Total Supply is empty!");
      return;
    } else if (tokenName == '' || tokenName == undefined) {
      alert("Token Name is empty!");
      return;
    } else if (tokenSymbol == '' || tokenSymbol == undefined) {
      alert("Token Symbol is empty!");
      return;
    } else {
        $('#addTokenButton').html("Creating Token. Awaiting Confirmation...");
        $('#addTokenButton').attr("disabled", true);
        // self.setStatus("Creating Token. Awaiting Confirmation...");
        var tokenContract = web3.eth.contract(youtubeTokenContractABI);
        tokenContract.new(tokenName, tokenSymbol, totalSupply, youtubeTitle, youtubeId, subscriberCount, {from: account, data: youtubeTokenContractBytecode, gasPrice: 20000000000}, function(err, result) {
          if(err) {
            console.log(err);
          } else {
            if(result != null) {
              if(result.address != undefined) {
                localStorage.setItem('searchToken', result.address);
                window.location.href = "token.html";
              }
            }
          }
        });
    }
  },
  searchNewToken : function() {
    var token = $('#tokenAddress').val();
    if (token == '' || token == undefined) {
      alert("Token is empty!");
      return;
    } else {
      localStorage.setItem('searchToken', token);
      window.location.href = "token.html";
    }
  },
  loadContract : function() {
      var address = localStorage.getItem('searchToken');
      if (address == undefined || address == '') {
        window.location.href = "index.html";
      } else {
        YoutubeTokenContract = window.web3.eth.contract(youtubeTokenContractABI).at(address);
        var tokenName;
        YoutubeTokenContract.name.call({from: account}, function(err, name) {
          if(err) {
            console.log(err);
          }
          if(name) {
            tokenName = name;
            YoutubeTokenContract.symbol.call({from: account}, function(err, symbol) {
              if(err) {
                console.log(err);
              }
              if(symbol) {
                  $('#contractName').html(tokenName + " (" + symbol + ")");
                  $('#transferTokenTitle').html("Transfer " + tokenName);
              }
            });
          }
        });

        var channelTitle;
        YoutubeTokenContract.title.call({from: account}, function(err, title) {
          if(err) {
            console.log(err);
          }
          if(title) {
            channelTitle = title;
            YoutubeTokenContract.channelId.call({from: account}, function(err, channelId) {
              if(err) {
                console.log(err);
              }
              if(channelId) {
                  $('#channelDetail').html("Channel: " + channelTitle + " (" + channelId + ")");
              }
            });
          }
        });

        $('#contractAddress').html("Interacting with token at address: " + address)

        YoutubeTokenContract.getTotalSupply.call({from: account}, function(err, total) {
          if(err) {
            console.log(err);
          }
          if(total) {
            $('#existingSubscribers').val(total);
            $('#totalSupply').html("Total Supply is: " + total + ".");
          }
        });
      }
  },

  transferToken : function() {
    var toAddress = $('#toAddress').val();
    var sendAmount = parseInt($('#sendAmount').val());
    if (toAddress == '' || toAddress == undefined) {
      alert ("To address is empty!");
      return;
    } else if (isNaN(sendAmount)) {
      alert ("Amount is empty!");
      return;
    }
    $('#transferButton').html("Transferring Amount. Awaiting Confirmation!");
    $('#transferButton').attr("disabled", true);
    YoutubeTokenContract.transferToken.sendTransaction(toAddress, sendAmount, {from: account}, function(err, result) {
      if(err) {
        console.log(err);
        $('#transferButton').html("Transfer");
        $("#transferButton").removeAttr("disabled");
      }
      if(result) {
        $('#toAddress').val("");
        $('#sendAmount').val("");
        $('#transferButton').html("Transfer");
        $("#transferButton").removeAttr("disabled");
      }
    });
  },

  approveAccountTokenAmount: function() {
    var toAddress = $('#toAddress2').val();
    var sendAmount = parseInt($('#sendAmount2').val());
    if (toAddress == '' || toAddress == undefined) {
      alert ("To address is empty!");
      return;
    } else if (isNaN(sendAmount)) {
      alert ("Amount is empty!");
      return;
    }
    $('#approveAmountButton').html("Approving Amount. Awaiting Confirmation!");
    $('#approveAmountButton').attr("disabled", true);
    YoutubeTokenContract.approve.sendTransaction(toAddress, sendAmount, {from: account}, function(err, result) {
      if(err) {
        console.log(err);
        $('#approveAmountButton').html("Approve Amount");
        $("#approveAmountButton").removeAttr("disabled");
      }
      if(result) {
        $('#approveAmountButton').html("Approve Amount");
        $("#approveAmountButton").removeAttr("disabled");
        $('#approveResult').html(sendAmount + " has been approved to withdraw an amount of " + sendAmount);
      }
    });
  },

  transferAllowanceToken : function() {
    var fromAddress = $('#fromAddress4').val();
    var toAddress = $('#toAddress4').val();
    var sendAmount = parseInt($('#sendAmount4').val());
    if (fromAddress == '' || fromAddress == undefined) {
      alert ("From address is empty!");
      return;
    } else if (toAddress == '' || toAddress == undefined) {
      alert ("To address is empty!");
      return;
    } else if (isNaN(sendAmount)) {
      alert ("Amount is empty!");
      return;
    }
    $('#transferAllowanceButton').html("Transferring Allowance. Awaiting Confirmation!");
    $('#transferAllowanceButton').attr("disabled", true);
    YoutubeTokenContract.transferTokenFrom.sendTransaction(fromAddress, toAddress, sendAmount, {from: account}, function(err, result) {
      if(err) {
        console.log(err);
        $('#transferAllowanceButton').html("Transfer Allowance");
        $("#transferAllowanceButton").removeAttr("disabled");
      }
      if(result) {
        $('#transferAllowanceButton').html("Transfer Allowance");
        $("#transferAllowanceButton").removeAttr("disabled");
        $('#transferAllowanceResult').html(sendAmount + " has been transferred to  " + toAddress + " from " + fromAddress);
      }
    });
  },

  getSubscriberCountFromAPI : function() {
    var channelId = $('#youtubeId').val();
    if (channelId != '') {
      $.ajax({
          type: "GET",
          url: "https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id="+channelId+"&key=AIzaSyCTAbIo-Qf-E-xoPJpRNLrjVU2JFNQzWY8",
          success: function (data) {
            if (data.items != undefined && data.items.length > 0){
              $('#youtubeTitle').val(data.items[0].snippet.title);
              $('#subscriberCount').val(data.items[0].statistics.subscriberCount);
              $('#totalSupply').val(data.items[0].statistics.subscriberCount);
            } else {
              $('#youtubeTitle').val("");
              $('#subscriberCount').val("");
              $('#totalSupply').val("");
              alert ("Invalid Channel Id!");
            }
          }
      });
    }
  },

  checkAccountBalance : function() {
    var toAddress = $('#toAddress3').val();
    if (toAddress == '' || toAddress == undefined) {
      alert ("Address is empty!");
      return;
    }
    YoutubeTokenContract.balanceOf.call(toAddress, {from: account}, function(err, balance) {
      if(err) {
        console.log(err);
      }
      if(balance) {
        $('#balanceResult').html("Balance of " + toAddress + " is " + balance + ".");
      }
    });
  },

  checkAllowance : function() {
    var ownerAddress = $('#ownerAddress').val();
    var spenderAddress = $('#spenderAddress').val();
    if (ownerAddress == '' || ownerAddress == undefined) {
      alert ("Owner Address is empty!");
      return;
    } else if (spenderAddress == '' || spenderAddress == undefined) {
      alert ("Spender Address is empty!");
      return;
    }
    YoutubeTokenContract.allowance.call(ownerAddress, spenderAddress, {from: account}, function(err, balance) {
      if(err) {
        console.log(err);
      }
      if(balance) {
        $('#allowanceResult').html(spenderAddress + "  is allowed to spend " + balance + " from  " + ownerAddress );
      }
    });
  },

  updateSubscribers : function() {
      var newSubscribers = parseInt($('#newSubscribers').val());
      var existingSubscribers = parseInt($('#existingSubscribers').val());
      if (isNaN(newSubscribers)) {
        alert ("Subscribers is empty!!!");
        return;
      } else if (newSubscribers < existingSubscribers) {
        alert ("New Subscribers count should be more than existing!");
        return;
      }
      $('#updateSubscribersButton').html("Updating Subscribers. Awaiting Confirmation!");
      $('#updateSubscribersButton').attr("disabled", true);
      YoutubeTokenContract.calculateAndUpdateToken.sendTransaction(newSubscribers, {from: account}, function(err, res) {
        if(err) {
          console.log(err);
          $('#updateSubscribersButton').html("Update Subscribers");
          $("#updateSubscribersButton").removeAttr("disabled");
        }
        if(res) {
          $('#newSubscribers').val("");
          $('#existingSubscribers').val(newSubscribers);
          $('#totalSupply').html("Total Supply is: " + newSubscribers + ".");
          $('#updateSubscribersButton').html("Update Subscribers");
          $("#updateSubscribersButton").removeAttr("disabled");
          $('#updateSubscribersResult').html("Your token contract subscribers and total supply has be updated to  " + newSubscribers + " from " + existingSubscribers);
        }
      });
  },

  setStatus: function(message) {
    var status = document.getElementById("status");
    status.innerHTML = message;
  }
};

window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

  App.start();
});
