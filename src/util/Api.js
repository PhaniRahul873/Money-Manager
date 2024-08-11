const ipAddress = {
  'gautham':'192.168.29.171',
  'koushik':'192.168.1.34'
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
    `${url}/api/pieChart/getTransactionAmountByCategory?user=1&startTime=${startTime}&endTime=${endTime}&transactionType=${transactionType}`
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
  fetch(`${url}/api/balance?user=1`)
    .then((response) => response.json())
    .then((data) => {
      // console.log('fetched data',data)
      const newBalance = data[0].currentBalance
      setBalance(newBalance)
    })
    .catch((error) => console.error('error loading data', error))
}

const getRecentTransactions = (setDataList) => {
  fetch(`${url}/api/recents?user=1`)
    .then((response) => response.json())
    .then((data) => {
      // console.log('fetched data',data)
      setDataList(data)
    })
    .catch((error) => console.error('error loading data', error))
}

const addExpense = (newItem) => {
  fetch(`${url}/api/expense`, {
    method: 'POST',
    headers: { 'content-Type': 'application/json' },
    body: JSON.stringify(newItem)
  })
    .then((response) => response.json())
    .then((data) => console.log('added item', data))
    .catch((error) => console.log('Error', error))
}

const addIncome = (newItem) => {
  fetch(`${url}/api/income`, {
    method: 'POST',
    headers: { 'content-Type': 'application/json' },
    body: JSON.stringify(newItem)
  })
    .then((response) => response.json())
    .then((data) => console.log('new Income', data))
    .catch((error) => console.log('Error', error))
}

const deleteExpense = (expense) => {
  fetch(`${url}/api/deleteExpense`, {
    method: 'DELETE',
    headers: { 'content-Type': 'application/json' },
    body: JSON.stringify(expense)
  })
    .then((response) => response.json())
    .then((data) => console.log('deleted', data))
    .catch((error) => console.log('Error', error))
}

module.exports = {
  getTransactionAmountByCategory,
  getBalance,
  getRecentTransactions,
  addExpense,
  addIncome,
  deleteExpense,
  getTransactionsList
}
