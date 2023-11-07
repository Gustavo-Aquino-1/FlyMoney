import React, { useEffect, useState } from 'react'
import useAppContext from '../context/Context'
import Header from '../components/Header'
import api from '../api'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

function ExpenseDetails() {
  const { user, expense, setExpense } = useAppContext()
  const [title, setTitle] = useState(expense.title)
  const [price, setPrice] = useState(expense.price)
  const [type, setType] = useState(expense.paymentType)
  const [date, setDate] = useState(expense.date)
  const [edit, setEdit] = useState(false)
  const [showEdit, setShowEdit] = useState('gray')
  const { push } = useHistory()

  useEffect(() => {
    if (edit) setShowEdit('white')
    else setShowEdit('#D3D3D3')
  }, [edit])

  const handleSubmit = async (e) => {
    if (edit) {
      e.preventDefault()
      try {
        await api.put(
          '/expense/' + expense.id,
          {
            title,
            price,
            paymentType: type,
            date,
          },
          { headers: { Authorization: user.token } },
        )
        alert('Updated sucessfully')
        setExpense({ id: expense.id, title, price, paymentType: type, date })
      } catch (error) {
        alert(error.response.data.message)
      }
    } else {
      alert('Please, click "edit" to edit your expense!')
    }
  }

  const deleteExpense = async () => {
    try {
      await api.delete('/expense/' + expense.id, {
        headers: { Authorization: user.token },
      })
      alert('Deleted sucessfully')
      setExpense(null)
      push('/home')
    } catch (error) {
      alert(error.response.data.message)
    }
  }

  return (
    <div>
      <Header />
      <div className='mt-10'>
        <div className='flex gap-5 justify-center w-[80%] m-auto mb-20'>
          <button
            onClick={() => setEdit(!edit)}
            className='pr-2 pl-2 rounded text-lg bg-teal-600 text-white'
          >
            Edit
          </button>
          <button
            onClick={deleteExpense}
            className='pr-2 pl-2 rounded text-lg bg-red-600 text-white'
          >
            Delete
          </button>
        </div>

        <div className='w-[50%] m-auto border-2 border-black p-4 rounded bg-white'>
          <form
            onSubmit={handleSubmit}
            className='flex flex-col gap-5 w-[80%] m-auto mt-10 items-start'
          >
            <label className='flex items-center gap-5 text-xl p-2'>
              Title
              <textarea
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                readOnly={!edit}
                className='p-2 border-2 border-teal-700 rounded'
                style={{ backgroundColor: showEdit }}
              ></textarea>
            </label>

            <label className='flex items-center gap-5 text-xl p-2'>
              Payment Type:
              <select
                value={type}
                onChange={(e) => {
                  if (edit) setType(e.target.value)
                }}
                className='border-2 border-teal-700 rounded p-2'
                style={{ backgroundColor: showEdit }}
              >
                {['pix', 'debit card', 'credit card', 'money', 'other'].map(
                  (e) => (
                    <option value={e}>{e}</option>
                  ),
                )}
              </select>
            </label>

            <label className='flex items-center gap-5 text-xl p-2'>
              Price
              <input
                type='text'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                readOnly={!edit}
                className='p-2 border-2 border-teal-700 rounded'
                style={{ backgroundColor: showEdit }}
              />
            </label>

            <label className='flex items-center gap-5 text-xl p-2'>
              Date
              <input
                type='date'
                value={date.split('T')[0]}
                onChange={(e) => setDate(e.target.value)}
                required
                className='border-2 border-teal-700 rounded p-2'
                readOnly={!edit}
                style={{ backgroundColor: showEdit }}
              />
            </label>

            <button
              className='pr-3 pl-3 text-lg bg-teal-500 text-white rounded p-2 disabled:opacity-60'
              type='submit'
              disabled={!edit}
            >
              Confirm edit
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ExpenseDetails
