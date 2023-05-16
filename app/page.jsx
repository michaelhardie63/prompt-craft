import Feed from '@components/Feed';

const Home = () => {
  	return (
		<section className="w-full flex-center flex-col">
			<h1 className="head_text text-center text-dark-blue">
				Inspire AI Brilliance.
				<br className="max-md:hidden" />
				<span className="blue_main_gradient text-center">Unlock the Power of Words.</span>
			</h1>

			<p className="desc text-center">
				Welcome to <strong><span className="logo-style">Prompt<span className="text-black">Craft</span></span></strong>, where human creativity meets AI's limitless potential. 
				Discover or create your own phrases to ignite inspiration and awaken AI brilliance.
			</p>

			<Feed />

		</section>
  	)
}

export default Home;
