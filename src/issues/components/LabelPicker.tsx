import { LoadingSpinner } from "../../shared/components/LoadingSpinner";
import { useLabels } from "../hooks";

export const LabelPicker = () => {

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
            className="animate-fadeIn px-2 py-1 rounded-full font-semibold hover:bg-slate-800 cursor-pointer"
            style={{ border: `1px solid #${item.color}`, color: `#${item.color}` }}>
            {item.name}
          </span>
        ))
      }
    </div>
  );
};
