import React, { useEffect, useState } from 'react'
import api from '../api'
import Header from '../components/Header'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import useAppContext from '../context/Context'

function ArticleDetails({
  match: {
    params: { id },
  },
}) {
  const { user } = useAppContext()
  const [article, setArticle] = useState(null)
  const [font, setFont] = useState('sans')
  const [size, setSize] = useState('20px')
  const [spacing, setSpacing] = useState('40px')
  const [color, setColor] = useState('black')
  const [secondaryColor, setSecondaryColor] = useState('white')
  const [favorite, setFavorite] = useState(false)
  const [click, setClick] = useState(false)

  const handleChange = (size) => {
    setSize(size)
    setSpacing(`${Number(size.split('p')[0]) + 25}px`)
  }

  useEffect(() => {
    const getArticle = async () => {
      const { data } = await api.get(`/article/${id}`)
      setArticle(data)
      const {
        data: { message },
      } = await api.get(`/favorite/${id}`, {
        headers: { Authorization: user.token },
      })
      setFavorite(eval(message))
    }
    getArticle()
  }, [])

  useEffect(() => {
    const saveFavorite = async () => {
      if (click) {
        await api.patch(
          `/save/article/${id}`,
          {},
          {
            headers: { Authorization: user.token },
          },
        )
      }
    }
    saveFavorite()
  }, [favorite])

  return (
    <div className='mb-20'>
      <Header />
      <div className='flex gap-5 mt-10 justify-center flex-wrap w-[80%] m-auto border border-teal text-lg'>
        <p>Options:</p>

        <span>Font: </span>
        <select
          className='border border-teal-600 rounded'
          value={font}
          onChange={(e) => setFont(e.target.value)}
        >
          {[
            'sans-serif',
            'serif',
            'monospace',
            'initial',
            'inherit',
            'fantasy',
            'cursive',
            'sans',
          ].map((e) => (
            <option key={e} value={e}>
              {e}
            </option>
          ))}
        </select>

        <span>Size: </span>
        <select
          className='border border-teal-600 rounded'
          value={size}
          onChange={(e) => handleChange(e.target.value)}
        >
          {['20px', '25px', '30px', '35px', '40px', '45px', '50px'].map(
            (e, i) => (
              <option key={e} value={e}>
                {i + 1}
              </option>
            ),
          )}
        </select>

        <span>Color: </span>
        <select
          className='border border-teal-600 rounded'
          value={color}
          onChange={(e) => setColor(e.target.value)}
        >
          {[
            'black',
            'white',
            'blue',
            'red',
            'gray',
            'green',
            'orange',
            'gold',
            'beige',
            'teal',
          ].map((e, i) => (
            <option key={e} value={e}>
              {e}
            </option>
          ))}
        </select>

        <span>Secondary Color: </span>
        <select
          className='border border-teal-600 rounded'
          value={secondaryColor}
          onChange={(e) => setSecondaryColor(e.target.value)}
        >
          {[
            'black',
            'white',
            'blue',
            'red',
            'gray',
            'green',
            'orange',
            'gold',
            'beige',
            'teal',
          ].map((e, i) => (
            <option key={e} value={e}>
              {e}
            </option>
          ))}
        </select>
      </div>
      <div
        style={{ color, background: secondaryColor, border: `2px solid ${color}` }}
        className='w-[70%] m-auto mt-20 p-10 rounded-lg flex flex-col gap-10'
      >
        <p
          onClick={() => {
            setFavorite(!favorite)
            setClick(true)
          }}
          className='self-end cursor-pointer'
        >
          {favorite ? <AiFillStar size={30} /> : <AiOutlineStar size={30} />}
        </p>
        <p
          style={{ fontFamily: font, fontSize: size }}
          className='text-center text-2xl first-letter:capitalize mt-[-25px]'
        >
          {article?.title}
        </p>
        <p
          style={{ fontFamily: font, fontSize: size, lineHeight: spacing }}
          className='text-lg first-letter:capitalize text-justify'
        >
          {article?.context.split('\n').map((e) => <span>{`${e}`}<br/></span>)}
        </p>
      </div>
    </div>
  )
}

export default ArticleDetails
