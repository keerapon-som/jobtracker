import React,{useEffect} from 'react';
import TableJobScrapelist from './Table';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentMenu } from '@/slices/menu';
import { RootState } from '@/store';

const JobScrapeList: React.FC = () => {

  const dispatch = useDispatch();
  const CurrentMenu = useSelector((state: RootState) => state.menu);

  useEffect(() => {
    if (CurrentMenu.currentmenu !== "JobScrapeList") {
      dispatch(setCurrentMenu("JobScrapeList"));
    }
  }, []);

  return (
    <div className="pt-16" style={{
      height: `calc(${100}vh)`, // Example calculation
    }}>
      <div className="">
    <div className="flex justify-center">
      <div className="h-16 bg-slate-800 border-blue-400 border text-blue-400 max-w-7xl min-w-sm w-full px-6 pt-3 text-3xl font-bold">
      Job JobScrapeList
      </div>
      </div>
      <div className="flex justify-center">
    <div id="content" className="bg-slate-600 w-full max-w-7xl min-w-sm p-2">
      <div >
        <TableJobScrapelist />
      </div>
      </div>
    </div>
    </div>
  </div>
  );
};

export default JobScrapeList;