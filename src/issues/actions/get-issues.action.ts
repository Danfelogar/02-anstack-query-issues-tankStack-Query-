import { githubApi } from "../../api/github.api"
import { sleep } from "../../helpers"
import { GithubIssues, State } from "../interfaces"

export const getIssues = async(state: State, selectedLabel: string[], page: number):Promise<GithubIssues[]> => {
    await sleep(1200)

    const params = new URLSearchParams()

    if(state !== State.All){
      params.append('state', state)
    }

    if(selectedLabel.length > 0){
      params.append('labels', selectedLabel.join(','))
    }

    params.append('page', `${page}`)

    params.append('per_page', '5')

    const {data} = await githubApi.get<GithubIssues[]>('/issues',{
      params,
    })
    // console.log({data})
    return data
  }