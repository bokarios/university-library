'use client'

import { toast } from '@/hooks/use-toast'
import config from '@/lib/config'
import {
	IKImage,
	ImageKitProvider,
	IKUpload,
} from 'imagekitio-next'
import Image from 'next/image'
import { useRef, useState } from 'react'

const {
	env: {
		imagekit: { urlEndpoint, publicKey },
	},
} = config

const authenticator = async () => {
	try {
		const res = await fetch(
			`${config.env.apiEndpoint}/api/auth/imagekit`
		)

		if (!res.ok) {
			const errorText = await res.text()
			throw new Error(
				`Request failed with status ${res.status}: ${errorText}`
			)
		}

		const data = await res.json()
		const { signature, expire, token } = data

		return { signature, expire, token }
	} catch (error: any) {
		console.log(
			`Authentication request failed: ${error.message}`
		)
		throw new Error('Failed to authenticate with ImageKit')
	}
}

const ImageUpload = ({
	onFileChange,
}: {
	onFileChange: (filePath: string) => void
}) => {
	const ikUploadRef = useRef(null)
	const [file, setFile] = useState<{
		filePath: string
	} | null>(null)

	const onSuccess = (res: any) => {
		setFile(res)
		onFileChange(res.filePath)

		toast({
			title: 'Image uploaded successfully',
			description: `${res.filePath} uploaded successfully`,
		})
	}

	const onError = (error: any) => {
		console.log('Failed to upload file:', error)

		toast({
			title: 'Image upload failed',
			description: 'Your image could not be uploaded',
			variant: 'destructive',
		})
	}

	return (
		<ImageKitProvider
			publicKey={publicKey}
			urlEndpoint={urlEndpoint}
			authenticator={authenticator}
		>
			<IKUpload
				className="hidden"
				ref={ikUploadRef}
				onSuccess={onSuccess}
				onError={onError}
				fileName="test-upload.png"
			/>

			<button
				className="upload-btn bg-dark-300"
				onClick={(e) => {
					e.preventDefault()

					if (ikUploadRef.current) {
						// @ts-ignore
						ikUploadRef.current?.click()
					}
				}}
			>
				<Image
					src="/icons/upload.svg"
					alt="upload"
					width={20}
					height={20}
					className="object-contain"
				/>

				<p className="text-base text-light-100">
					Upload a file
				</p>
			</button>

			{file && (
				<IKImage
					alt={file.filePath}
					path={file.filePath}
					width={500}
					height={300}
				/>
			)}
		</ImageKitProvider>
	)
}

export default ImageUpload
