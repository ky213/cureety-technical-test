import React from 'react'
import { useSelector } from 'react-redux'
import { DefaultRootState } from 'store'

export default () => {
  const users = useSelector((state: DefaultRootState) => state.users)
  return (
    <>
      <h3>Users:</h3>
      <select>
        {users.map(user => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
    </>
  )
}
