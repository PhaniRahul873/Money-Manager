const gauthamIPAddress = '192.168.29.171'; // Don't remove this. Please add yours.
const ipAddress = gauthamIPAddress;


const getTransactionsList = async (
  startTime,
  endTime
) => {
  return fetch(
    `http://${ipAddress}:3000/api/transactions?user=1&startTime=${startTime}&endTime=${endTime}`
  )
    .then(async (response) => {
      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Network response was not ok: ${errorText}`)
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
  startTime,
  endTime,
  transactionType
) => {
  return fetch(
    `http://${ipAddress}:3000/api/pieChart/getTransactionAmountByCategory?user=1&startTime=${startTime}&endTime=${endTime}&transactionType=${transactionType}`
  )
    .then(async (response) => {
      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Network response was not ok: ${errorText}`)
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

const getBalance = (setBalance) => {
  fetch(`http://${ipAddress}:3000/api/balance?user=1`)
    .then((response) => response.json())
    .then((data) => {
      // console.log('fetched data',data)
      const newBalance = data[0].currentBalance
      setBalance(newBalance)
    })
    .catch((error) => console.error('error loading data', error))
}

const getRecentTransactions = (setDataList) => {
  fetch(`http://${ipAddress}:3000/api/recents?user=1`)
    .then((response) => response.json())
    .then((data) => {
      // console.log('fetched data',data)
      setDataList(data)
    })
    .catch((error) => console.error('error loading data', error))
}

const addExpense = (newItem) => {
  fetch(`http://${ipAddress}:3000/api/expense`, {
    method: 'POST',
    headers: { 'content-Type': 'application/json' },
    body: JSON.stringify(newItem)
  })
    .then((response) => response.json())
    .then((data) => console.log('added item', data))
    .catch((error) => console.log('Error', error))
}

const addIncome = (newItem) => {
  fetch(`http://${ipAddress}:3000/api/income`, {
    method: 'PUT',
    headers: { 'content-Type': 'application/json' },
    body: JSON.stringify(newItem)
  })
    .then((response) => response.json())
    .then((data) => console.log('new Income', data))
    .catch((error) => console.log('Error', error))
}

module.exports = {
  getTransactionAmountByCategory,
  getBalance,
  getRecentTransactions,
  addExpense,
  addIncome,
  getTransactionsList
}
