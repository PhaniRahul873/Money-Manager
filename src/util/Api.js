const ipAddress = {
  'gautham':'192.168.29.171',
  'koushik':'192.168.1.37'
}
const url = `http://${ipAddress.koushik}:3000`

//console.log(url)
const getTransactionsList = async (
  startTime,
  endTime
) => {
  return fetch(
    `${url}/api/transactions?user=1&startTime=${startTime}&endTime=${endTime}`
  )
    .then(async (response) => {
      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Network response was not ok for TransactionsList: ${errorText}`)
      }
      try {
        const data = await response.json()
        return data
      } catch (error) {
        const errorText = await response.text()
        throw new Error(`Failed to parse JSON: ${errorText}`)
      }
    })
    .catch((error) => console.error('error loading data', error))
}

const getTransactionAmountByCategory = async (
  user,
  startTime,
  endTime,
  transactionType
) => {
  return fetch(
    `${url}/api/pieChart/getTransactionAmountByCategory?user=${user}&startTime=${startTime}&endTime=${endTime}&transactionType=${transactionType}`
  )
    .then(async (response) => {
      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Network response was not ok for TransactionsCategory: ${errorText}`)
      }
      try {
        const data = await response.json()
        return data
      } catch (error) {
        const errorText = await response.text()
        throw new Error(`Failed to parse JSON: ${errorText}`)
      }
    })
    .catch((error) => console.error('error loading data', error))
}

const getBalance = (user) => {
  return fetch(`${url}/api/balance?user=${user}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok for getbalance');
      }
      return response.json();
    })
    .then((data) => {
      // console.log('fetched data for balance', data);
      return data[0].currentBalance
    })
    .catch((error) => {
      console.error('error loading data', error);
      throw error;
    });
};

const getRecentTransactions = (user) => {
  return fetch(`${url}/api/recents?user=${user}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok for recents');
      }
      return response.json();
    })
    .then((data) => {
      // console.log('fetched data', data);
      return data;
    })
    .catch((error) => {
      console.error('error loading data', error);
      throw error;
    });
};

const getUserDetails = (user) => {
  return fetch(`${url}/api/user?userId=${user}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok for userdetails');
      }
      return response.json();
    })
    .then((data) => {
      // console.log('fetched user data', data);
      return data;
    })
    .catch((error) => {
      console.error('error loading data', error);
      throw error;
    });
};

const addExpense = (newItem) => {
  return fetch(`${url}/api/expense`,{
    method: 'POST',
    headers: { 'content-Type': 'application/json' },
    body: JSON.stringify(newItem)
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok to add expense');
      }
      return response.json();
    })
    .then((data) => {
      console.log('fetched data', data);
      return data.updatedBalance.Attributes
    })
    .catch((error) => {
      console.error('error loading data', error);
      throw error;
    });
};

const addIncome = (newItem) => {
  return fetch(`${url}/api/income`,{
    method: 'POST',
    headers: { 'content-Type': 'application/json' },
    body: JSON.stringify(newItem)
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok to add income');
      }
      return response.json();
    })
    .then((data) => {
      console.log('fetched data', data);
      return data.Attributes;
    })
    .catch((error) => {
      console.error('error loading data', error);
      throw error;
    });
};

const updateUserDetails = (updateUser) => {
  const user = updateUser.userId
  return fetch(`${url}/api/user/update?userId=${user}`,{
    method: 'PUT',
    headers: { 'content-Type': 'application/json' },
    body: JSON.stringify(updateUser)
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok to update user details');
      }
      return response.json();
    })
    .then((data) => {
      console.log('Updated user', data);
      return data;
    })
    .catch((error) => {
      console.error('error loading data', error);
      throw error;
    });
};

const createUser = (newUser) => {
  return fetch(`${url}/api/newuser`,{
    method: 'POST',
    headers: { 'content-Type': 'application/json' },
    body: JSON.stringify(newUser)
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok to create user');
      }
      return response.json();
    })
    .then((data) => {
      console.log('fetched data', data);
      return data
    })
    .catch((error) => {
      console.error('error loading data', error);
      throw error;
    });
};

const deleteUser = () => {
  return fetch(`${url}/api/user/delete?userId=${user}`,{
    method: 'DELETE',
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok to delete user');
      }
      return response.json();
    })
    .then((data) => {
      console.log('message', data);
      return data
    })
    .catch((error) => {
      console.error('error loading data', error);
      throw error;
    });
};

const deleteExpense = (expense) => {
  return fetch(`${url}/api/deleteExpense`,{
    method: 'DELETE',
    headers: { 'content-Type': 'application/json' },
    body: JSON.stringify(expense)
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok to delete expense');
      }
      return response.json();
    })
    .then((data) => {
      console.log('message', data);
      return data
    })
    .catch((error) => {
      console.error('error loading data', error);
      throw error;
    });
};

module.exports = {
  getTransactionAmountByCategory,
  getBalance,
  getRecentTransactions,
  addExpense,
  addIncome,
  deleteExpense,
  getTransactionsList,
  createUser,
  getUserDetails,
  updateUserDetails,
  deleteUser
}
