import { useState } from 'react';
import { LoadingSpinner } from '../../shared/components/LoadingSpinner';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { useIssues } from '../hooks/useIssues';
import { State } from '../interfaces';

export const ListView = () => {

  const [state, setState] = useState<State>(State.All)
  const [selectedLabel, setSelectedLabel] = useState<string[]>([])

  const { issuesQuery, page, nextPage, prevPage } = useIssues({
    state,
    selectedLabel
  })

  const issues = issuesQuery.data ?? []

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
            <>
            <IssueList
              onStateChange={setState}
              state={state}
              // onStateChange={(state) => setState(state)}
              issues={issues} />

              <div className='flex justify-between items-center'>
                <button onClick={prevPage} className='p-2 bg-blue-500 rounded-md hover:bg-blue-700 transition-all'>anterior</button>
                <span>{page}</span>
                <button onClick={nextPage} className='p-2 bg-blue-500 rounded-md hover:bg-blue-700 transition-all'>siguiente</button>
              </div>
            </>
          )
        }
      </div>

      <div className="col-span-1 px-2">
        <LabelPicker onLabelSelected={onLabelSelected}  selectedLabel={selectedLabel}/>
      </div>
    </div>
  );
};
