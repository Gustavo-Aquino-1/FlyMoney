import React, { useEffect, useState } from 'react'
import api from '../api'
import useAppContext from '../context/Context'
import '../styles/home.css'

function Home() {
  const { user } = useAppContext()
  const [expenses, setExpenses] = useState([])

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

  return (
    <div className='h-full h-screen bg-gradient-to-r'>
      <div>form</div>
      <div>filters</div>
      <div className='grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-4 text-center w-[80%] m-auto mt-20'>
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
                    {e.title.length > 11 && '...'}
                  </p>
                </td>
              </tbody>
              <tbody className='border border-1 border-black'>
                <th className='border border-1 border-black bg-teal-600 text-white p-1'>
                  Price
                </th>
                <td>
                  <p>{e.price} R$</p>
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
