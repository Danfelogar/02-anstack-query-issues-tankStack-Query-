import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { IssueComment } from '../components/IssueComment';
import { FiSkipBack } from 'react-icons/fi';
import { useIssue } from '../hooks';
import { LoadingSpinner } from '../../shared/components/LoadingSpinner';

export const IssueView = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { issueQuery, commentsQuery } = useIssue(Number(params.id) ?? 0);

  if(issueQuery.isLoading) {
    return <div>Cargando issue</div>
  }

  if(!issueQuery.data) {
    return <Navigate to="/404" />
  }

  return (
    <div className="mb-5">
      <div className="mb-4">
        <button
          onClick={() => navigate(-1)}
          className="hover:underline text-blue-400 flex items-center"
        >
          <FiSkipBack />
          Regresar
        </button>
      </div>

      {/* Primer comentario */}
      <IssueComment issue={issueQuery.data} />

      {/* Comentario de otros */}
      {
        commentsQuery.isLoading
        ? <LoadingSpinner />
        : ( commentsQuery?.data?.map((comment) =>( <IssueComment key={comment.id} issue={comment} /> )))
      }
      {/* <IssueComment body={comment2} />
      <IssueComment body={comment3} /> */}
    </div>
  );
};
