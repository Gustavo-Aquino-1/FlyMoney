import React, { useEffect, useState } from 'react'
import api from '../api'
import useAppContext from '../context/Context'
import '../styles/home.css'

function Home() {
  const { user } = useAppContext()
  const [expenses, setExpenses] = useState([])
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [type, setType] = useState('pix')
  const [date, setDate] = useState()
  const [day, setDay] = useState(1)
  const [month, setMonth] = useState(new Date().getMonth() + 1)
  const [year, setYear] = useState(new Date().getFullYear())
  const [dayInclude, setDayInclude] = useState(false)

  useEffect(() => {
    const get = async () => {
      const { data } = await api.get('/expense', {
        headers: { Authorization: user.token },
      })
      data[0].title = 'cpsacasals'
      setExpenses(data)
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
    } catch (error) {
      alert(error.response.data.message)
    }
  }

  return (
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

      <div className='grid grid-cols-2 gap-10 max-sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 text-center w-[80%] m-auto mt-20'>
        {expenses.map((e) => (
          <div className='flex gap-5 flex-col capitalize bg-white text-gray-900'>
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
                <td>
                  <p>R$ {e.price}</p>
                </td>
              </tbody>
              <tbody className='border border-1 border-black'>
                <th className='border border-1 border-black bg-teal-600 text-white p-1'>
                  Type
                </th>
                <td>
                  <p>
                    {e.paymentType}
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
                  <p>{e.date.split('T')[0]}</p>
                </td>
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
