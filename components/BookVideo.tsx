'use client'

import config from '@/lib/config'
import { IKVideo, ImageKitProvider } from 'imagekitio-next'

interface Props {
	videoUrl: string
}

const BookVideo = ({ videoUrl }: Props) => {
	return (
		<ImageKitProvider
			publicKey={config.env.imagekit.publicKey}
			urlEndpoint={config.env.imagekit.urlEndpoint}
		>
			<IKVideo
				path={videoUrl}
				autoPlay
				loop
				className="w-full rounded-xl"
			/>
		</ImageKitProvider>
	)
}

export default BookVideo
