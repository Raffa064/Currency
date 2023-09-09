import { useEffect, useState } from 'react'
import './App.css'
import Converter from './Converter'

export default function App() {
  const [searchText, setSearchText] = useState('')
  const [currencyList, setCurrencyList] = useState([])
  const currentValueState = useState(0)
  const conversionState = useState({})

  useEffect(() => {
    fetch('http://localhost:5000/currency')
      .then(res => res.json())
      .then((data) => {
        const currencyList = []

        for (const currencyData in data) {
          currencyList.push({
            currency: currencyData,
            conversionRate: data[currencyData]
          })
        }

        setCurrencyList(currencyList)
      })
  }, [])

  const searchFilter = (currencyData) => {
    const upperCaseName = currencyData.currency.toUpperCase()
    const regex = '^.*' + searchText.toUpperCase() + '.*$'

    return upperCaseName.match(regex)
  }

  return (
    <div>
      <h1>💵 Currency Converter</h1>
      <div className='container'>
        <input className='search' value={searchText} placeholder="Search currency (RegEx filter)" onChange={(e) => setSearchText(e.target.value)} />
        {
          currencyList
            .filter(searchFilter)
            .map(({ currency, conversionRate }) => {
              return (
                <Converter
                  currency={currency}
                  conversionRate={conversionRate}
                  currentValueState={currentValueState}
                  conversionState={conversionState} />
              )
            })
        }
      </div>
    </div>
  )
}