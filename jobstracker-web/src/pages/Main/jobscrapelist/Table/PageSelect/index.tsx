
// import App from './App';
import Pagination from './pagination';
type PageSelectProps = {

  page: number;

  pagesize: number;

};

const PageSelect: React.FC<any> = ({handlenextpage,handleprevpage,handlegoto,page, pagesize,totals}) => {

    return (
      <>
            <div className="flex items-center justify-between p-3 bg-gray-800 sm:rounded-b-lg">
            <p className="block text-sm">
              Showing {1 + (page-1)*pagesize} - {page*pagesize < totals ? page*pagesize : totals} of {totals}
            </p>
            <Pagination page={page} pagesize={pagesize} totals={totals} handlenextpage={handlenextpage} handleprevpage={handleprevpage} handlegoto={handlegoto}/>
            <div>PageSize : {pagesize}</div>
        </div>
      </>
    );
  };
  
  export default PageSelect
  