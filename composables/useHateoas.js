import { useQuery } from "vue-query";
import { getIndex } from '../helpers/network'

export const useHateoas = () => {

    const config = useRuntimeConfig()

    const hateoasQuery = reactive(useQuery(
        ['hateoas'],
        () => getIndex(config.public.HATEOAS_INDEX),
        { staleTime: 10000000 }
    ))

    const getUrl = type => {
        if (!hateoasQuery.data) {
            throw new Error(`getUrl() no data set! ${JSON.stringify(hateoasQuery)}`)
        }
        return hateoasQuery.data.links.find(link => link.rel === type).href
    }

    const reactiveContainer = reactive({
        isHateoasLoading: computed(
            () => hateoasQuery.isLoading
        ),
        isHateoasError: computed(
            () => hateoasQuery.isError
        ),
        hateoasError: computed(
            () => hateoasQuery.error
        ),
        isHateoasSuccess: computed(
            () => hateoasQuery.isSuccess
        )
    })

    return { ...toRefs(reactiveContainer), getUrl }
}