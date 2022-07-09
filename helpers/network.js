import { HATEOAS_INDEX } from '../config/config.js'

const fetchWrapper = (url, options = {}) => {
    const defaultOptions = {
        // headers: new Headers({ 'content-type': 'application/json' })
    }
    return fetch(url, { ...defaultOptions, ...options })
        .then((response) =>
            response.json()
        )
}

export const getIndex = async (options = {}) => {
    return await fetchWrapper(HATEOAS_INDEX, options)
        .catch(e => console.log(`Error fetching index from ${HATEOAS_INDEX}:`, e))
}

export const fetchData = async (url, options = {}) => {
    return await fetchWrapper(url, options)
        .catch(e => console.log(`Error fetching data from ${url}:`, e))
}