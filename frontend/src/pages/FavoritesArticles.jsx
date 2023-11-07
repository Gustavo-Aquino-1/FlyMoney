import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import api from '../api'
import useAppContext from '../context/Context'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

function FavoritesArticles() {
  const { user } = useAppContext()
  const [favorites, setFavorites] = useState([])
  const { push } = useHistory()

  useEffect(() => {
    const getFavorites = async () => {
      const { data } = await api.get('/favorites', {
        headers: { Authorization: user.token },
      })
      setFavorites(data)
    }
    getFavorites()
  }, [])

  return (
    <div>
      <Header />
      <div className='grid grid-cols-4 w-[80%] m-auto mt-20 gap-5'>
        {favorites.map((e) => (
          <div
            onClick={() => push(`/article/${e.id}`)}
            className='p-2 bg-white border border-black min-w-[140px] min-h-[120px] rounded flex flex-col justify-between cursor-pointer'
          >
            <p className='text-xl first-letter:capitalize mt-2 ml-2'>
              {e.title}
            </p>
            <p className='self-end text-gray-500'>
            {e.createdAt.split('T')[0].split('-').reverse().join('/')}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FavoritesArticles
