import React, { useEffect, useState } from 'react'
import api from '../api'
import Header from '../components/Header'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

function Article() {
  const [articles, setArticles] = useState([])
  const [searchString, setSearchString] = useState('')
  const { push } = useHistory()

  useEffect(() => {
    const getArticles = async () => {
      const { data } = await api.get('/article')
      setArticles(data)
    }
    getArticles()
  }, [])

  const getArticlesBySearchString = async () => {
    try {
      if(searchString.length > 1) {
        const { data } = await api.get('/article?title=' + searchString)
        setArticles(data)
      } else {
        alert('the min length accept to the search is 2')
      }
    } catch (error) {
      alert(error.response.data.message)
    }
  }

  return (
    <div>
      <Header />
      <div className='mt-10 flex flex-col gap-10 items-center'>
        <div className='w-[70%] m-auto flex justify-center'>
          <input
            type='text'
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
            placeholder='How start with investments'
            className='p-4 outline-none rounded-l-lg'
          />
          <button
          onClick={getArticlesBySearchString}
          className='bg-blue-800 text-white p-4 rounded-r-lg'>Search</button>
        </div>
        <div className='grid grid-cols-4 gap-5 justify-start w-[80%] m-auto'>
          {articles.map((e) => (
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
    </div>
  )
}

export default Article
