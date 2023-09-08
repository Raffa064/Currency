import './Conversor.css'

export default function Conversor({ name, symbol, conversion, baseValue, setBaseValue, conversionValue, setConversionValue, conversionSymbol, setConversionSymbol }) {
  const preventNaN = (value) => {
    if (isNaN(value)) return
    setBaseValue(value.toFixed(2))
  }

  const handleConversion = (value) => {
    setConversionValue(value)
    setConversionSymbol(symbol)
    preventNaN(value / conversion)
  }

  return (
    <div className="conversor">
      <h2 className="name"><span className="symbol">{symbol}</span></h2>
      <p className="value">{conversionValue} <strong>{conversionSymbol}</strong> = {(baseValue * conversion).toFixed(2)} <strong>{symbol}</strong></p>
      <input className="input" type="number" placeholder={'Input value in ' + symbol} value={conversionValue} onChange={(e) => handleConversion(e.target.value)} />
    </div>
  )
}