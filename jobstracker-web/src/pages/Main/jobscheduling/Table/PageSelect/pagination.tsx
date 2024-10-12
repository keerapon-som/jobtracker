

const Pagination: React.FC<any> = ({page, pagesize,totals,handlenextpage,handleprevpage,handlegoto}) => {

    const totalPages = Math.ceil(totals / pagesize);

    const handlePageClick = (page: number) => {
        handlegoto(page);
    };

    const renderPageLinks = () => {
        const pageLinks = [];
        const maxButtons = 6;
        let startPage = Math.max(1, page - Math.floor(maxButtons / 2));
        let endPage = Math.min(totalPages, startPage + maxButtons - 1);

        if (endPage - startPage < maxButtons - 1) {
            startPage = Math.max(1, endPage - maxButtons + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pageLinks.push(
                <a
                    key={i}
                    href="#"
                    onClick={() => handlePageClick(i)}
                    className={`flex items-center justify-center px-4 h-10 leading-tight ${page === i ? 'text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white' : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'}`}
                >
                    {i}
                </a>
            );
        }
        return pageLinks;
    };

    return (
        <>
        <div className="flex">
            
            <button
                disabled={page === 1}
                onClick={handleprevpage}
                className="rounded border border-slate-300 py-2.5 px-3 text-center text-xs font-semibold  transition-all hover:border-blue-300 focus:ring focus:ring-slate-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button">
                Previous
            </button>
            {renderPageLinks()}
            <button
                disabled={page*pagesize >= totals}
                onClick={handlenextpage}
                className="rounded border border-slate-300 py-2.5 px-3 text-center text-xs font-semibold  transition-all hover:border-blue-300 focus:ring focus:ring-slate-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button">
                Next
            </button>
            </div>
        </>
    )
};

export default Pagination