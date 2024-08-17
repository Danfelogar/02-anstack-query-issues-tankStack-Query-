import { useInfiniteQuery } from "@tanstack/react-query"
import { getIssues } from "../actions"
import { State } from "../interfaces"

interface Props {
  state: State
  selectedLabel: string[]
}

export const useIssuesInfinite = ({state, selectedLabel }:Props) => {

    const issuesQuery = useInfiniteQuery({
        queryKey: ['issues','infinite' ,{ state, selectedLabel }],
        queryFn: ({pageParam, queryKey}) => {

          // esta desestructuraron es para obtener los valores de la queryKey ignorando los primeros dos valores
          const [,,args] = queryKey
          const { state, selectedLabel } = args as Props

          return getIssues( state, selectedLabel, pageParam )
        },
        staleTime: 1000 * 60,
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => lastPage.length > 0 ? allPages.length + 1 : undefined
      })

  return {
    issuesQuery,
  }
}
