import { useEffect, useState } from 'react'
import axios from 'axios'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'
import { useSearchParams, useNavigate } from 'react-router-dom'

const CurrencyChart = ({ symbol }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  // Берём интервал из URL или ставим дефолтный
  const intervalFromUrl = searchParams.get('interval') || '1m'
  const [intervalChart, setIntervalChart] = useState(intervalFromUrl)
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchCandles = async () => {
      try {
        const res = await axios.get(
          `https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=${intervalChart}&limit=60`
        )
        const formatted = res.data.map((candle) => ({
          time: new Date(candle[0]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          close: parseFloat(candle[4]),
        }))
        setData(formatted)
      } catch (err) {
        console.error('Ошибка загрузки свечей:', err)
      }
    }

    fetchCandles()
    const interval = setInterval(fetchCandles, 60000)
    return () => clearInterval(interval)
  }, [intervalChart, symbol])

  const handleIntervalChange = (e) => {
    const newInterval = e.target.value
    setIntervalChart(newInterval)
    searchParams.set('interval', newInterval)
    setSearchParams(searchParams) // обновит URL без перезагрузки
  }

  return (
    <div className="bg-gray-900 text-white p-4 rounded-xl shadow-xl w-full max-w-3xl">
      <h2 className="text-lg mb-4">График {symbol}/USDT ({intervalChart})</h2>
      <select
        name="intervalChange"
        value={intervalChart}
        onChange={handleIntervalChange}
        className="mb-4 p-2 bg-gray-800 text-white rounded"
      >
        <option value="1m">1m</option>
        <option value="5m">5m</option>
        <option value="15m">15m</option>
        <option value="30m">30m</option>
        <option value="1h">1h</option>
        <option value="4h">4h</option>
        <option value="1d">1d</option>
      </select>
      <div className="mt-4">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="time" stroke="#ccc" />
            <YAxis domain={['auto', 'auto']} stroke="#ccc" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="close"
              stroke="#00ff99"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default CurrencyChart
