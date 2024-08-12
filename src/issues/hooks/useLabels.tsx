import { useQuery } from "@tanstack/react-query"
import { getLabels } from "../actions"

export const useLabels = () => {

  const labelsQuery = useQuery({
    queryKey: ['labels'],
    queryFn: getLabels,
    staleTime: 1000 * 60 * 60, // 1 hora donde los datos no se consideran viejos

    // placeholderData: [
    //     {
    //         id: 791921801,
    //         node_id: "MDU6TGFiZWw3OTE5MjE4MDE=",
    //         url: "https://api.github.com/repos/facebook/react/labels/%E2%9D%A4%EF%B8%8F",
    //         name: "❤️",
    //         color: "ffffff",
    //         default: false,
    //     } satisfies GithubLabel,
    //     {
    //         id: 71502270,
    //         node_id: "MDU6TGFiZWw3MTUwMjI3MA==",
    //         url: "https://api.github.com/repos/facebook/react/labels/Component:%20Build%20Infrastructure",
    //         name: "Component: Build Infrastructure",
    //         color: "f9d0c4",
    //         default: false
    //     }
    // ] // este es un placeholder es la información que se muestra mientras se hace el fetch una vez que se obtiene la información se muestra la información mas reciente

    // initialData:[
    //     {
    //         id: 791921801,
    //         node_id: "MDU6TGFiZWw3OTE5MjE4MDE=",
    //         url: "https://api.github.com/repos/facebook/react/labels/%E2%9D%A4%EF%B8%8F",
    //         name: "❤️",
    //         color: "ffffff",
    //         default: false,
    //     } satisfies GithubLabel,
    //     {
    //         id: 71502270,
    //         node_id: "MDU6TGFiZWw3MTUwMjI3MA==",
    //         url: "https://api.github.com/repos/facebook/react/labels/Component:%20Build%20Infrastructure",
    //         name: "Component: Build Infrastructure",
    //         color: "f9d0c4",
    //         default: false
    //     }
    // ]// esta es la información inicial trabaja en conjunto con staleTime es decir esta es la información mas reciente y sera quitada en el sgte fetch
  })

  return {
    labelsQuery
  }
}
