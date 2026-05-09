import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {

  const [accounts, setAccounts] = useState([]);
  const [accountId, setAccountId] = useState("");
const [amount, setAmount] = useState("");
const [senderId, setSenderId] = useState("");
const [receiverId, setReceiverId] = useState("");
const [transferAmount, setTransferAmount] = useState("");
const [transactions, setTransactions] = useState([]);
const [accountType, setAccountType] = useState("");
const [withdrawAccountId, setWithdrawAccountId] = useState("");
const [withdrawAmount, setWithdrawAmount] = useState("");


  useEffect(() => {

    fetchAccounts();
    fetchTransactions();

  }, []);

  const fetchAccounts = async () => {

    try {

      const response = await axios.get(
        "http://localhost:8080/api/accounts/all"
      );

      setAccounts(response.data);

    } catch (error) {

      console.log(error);

    }
  };
  const fetchTransactions = async () => {

    try {
  
      const response = await axios.get(
        "http://localhost:8080/api/transactions/all"
      );
  
      setTransactions(response.data);
  
    } catch (error) {
  
      console.log(error);
  
    }
  };
  const handleDeposit = async () => {

    try {
  
      await axios.post(
        "http://localhost:8080/api/accounts/deposit",
        {
          accountId: Number(accountId),
          amount: Number(amount)
        }
      );
  
      alert("Deposit Successful!");
  
      fetchAccounts();
      fetchTransactions();
  
      setAccountId("");
      setAmount("");
  
    } catch (error) {
  
      console.log(error);
  
      alert("Deposit Failed!");
  
    }
  };
  const handleWithdraw = async () => {

    try {
  
      await axios.post(
        "http://localhost:8080/api/accounts/withdraw",
        {
          accountId: Number(withdrawAccountId),
          amount: Number(withdrawAmount)
        }
      );
  
      alert("Withdraw Successful!");
  
      fetchAccounts();
      fetchTransactions();
  
      setWithdrawAccountId("");
      setWithdrawAmount("");
  
    } catch (error) {
  
      console.log(error);
  
      alert("Withdraw Failed!");
  
    }
  };
  const handleTransfer = async () => {

    try {
  
      await axios.post(
        "http://localhost:8080/api/accounts/transfer",
        {
          senderAccountId: Number(senderId),
          receiverAccountId: Number(receiverId),
          amount: Number(transferAmount)
        }
      );
  
      alert("Transfer Successful!");
  
      fetchAccounts();
      fetchTransactions();
  
      setSenderId("");
      setReceiverId("");
      setTransferAmount("");
  
    } catch (error) {
  
      console.log(error);
  
      alert("Transfer Failed!");
  
    }
  };
  const handleDeleteAccount = async (id) => {

    try {
  
      await axios.delete(
        `http://localhost:8080/api/accounts/delete/${id}`
      );
  
      alert("Account Deleted!");
  
      fetchAccounts();
  
    } catch (error) {
  
      console.log(error);
  
      alert("Delete Failed!");
  
    }
  };
  const handleCreateAccount = async () => {

    try {
  
      await axios.post(
        "http://localhost:8080/api/accounts/create",
        {
          email: "liam@example.com",
          accountType: accountType
        }
      );
  
      alert("Account Created!");
  
      fetchAccounts();
  
      setAccountType("");
  
    } catch (error) {
  
      console.log(error);
  
      alert("Failed to Create Account!");
  
    }
  };
  

  return (

    <div style={{
      padding: "30px",
      fontFamily: "Arial"
    }}>

<div style={{
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
}}>

  <h1>Banking Dashboard</h1>
  <p style={{
  color: "gray",
  marginBottom: "20px"
}}>
  Secure Banking Simulation System
</p>

  <button
    onClick={() => {
      localStorage.removeItem("token");
      window.location.reload();
    }}
    style={{
      padding: "10px 20px",
      backgroundColor: "red",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer"
    }}
  >
    Logout
  </button>

</div>

      <div style={{
  marginTop: "20px",
  marginBottom: "30px"
}}>

  <h2>Deposit Money</h2>

  <input
    type="number"
    placeholder="Enter Account ID"
    value={accountId}
    onChange={(e) => setAccountId(e.target.value)}
    style={{
      margin: "10px",
      padding: "10px"
    }}
  />

  <input
    type="number"
    placeholder="Enter Amount"
    value={amount}
    onChange={(e) => setAmount(e.target.value)}
    style={{
      margin: "10px",
      padding: "10px"
    }}
  />

  <button
    onClick={handleDeposit}
    style={{
      padding: "10px 20px"
    }}
  >
    Deposit
  </button>

</div>
<div style={{
  marginBottom: "30px"
}}>

  <h2>Withdraw Money</h2>

  <input
    type="number"
    placeholder="Enter Account ID"
    value={withdrawAccountId}
    onChange={(e) => setWithdrawAccountId(e.target.value)}
    style={{
      margin: "10px",
      padding: "10px"
    }}
  />

  <input
    type="number"
    placeholder="Enter Amount"
    value={withdrawAmount}
    onChange={(e) => setWithdrawAmount(e.target.value)}
    style={{
      margin: "10px",
      padding: "10px"
    }}
  />

  <button
    onClick={handleWithdraw}
    style={{
      padding: "10px 20px"
    }}
  >
    Withdraw
  </button>

</div>
<div style={{
  marginBottom: "30px"
}}>

  <h2>Transfer Money</h2>

  <input
    type="number"
    placeholder="Sender Account ID"
    value={senderId}
    onChange={(e) => setSenderId(e.target.value)}
    style={{
      margin: "10px",
      padding: "10px"
    }}
  />

  <input
    type="number"
    placeholder="Receiver Account ID"
    value={receiverId}
    onChange={(e) => setReceiverId(e.target.value)}
    style={{
      margin: "10px",
      padding: "10px"
    }}
  />

  <input
    type="number"
    placeholder="Amount"
    value={transferAmount}
    onChange={(e) => setTransferAmount(e.target.value)}
    style={{
      margin: "10px",
      padding: "10px"
    }}
  />

  <button
    onClick={handleTransfer}
    style={{
      padding: "10px 20px"
    }}
  >
    Transfer
  </button>

</div>
<div>
<div style={{
  marginBottom: "30px"
}}>

  <h2>Create Account</h2>

  <input
    type="text"
    placeholder="Account Type"
    value={accountType}
    onChange={(e) => setAccountType(e.target.value)}
    style={{
      margin: "10px",
      padding: "10px"
    }}
  />


  <button
    onClick={handleCreateAccount}
    style={{
      padding: "10px 20px"
    }}
  >
    Create Account
  </button>

</div>

  <h2>Transaction History</h2>

  <table
    border="1"
    cellPadding="10"
    style={{
      marginTop: "20px",
      borderCollapse: "collapse",
      width: "100%"
    }}
  >

    <thead>

      <tr>

        <th>Type</th>
        <th>Amount</th>
        <th>Sender ID</th>
        <th>Receiver ID</th>
        <th>Timestamp</th>

      </tr>

    </thead>

    <tbody>

      {transactions.map((transaction) => (

        <tr key={transaction.id}>

          <td>{transaction.type}</td>

          <td>
            ₹ {transaction.amount}
          </td>

          <td>
            {transaction.senderAccountId}
          </td>

          <td>
            {transaction.receiverAccountId}
          </td>

          <td>
            {transaction.timestamp}
          </td>

        </tr>

      ))}

    </tbody>

  </table>

</div>

      <div style={{
        display: "flex",
        gap: "20px",
        marginTop: "20px",
        flexWrap: "wrap"
      }}>

        {accounts.map((account) => (

          <div
            key={account.id}
            style={{
              border: "1px solid gray",
              padding: "20px",
              borderRadius: "10px",
              width: "250px"
            }}
          >

            <h3>{account.accountType} Account</h3>

            <p>
              Account Number:
              {account.accountNumber}
            </p>

            <h2>
              ₹ {account.balance}
            </h2>
            <button
  onClick={() => handleDeleteAccount(account.id)}
  style={{
    marginTop: "15px",
    padding: "10px",
    backgroundColor: "red",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  }}
>
  Delete Account
</button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Dashboard;