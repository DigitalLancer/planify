import DashboardEventList from '@/components/dashboard/DashboardEventList'
import DashboardHero from '../components/dashboard/DahsboardHero'
import DashboardWeatherForecast from '@/components/dashboard/DashboardWeatherForecast'
import DashboardCalendar from '@/components/dashboard/DashboardCalendar'
import DashboardWeeklyOverview from '@/components/dashboard/DashboardWeeklyOverview'


async function Dashboard() {

    return (
        <div className="h-full grid grid-rows-[200px_1fr] gap-5 text-slate-900">
            <DashboardHero></DashboardHero>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 min-h-0">
                <div id="upcoming-events-list" className="bg-white h-full rounded-2xl min-h-0 p-4 shadow overflow-auto ring-1 ring-slate-200">
                    <h2 className='text-lg mb-5 font-semibold'>Upcoming Events</h2>
                    <DashboardEventList></DashboardEventList>
                </div>

                {/* RIGHT — korunur */}
                <div className="grid grid-cols-2 md:grid-cols-1 md:grid-rows-5 gap-5 h-full min-w-65">
                    <div className="grid grid-cols-2 gap-5 md:row-span-3">
                        <div className="bg-white shadow rounded-2xl min-w-30 ring-1 ring-slate-200">
                            
                        </div>
                        <div className="bg-white shadow rounded-2xl min-w-30 p-4 ring-1 ring-slate-200">
                            <div className='w-full h-full flex justify-center items-center'>
                                <DashboardCalendar />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white shadow h-full rounded-2xl md:row-span-2 p-2 overflow-hidden ring-1 ring-slate-200">
                        <DashboardWeeklyOverview/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard