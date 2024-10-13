import React from 'react';
import Joblists from './joblists';
import Detail from './jobdetail/index';

const Scan: React.FC = () => {

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formValues = Object.fromEntries((formData as any).entries() as Iterable<[string, FormDataEntryValue]>);
        console.log(formValues);
    };

    return (
        <div>
            <div className="pt-16"></div>
            <div className="flex justify-center">
                <div className="h-60 bg-gray-800 max-w-7xl min-w-sm w-full text-green-400 border-4 border-green-400">
                   <div>
                        Hello filter
                   </div>
                   <form onSubmit={handleSubmit}>
                       <input type="text" name="search wording" className="border-2 bg-slate-600 text-gray-200 text-xl border-green-400"/>
                       {/* <input type="text" name="search" className="border-2 border-green-400"/> */}
                       <button type="submit" className="border-2 border-green-400 p-1">Search</button>
                   </form>
                </div>
            </div>
            <div className="flex justify-center">
                <div id="content" className="min-h-full bg-slate-600 w-full max-w-7xl min-w-sm flex">
                    <Joblists/>
                    <Detail/>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="bg-green-300 w-full max-w-7xl min-w-sm h-20">
                    bottom
                </div>
            </div>
        </div>
    );
};

export default Scan;