
// import App from './App';
type PageSelectProps = {

  page: number;

  pagesize: number;

};

const PageSelect: React.FC<any> = ({handlenextpage,handleprevpage,page, pagesize,totals}) => {

    return (
      <>
            <div className="flex items-center justify-between p-3 bg-gray-800 sm:rounded-b-lg">
            <p className="block text-sm">
              Showing {1 + (page-1)*pagesize} - {page*pagesize < totals ? page*pagesize : totals} of {totals}
            </p>
            <div className="flex gap-1">
            <button
                disabled={page === 1}
                onClick={handleprevpage}
                className="rounded border border-slate-300 py-2.5 px-3 text-center text-xs font-semibold  transition-all hover:border-blue-300 focus:ring focus:ring-slate-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button">
                Previous
            </button>
            <button
                disabled={page*pagesize >= totals}
                onClick={handlenextpage}
                className="rounded border border-slate-300 py-2.5 px-3 text-center text-xs font-semibold  transition-all hover:border-blue-300 focus:ring focus:ring-slate-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button">
                Next
            </button>
            </div>
        </div>
      </>
    );
  };
  
  export default PageSelect
  