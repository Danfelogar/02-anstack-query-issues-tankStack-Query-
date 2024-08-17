import { useState } from 'react';
import { LoadingSpinner } from '../../shared/components/LoadingSpinner';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { State } from '../interfaces';
import { useIssuesInfinite } from '../hooks';

export const ListViewInfinite = () => {

  const [state, setState] = useState<State>(State.All)
  const [selectedLabel, setSelectedLabel] = useState<string[]>([])

  const { issuesQuery } = useIssuesInfinite({
    state,
    selectedLabel
  })

  const issues = issuesQuery.data?.pages.flat() ?? []

  const onLabelSelected = (label: string) => {
    if(selectedLabel.includes(label)){
      setSelectedLabel(selectedLabel.filter(l => l !== label))
    } else {
      setSelectedLabel([...selectedLabel, label])
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 mt-5">
      <div className="col-span-1 sm:col-span-2">
        {
          issuesQuery.isLoading
          ?( <LoadingSpinner />)
          :(
            <div className='flex flex-col justify-center'>
              <IssueList
                onStateChange={setState}
                state={state}
                // onStateChange={(state) => setState(state)}
                issues={issues} />

              <button disabled={issuesQuery.isFetchingNextPage} onClick={()=> issuesQuery.fetchNextPage()} className='p-2 bg-blue-500 rounded-md hover:bg-blue-700 transition-all'>
                {
                  issuesQuery.isFetchingNextPage
                  ? 'Cargando...'
                  : 'Cargar más'
                }
              </button>
            </div>
          )
        }
      </div>

      <div className="col-span-1 px-2">
        <LabelPicker onLabelSelected={onLabelSelected}  selectedLabel={selectedLabel}/>
      </div>
    </div>
  );
};
