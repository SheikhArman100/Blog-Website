import TrendingBlogs from "@/components/TrendingBlogs.js";



export default function Home() {

  return (
    <main className="w-full flex-1  flex  flex-col items-center py-4 px-8 lg:px-[2rem] xl:px-[4rem] gap-y-4">
      <h1 className="text-3xl md:text-4xl font-bold text-center max-w-3xl">Unveiling the World: Explore, Discover, Connect with Our Blog Hub!</h1>
      <p className="text-base text-center max-w-5xl ">Dive into a universe of captivating stories, insightful articles, and vibrant discussions. Our blog platform is your gateway to endless inspiration, knowledge, and community engagement. Start your journey today and unleash the power of ideas!</p>
      <section className="w-full flex-1 flex flex-col">
      

        <TrendingBlogs/>
      </section>
      
    </main>
  );
}
