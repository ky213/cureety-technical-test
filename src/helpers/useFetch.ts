import { useEffect, useState } from 'react'
import LZString from 'lz-string'

import store, { ACTIIONS } from 'store'

export default class UseFetch {
  //defualt config
  static config = {
    baseUrl: 'https://jsonplaceholder.typicode.com',
    authentificationHeader: () => {
      return {
        Authorization: localStorage.getItem('id_token'),
      }
    },
    compressionTimeoutDelay: 200,
    maximumSize: 2 * 1024 * 1024, // 2Mb.,
    protectedFromCleaning: ['profile', /^patients\/importants/],
  }

  static configure(setConfig) {
    setConfig(UseFetch.config)
  }
}

export const compressData = (rawData: string) =>
  new Promise<string>((resolve, reject) => {
    try {
      //if compression take longer than 200ms we save raw data
      setTimeout(() => {
        resolve(rawData)
      }, 200)

      const compressedData = LZString.compress(rawData)

      resolve(compressedData)
    } catch (error) {
      reject('compression error: ' + error.message)
    }
  })

export const saveDataToLocalStorage = async (data: string) => {
  try {
    const finalData = await compressData(data)
    localStorage.setItem('myData', finalData)
  } catch (error) {
    console.log('error saving data to local storage: ', error.message)
  }
}

const useFetch = (callback: Function): [any, boolean] => {
  const [state, setState] = useState<{ [x: string]: any; loading: boolean }>({
    loading: false,
  })
  const fetchRequests = callback((url: RequestInfo, options: RequestInit) => ({
    url,
    options,
  }))
  const baseUrl = UseFetch.config.baseUrl
  const entities = Object.keys(fetchRequests)
  const queries =
    Object.values<{ url: RequestInfo; options: RequestInit }>(fetchRequests)

  let dataAccumulator = {}

  useEffect(() => {
    setState({ loading: true })
    store.dispatch({ type: ACTIIONS.SET_LOADING, payload: true })

    entities.forEach(async (entity, index) => {
      try {
        const { url, options } = queries[index]
        const response = await fetch(baseUrl + url, options)
        const data = await response.json()

        dataAccumulator = { ...dataAccumulator, [entity]: data }

        //only if we reach the last request
        if (index === entities.length - 1) {
          saveDataToLocalStorage(JSON.stringify(dataAccumulator))
          setState({ ...dataAccumulator, loading: false })
          store.dispatch({
            type: ACTIIONS.SET_STATE,
            payload: { ...dataAccumulator, loading: false },
          })
        }
      } catch (error) {
        setState({ ...state, loading: false })
        store.dispatch({
          type: ACTIIONS.SET_ERROR,
          payload: { [entity]: error.message },
        })
      }
    })
  }, [])

  return [state, state.loading]
}

export { useFetch }
