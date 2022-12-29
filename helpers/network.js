const fetchWrapper = async (url, options = {}) => {
    const response = await fetch(url, { ...options })
    return await response.json()
}

export const getIndex = async (hateoasIndex, options = {}) => {
    return await fetchWrapper(hateoasIndex, options)
        .catch(e => console.log(`Error fetching index from '${hateoasIndex}':`, e))
}

export const fetchData = async (url, options = {}) => {
    return await fetchWrapper(url, options)
        .catch(e => console.log(`Error fetching data from '${url}':`, e))
}