import { githubApi } from "../../api/github.api"
import { sleep } from "../../helpers"
import { GithubIssues } from "../interfaces"

export const getIssueComments = async(issueNumber: number):Promise<GithubIssues[]> => {
    await sleep(1200)

    const {data} = await githubApi.get<GithubIssues[]>(`/issues/${issueNumber}/comments`)
    // console.log({data})
    return data
  }