import { useQuery } from "@tanstack/react-query"
import { getIssues } from "../actions"
import { State } from "../interfaces"
import { useEffect, useState } from "react"

interface Props {
  state: State
  selectedLabel: string[]
}

export const useIssues = ({state, selectedLabel }:Props) => {

  const [page, setPage] = useState(1)

    const issuesQuery = useQuery({
      // cuando el orden no importa se puede mandar como un objeto
        queryKey: ['issues', { state, selectedLabel, page }],
        queryFn: () => getIssues( state, selectedLabel,page ),
        staleTime: 1000 * 60,
    })

    useEffect(() => {
      setPage(1)
    }, [state])

    const nextPage = () => {
      if(issuesQuery.data?.length === 0) {
        return
      }

      setPage(e => e + 1)
    }

    const prevPage = () => {
      if(page === 1) {
        return
      }

      setPage(e => e - 1)
    }

  return {
    //state
    page,
    issuesQuery,
    //methods
    //actions
    nextPage,
    prevPage
  }
}
