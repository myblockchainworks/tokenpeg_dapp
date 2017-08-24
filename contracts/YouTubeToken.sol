pragma solidity ^0.4.8;

contract YouTubeToken {

  // Public variables of the token
  string public name;
  string public symbol;
  uint8 public decimals;
  string public version = '0.1';

  uint totalSupply;

  // YouTube Channel variables
  string public title;
  string public channelId;
  uint subscriberCount;

  // Owner of this contract
  address public owner;

  // Balances for each account
  mapping (address => uint256) public balanceOf;

  // Owner of account approves the transfer of an amount to another account
  mapping(address => mapping (address => uint256)) allowed;

  // Triggered when tokens are transferred.
  event TokenTransfer(address indexed from, address indexed to, uint256 value);

  // Triggered when tokens are transferred.
  event TokenUpdated(uint256 value);

  // Triggered whenever approve(address _spender, uint256 _value) is called.
  event Approval(address indexed _owner, address indexed _spender, uint256 _value);

  // Functions with this modifier can only be executed by the owner
  modifier onlyOwnder {
    if (msg.sender != owner) {
      throw;
    } else {
      _;
    }
  }

  // Delete / kill the contract... only the owner has rights to do this
  function kill() onlyOwnder {
    suicide(owner);
  }

  // Constructor
  // @notice Create a YouTube Token - The Main Contract
  // @param _tokenName The token name
  // @param _tokenSymbol The token symbol
  // @param _initalToken The initial token value or totalSupply
  // @return the transaction address
  function YouTubeToken(string _tokenName, string _tokenSymbol, uint _initalToken, string _title, string _id, uint _subscribers) {
    name = _tokenName;
    symbol = _tokenSymbol;
    decimals = 2;
    owner = msg.sender;
    balanceOf[msg.sender] = _initalToken;

    title = _title;
    channelId = _id;
    subscriberCount = _subscribers;

    totalSupply = _initalToken;
  }

  // @notice calculate and update the token for the selected channel
  // @param index The index of channel in the channels array
  // @param _subscribers The total subscribers for the channel
  // @return the transaction address and send the event as TokenTransfer only when additionalSubscribers is more than 0
  function calculateAndUpdateToken(uint _subscribers) onlyOwnder {
    uint additionalSubscribers = _subscribers - subscriberCount;
    subscriberCount = _subscribers;
    if (additionalSubscribers > 0) {
      totalSupply = _subscribers;
      balanceOf[msg.sender] += additionalSubscribers;
      TokenUpdated(additionalSubscribers);
    }
  }

  // @notice send `_value` token to `_to` from `msg.sender`
  // @param _to The address of the recipient
  // @param _value The amount of token to be transferred
  // @return the transaction address and send the event as TokenTransfer
  function transferToken(address _to, uint256 _value) onlyOwnder {

    if (balanceOf[msg.sender] >= _value  && _value > 0  && balanceOf[_to] + _value > balanceOf[_to]) {
      balanceOf[msg.sender] -= _value;
      balanceOf[_to] += _value;
      TokenTransfer(msg.sender, _to, _value);
    } else {
      throw;
    }
  }

  // @notice send `_value` token to `_to` from `_from`
  // @param _from The address of the sender
  // @param _to The address of the recipient
  // @param _value The amount of token to be transferred
  // @return the transaction address and send the event as TokenTransfer
  function transferTokenFrom(address _from, address _to, uint256 _value) {
    if (balanceOf[_from] >= _value && allowed[_from][msg.sender] >= _value && _value > 0 && balanceOf[_to] + _value > balanceOf[_to]) {
      balanceOf[_from] -= _value;
      allowed[_from][msg.sender] -= _value;
      balanceOf[_to] += _value;
      TokenTransfer(_from, _to, _value);
    } else {
      throw;
    }
  }

  // What is the balance of a particular account?
  // @param who The address of the particular account
  // @return the balanace the particular account
  function balanceOf(address who) constant returns (uint256 balance) {
    return balanceOf[who];
  }

  // Allow _spender to withdraw from your account, multiple times, up to the _value amount.
  // If this function is called again it overwrites the current allowance with _value.
  // @param _spender The address of the sender
  // @param _amount The amount to be approved
  // @return the success tatus once the Approval progress is completed
  function approve(address _spender, uint256 _amount) returns (bool success) {
    allowed[msg.sender][_spender] = _amount;
    Approval(msg.sender, _spender, _amount);
    return true;
  }

  // Check the allowed value for the spender to withdraw from owner
  // @param _owner The address of the owner
  // @param _spender The address of the spender
  // @return the amount which _spender is still allowed to withdraw from _owner
  function allowance(address _owner, address _spender) constant returns (uint256 remaining) {
    return allowed[_owner][_spender];
  }

  // @return total subscribers count
  function getSubscriberCount() constant returns (uint) {
    return subscriberCount;
  }

  // @return total amount of tokens
  function getTotalSupply() constant returns (uint) {
    return totalSupply;
  }
}
