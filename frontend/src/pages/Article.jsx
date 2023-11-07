import React, { useEffect, useState } from 'react'
import api from '../api'
import Header from '../components/Header'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

function Article() {
  const [articles, setArticles] = useState([])
  const { push } = useHistory()

  useEffect(() => {
    const getArticles = async () => {
      const { data } = await api.get('/article')
      setArticles(data)
    }
    getArticles()
  }, [])

  return (
    <div>
      <Header />
      <div className='mt-10'>
        <div className='flex gap-5 justify-start w-[80%] m-auto'>
          {articles.map((e) => (
            <div
              onClick={() => push(`/article/${e.id}`)}
              className='p-2 bg-white border border-black h-[120px] w-[220px] rounded flex flex-col justify-between'
            >
              <p className='text-xl first-letter:capitalize mt-2 ml-2'>
                {e.title}
              </p>
              <p className='self-end text-gray-500'>
                {e.createdAt.split('T')[0]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Article
