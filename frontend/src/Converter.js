import './Converter.css'

export default function Converter({ currency, conversionRate, currentValueState, conversionState }) {
  const [currentValue, setCurrentValue] = currentValueState
  const [conversion, setConversion] = conversionState

  const handleConversion = (value) => {
    const valueBRL = (value / conversionRate)

    if (!isNaN(valueBRL)) {
      setCurrentValue(valueBRL)

      setConversion({
        fromCurrency: currency,
        plainValue: parseFloat(value)
      })
    }
  }

  const hideIfNaN = (number, value) => {
    if (isNaN(number)) return null

    return value
  }

  return (
    <div className="converter">
      <h2 className="name">{currency}</h2>
      <p className="value">
        {isNaN(conversion.plainValue) || (conversion.plainValue.toFixed(2) + ' ' + conversion.fromCurrency + ' = ')}
        <strong>{(currentValue * conversionRate).toFixed(2)} {currency}</strong>
      </p>
      <input className="input" type="number" placeholder={'Input value in ' + currency} value={conversion.plainValue} onChange={(e) => handleConversion(e.target.value)} />
    </div>
  )
}