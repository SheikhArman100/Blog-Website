import BarChartSection from './BarChartSection.js'
import ExportBlogs from './ExportBlogs.js'
import PieChartSection from './PieChartSection.js'


const Dashboard = () => {
  return (
    <section className='w-full flex-1  flex  flex-col items-center py-4 px-8 lg:px-[2rem] xl:px-[4rem] gap-y-5'>
      <h1 className="text-3xl md:text-4xl font-bold text-center max-w-3xl">Dashboard</h1>
      <div className=' w-full flex items-center justify-end'>
        <ExportBlogs/>
      </div>
      <div className='flex-1 w-full mt-4 flex flex-col items-center lg:flex-row gap-4'>
        <div className='w-full flex flex-col gap-4'>
          <h4 className='text-2xl font-semibold'>Category wise BLogs</h4>
         <PieChartSection/> 
        </div>
        <div className='w-full flex flex-col gap-4'>
        <h4 className='text-2xl font-semibold'>Daily Personal Blog Like Count</h4>
         <BarChartSection/>

        </div>
        
      </div>

    </section>
  )
}

export default Dashboard