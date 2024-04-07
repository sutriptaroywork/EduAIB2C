import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import { summaryData } from '../redux/slices/summarySlice';


const SummaryFullPdfViewComp = dynamic(() => import('../components/SummaryComps/SummaryFullPdfViewComp'), {
  ssr: false,
});

export default function Page() {

  const summData = useSelector(summaryData);
    
  return <SummaryFullPdfViewComp summData={summData}/>
}