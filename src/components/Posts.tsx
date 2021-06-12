import React from 'react'
import { useSelector } from 'react-redux'
import { DefaultRootState } from 'store'

export default () => {
  const posts = useSelector((state: DefaultRootState) => state.posts)
  return (
    <>
      <h3>Posts:</h3>
      <select>
        {posts.map(post => (
          <option key={post.id} value={post.id}>
            {post.title}
          </option>
        ))}
      </select>
    </>
  )
}
