import { useEffect, useState } from 'react'
import './App.css'
import Conversor from './Conversor'

export default function App() {
  const [search, setSearch] = useState('')
  const [baseValue, setBaseValue] = useState(0)
  const [conversionValue, setConversionValue] = useState(0)
  const [conversionSymbol, setConversionSymbol] = useState('BRL')
  const [conversors, setConversors] = useState([])

  const searchFilter = (currency) => {
    return currency.symbol.toUpperCase().match('^.*' + search.toUpperCase() + '.*$')
  }

  useEffect(() => {
    fetch('http://localhost:5000/currency')
      .then(res => res.json())
      .then((data) => {
        const conversors = []
        for (const currency in data) {
          conversors.push({
            symbol: currency,
            conversion: data[currency]
          })
        }

        setConversors(conversors)
      })
  }, [])

  return (
    <div>
      <h1> Money Conversor</h1>
      <div className='container'>
        <input className='search' value={search} onChange={(e) => setSearch(e.target.value)} />
        {
          conversors.filter(searchFilter).map(({ symbol, conversion }) => {
            return (
              <Conversor
                name="Real"
                symbol={symbol}
                conversion={conversion}
                conversionValue={conversionValue}
                setConversionValue={setConversionValue}
                conversionSymbol={conversionSymbol}
                setConversionSymbol={setConversionSymbol}
                baseValue={baseValue}
                setBaseValue={setBaseValue} />
            )
          })
        }
      </div>
    </div>
  )
}