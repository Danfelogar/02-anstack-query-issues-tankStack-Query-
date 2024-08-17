import { FC } from "react";
import { LoadingSpinner } from "../../shared/components/LoadingSpinner";
import { useLabels } from "../hooks";

interface Props {
  selectedLabel: string[];

  onLabelSelected: (label: string) => void;
}

export const LabelPicker:FC<Props> = ({ onLabelSelected, selectedLabel }) => {

  const { labelsQuery } = useLabels()

  // const labelsQuery = useQuery({
  //   queryKey: ['labels'],
  //   queryFn: getLabels
  // })

  if ( labelsQuery.isLoading ) {
    return(
      <div className="flex justify-center items-center h-52">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {/* <span
        className="px-2 py-1 rounded-full text-xs font-semibold hover:bg-slate-800 cursor-pointer"
        style={{ border: `1px solid #ffccd3`, color: '#ffccd3' }}
      >
        Primary
      </span> */}
      {
        labelsQuery.data?.map(item => (
          <span
            key={item.id}

            onClick={() => onLabelSelected(item.name)}
            className={`animate-fadeIn px-2 py-1 rounded-full font-semibold hover:bg-slate-800 cursor-pointer ${selectedLabel.includes(item.name) && 'selected-label'}`}
            style={{ border: `1px solid #${item.color}`, color: `#${item.color}` }}>
            {item.name}
          </span>
        ))
      }
    </div>
  );
};
