import { useQuery } from "vue-query";
import { getIndex } from '../helpers/network'

export const useHateoas = () => {

    const hateoasQuery = reactive(useQuery(
        ['hateoas'],
        () => getIndex(),
        { staleTime: 10000000 }
    ))

    const getUrl = type => {
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
        )
    })

    return { ...toRefs(reactiveContainer), getUrl }
}