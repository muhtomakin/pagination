import React, { useEffect, useState } from 'react';
import Follower from './Follower';

const url = 'https://api.github.com/users/john-smilga/followers?per_page=100'

const Main = () => {

    const [loading, setLoading] = useState(true)
    const [updateData, setUpdateData] = useState([])
    const [page, setPage] = useState(0)
    const [followers, setFollowers] = useState([])

    const nextPage = () => {
        setPage((oldPage) => {
            let nextPage = oldPage +1
            if (nextPage > updateData.length - 1) {
                nextPage = 0;
            }
            return nextPage
        })
    }

    const prevPage = () => {
        setPage((oldPage) => {
            let prevPage = oldPage - 1
            if (prevPage < 0) {
                prevPage = updateData.length - 1
            }
            return prevPage
        })
    }

    const handlePage = (index) => {
        setPage(index)
    }

    const getProfiles = async () => {
        const response = await fetch(url)
        const data = await response.json()
        setUpdateData((followers) => {
            const itemsPage = 10;
            const numberPage = Math.ceil(data.length / itemsPage);
            const newProfiles = Array.from({length: numberPage}, (_, index) => {
                const start = index * itemsPage
                return data.slice(start, start + itemsPage)
            })
            return newProfiles;
        })
        setLoading(false)
    }

    useEffect(() => {
        getProfiles()
    }, [])

    useEffect(() => {
        if (loading) {
            return 
        }
            setFollowers(updateData[page])
    }, [loading, page])

    return (
        <main>
      <div className='section-title'>
        <h1>{loading ? 'loading...' : 'pagination'}</h1>
        <div className='underline'></div>
      </div>
      <section className='followers'>
        <div className='container'>
          {followers.map((follower) => {
            return <Follower key={follower.id} {...follower} />
          })}
        </div>
        {!loading && (
          <div className='btn-container'>
            <button className='prev-btn' onClick={prevPage}>
              prev
            </button>
            {updateData.map((item, index) => {
              return (
                <button
                  key={index}
                  className={`page-btn ${index === page ? 'active-btn' : null}`}
                  onClick={() => handlePage(index)}
                >
                  {index + 1}
                </button>
              )
            })}
            <button className='next-btn' onClick={nextPage}>
              next
            </button>
          </div>
        )}
      </section>
    </main>
    );
}

export default Main;
