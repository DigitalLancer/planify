export default function Loading() {
  // Define the Loading UI here
      return (
        <div className="h-full grid grid-rows-[200px_1fr] gap-5">  
           <div className="bg-gray-300 rounded-2xl"></div>          
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 min-h-0">
                <div id="upcoming-events-list" className="bg-gray-300 h-full rounded-2xl min-h-0 p-4 shadow">
                    <h2 className='text-lg text-gray-900 font-semibold'></h2>                   
                </div>

                <div className="grid grid-cols-2 md:grid-cols-1 md:grid-rows-5 gap-5 h-full min-w-65">
                    <div className="grid grid-cols-2 gap-5 md:row-span-3">
                        <div className="bg-gray-300 rounded-2xl min-w-30">
                        </div>
                        <div className="bg-gray-300 rounded-2xl min-w-30">
                        </div>
                    </div>

                    <div className="bg-gray-300 shadow h-full rounded-2xl md:row-span-2 flex items-center justify-center p-2">
                        
                    </div>
                </div>
            </div>
        </div>
    )
}