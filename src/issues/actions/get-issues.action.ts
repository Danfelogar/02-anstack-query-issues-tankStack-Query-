import { githubApi } from "../../api/github.api"
import { sleep } from "../../helpers"
import { GithubIssues } from "../interfaces"

export const getIssues = async():Promise<GithubIssues[]> => {
    await sleep(1200)

    const {data} = await githubApi.get<GithubIssues[]>('/issues')
    // console.log({data})
    return data
  }