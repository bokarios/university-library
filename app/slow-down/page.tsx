import Image from 'next/image'
import Link from 'next/link'

const page = () => {
	return (
		<main className="relative root-container flex flex-col h-screen max-h-screen justify-center items-center">
			<Image
				src="/images/break-sound.png"
				alt="break sound barrier"
				width={400}
				height={200}
				className="absolute top-20 object-contain"
			/>
			<h1 className="font-bebas-neue text-5xl font-bold text-light-100">
				Whoa! hold your horses dude!
			</h1>
			<p className="text-center text-light-400 max-w-xl mt-3">
				Looks like you're trying to break the sound barrier!
				Take a breather and try again in a bit.
			</p>
			<Link
				href="/"
				className="form-btn mt-6 text-light-100 hover:text-light-200"
			>
				I took a breather, let's try again
			</Link>
		</main>
	)
}

export default page
