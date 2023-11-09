import React, { useEffect, useState } from 'react'
import api from '../api'
import useAppContext from '../context/Context'
import '../styles/home.css'
import Header from '../components/Header'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

function Home() {
  const { user, setExpense } = useAppContext()
  const [expenses, setExpenses] = useState([])
  const [statistics, setStatistics] = useState({})
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [type, setType] = useState('pix')
  const [date, setDate] = useState()
  const [day, setDay] = useState(1)
  const [month, setMonth] = useState(new Date().getMonth() + 1)
  const [year, setYear] = useState(new Date().getFullYear())
  const [dayInclude, setDayInclude] = useState(false)
  const { push } = useHistory()

  useEffect(() => {
    const get = async () => {
      const { data } = await api.get('/expense', {
        headers: { Authorization: user.token },
      })
      setExpenses(data)
      getStatistics(...data)
    }
    get()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await api.post(
        '/expense',
        { title, price, paymentType: type, date },
        {
          headers: { Authorization: user.token },
        },
      )
      const expenseDate = new Date(data.date)
      if (month == expenseDate.getMonth() + 1) {
        setExpenses([...expenses, data])
      }
      setTitle('')
      setPrice('')
      setType('pix')
      setDate('')
    } catch (error) {
      alert(error.response.data.message)
    }
  }

  const handleSubmitFilters = async (e) => {
    e.preventDefault()
    try {
      let filters = `month=${month}&year=${year}`
      if (dayInclude) filters += `&day=${day}`
      const { data } = await api.get('/expense?' + filters, {
        headers: { Authorization: user.token },
      })
      setExpenses(data)
      getStatistics(...data)
    } catch (error) {
      alert(error.response.data.message)
    }
  }

  const handleExpense = (expense) => {
    setExpense(expense)
    push('/expense/details')
  }

  const getStatistics = (...expenses) => {
    let total = 0
    const types = {}
    for (let i = 0; i < expenses.length; i++) {
      total += expenses[i].price
      let type = expenses[i].paymentType
      types[type] = (types[type] || 0) + 1
    }
    setStatistics({ total, types })
  }

  return (
    <div>
      <Header />
      <div className='h-full bg-gradient-to-r flex-col mt-20 pb-20'>
        <form
          onSubmit={handleSubmit}
          className='flex gap-5 max-md:justify-start items-center justify-center flex-wrap m-auto w-[81%]'
        >
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Title'
            className='border-2 border-teal-700 rounded p-2'
            minLength={2}
            required
          />

          <input
            type='text'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder='Price'
            className='border-2 border-teal-700 rounded p-2'
            minLength={1}
            required
          />

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className='border-2 border-teal-700 rounded p-2'
          >
            {['pix', 'debit card', 'credit card', 'money', 'other'].map((e) => (
              <option value={e}>{e}</option>
            ))}
          </select>

          <input
            type='date'
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className='border-2 border-teal-700 rounded p-2'
          />

          <button
            type='submit'
            className='bg-teal-600 text-white p-2 rounded font-medium'
          >
            create expense
          </button>
        </form>

        <div className='mt-20 flex justify-center '>
          <form
            onSubmit={handleSubmitFilters}
            className='flex gap-5 flex-wrap items-center justify-center w-[80%] max-md:justify-start'
          >
            <span className='text-xl'>Filter By Date:</span>
            <p
              className='text-lg'
              style={{ textDecoration: !dayInclude && 'line-through' }}
            >
              Day:{' '}
            </p>
            <select
              className='p-2 text-md border border-teal-700 rounded'
              value={day}
              onChange={(e) => setDay(e.target.value)}
            >
              {new Array(31).fill(0).map((e, i) => (
                <option value={i + 1}>{i + 1}</option>
              ))}
            </select>
            <input
              type='checkbox'
              onChange={(e) => setDayInclude(!dayInclude)}
              className='h-[20px] w-[20px]'
            />
            <p className='text-lg'>Month: </p>
            <select
              className='p-2 text-md border border-teal-700 rounded'
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            >
              {new Array(12).fill(0).map((e, i) => (
                <option value={i + 1}>{i + 1}</option>
              ))}
            </select>
            <p className='text-lg'>Year: </p>
            <select
              className='p-2 text-md border border-teal-700 rounded'
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              {new Array(50).fill(0).map((e, i) => (
                <option value={2023 - i}>{2023 - i}</option>
              ))}
            </select>
            <button
              type='submit'
              className='bg-teal-600 text-white font-medium p-2 rounded'
            >
              Filter
            </button>
          </form>
        </div>

        <div className='grid grid-cols-2 gap-10 max-sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 text-center w-[80%] m-auto mt-20 flex justify-center'>
          {expenses.map((e) => (
            <div
              onClick={() => handleExpense(e)}
              className='flex gap-5 flex-col capitalize bg-white text-gray-900 cursor-pointer'
            >
              <table className='border border-1 border-black'>
                <tbody className='border border-1 border-black'>
                  <th className='border border-1 border-black bg-teal-600 text-white p-1'>
                    Title
                  </th>
                  <td title={e.title} className=''>
                    <p>
                      {e.title
                        .split('')
                        .filter((e, i) => i <= 8)
                        .join('')}
                      {e.title.length >= 10 && '...'}
                    </p>
                  </td>
                </tbody>
                <tbody className='border border-1 border-black'>
                  <th className='border border-1 border-black bg-teal-600 text-white p-1'>
                    Price
                  </th>
                  <td title={e.price}>
                    <p>R$ {String(e.price).split('').filter((e,j) => j <= 4).join('')}{String(e.price).length >= 5 && '...'}</p>
                  </td>
                </tbody>
                <tbody className='border border-1 border-black'>
                  <th className='border border-1 border-black bg-teal-600 text-white p-1'>
                    Type
                  </th>
                  <td>
                    <p>
                      {e.paymentType.split(' ')[0]}
                      {e.paymentType == 'pix' && ' ❖'}
                      {e.paymentType.includes('card') && ' 💳'}
                      {e.paymentType == 'money' && ' 💵'}
                    </p>
                  </td>
                </tbody>
                <tbody className='border border-1 border-black'>
                  <th className='border border-1 border-black bg-teal-600 text-white p-1'>
                    Date
                  </th>
                  <td>
                    <p>{e.date.split('T')[0].split('-').reverse().join('/')}</p>
                  </td>
                </tbody>
              </table>
            </div>
          ))}
        </div>
        <div className='mt-28 flex flex-col justify-center items-center'>
          <p className='mb-10 text-3xl '>Statistics</p>
          <div>
            <p className='text-xl'>{`Expenses: ${expenses.length}`}</p>
            <p className='text-xl'>{`Total: R$ ${statistics.total}`}</p>
          </div>
          <div className='h-[450px] lg:w-[45%] md:w-[60%] sm:w-[80%] bg-white border-4 border-teal-600 rounded flex items-end justify-around mt-10 pt-20'>
            {Object.keys(statistics.types || {}).map((e) => (
              <p
                className='bg-teal-600 text-white capitalize w-[15%] text-center p-2 rounded-t-lg'
                style={{
                  height:
                    (((statistics.types[e] / expenses.length) * 100) + 10).toFixed(0) +
                    '%',
                }}
              >
                {e.split(' ')[0]}
                {` (${(
                (statistics.types[e] / expenses.length) *
                100
              ).toFixed(0)}%)`}
                {/* {`${e}: ${statistics.types[e]} - ${(
                (statistics.types[e] / expenses.length) *
                100
              ).toFixed(0)}%`} */}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
