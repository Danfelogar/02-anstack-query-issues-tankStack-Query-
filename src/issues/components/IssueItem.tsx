import { FiInfo, FiMessageSquare, FiCheckCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { GithubIssues, State } from '../interfaces';
import { FC } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { getIssue, getIssueComments } from '../actions';

const timeSinceCreation = (creationTime: string): string => {
  const createdAt = new Date(creationTime);
  const now = new Date();

  const diffInSeconds = Math.floor((now.getTime() - createdAt.getTime()) / 1000);

  const seconds = diffInSeconds % 60;
  const minutes = Math.floor((diffInSeconds / 60) % 60);
  const hours = Math.floor((diffInSeconds / 3600) % 24);
  const days = Math.floor(diffInSeconds / (3600 * 24));

  if (days > 0) {
      return `${days} days ago`;
  } else if (hours > 0) {
      return `${hours} hours ago`;
  } else if (minutes > 0) {
      return `${minutes} minutes ago`;
  } else {
      return `${seconds} seconds ago`;
  }
}


interface Props {
  issue: GithubIssues;
}

export const IssueItem:FC<Props> = ({issue}) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Prefetch data: set data in cache
  const prefetchData = () => {
    queryClient.prefetchQuery({
      queryKey: ['issues', issue.number],
      queryFn: ()=> getIssue(issue.number),
      staleTime: 1000 * 60,
    })

    queryClient.prefetchQuery({
      queryKey: ['issues', issue.number, 'comments'],
      queryFn: ()=> getIssueComments(issue.number),
      staleTime: 1000 * 60,
    })
  }

  // Preset data: set data in cache
  const presetData = () => {
    queryClient.setQueryData(['issues', issue.number], issue, {
      updatedAt: Date.now() + (1000 * 60),
    });
  }

  return (
    <div onMouseEnter={()=>presetData()} className="animate-fadeIn flex items-center px-2 py-3 mb-5 border rounded-md bg-slate-900 hover:bg-slate-800">
      {
        issue.state === State.Close
        ? <FiInfo size={30} color="red" className="min-w-10" />
        : <FiCheckCircle size={30} color="green" />
      }

      <div className="flex flex-col flex-grow px-2">
        <a
          onClick={() => navigate(`/issues/issue/${issue.number}`)}
          className="hover:underline"
        >
          {issue.title}
        </a>
        <span className="text-gray-500">
          #{issue.number} {timeSinceCreation(issue.created_at)}{' '}
          <span className="font-bold">{issue.user.login}</span>
        </span>
      </div>

      <img
        src={issue.user.avatar_url}
        alt="User Avatar"
        className="w-8 h-8 rounded-full"
      />
      <div className="flex flex-col mx-2 items-center">
        <FiMessageSquare size={30} className="min-w-5" color="gray" />
        <span className="px-4 text-gray-400">{issue.comments}</span>
      </div>
    </div>
  );
};
