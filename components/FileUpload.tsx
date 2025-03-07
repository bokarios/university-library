'use client'

import { toast } from '@/hooks/use-toast'
import config from '@/lib/config'
import { cn } from '@/lib/utils'
import {
	IKImage,
	ImageKitProvider,
	IKUpload,
	IKVideo,
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

interface Props {
	type: 'image' | 'video'
	accept: string
	placeholder: string
	folder: string
	variant: 'dark' | 'light'
	onFileChange: (filePath: string) => void
	value?: string
}

const FileUpload = ({
	type,
	accept,
	placeholder,
	folder,
	variant,
	onFileChange,
	value,
}: Props) => {
	const ikUploadRef = useRef(null)
	const [file, setFile] = useState<{
		filePath: string | null
	}>({ filePath: value || null })

	const [progress, setProgress] = useState(0)

	const styles = {
		button:
			variant === 'dark'
				? 'bg-dark-300'
				: 'bg-light-600 border border-gray-100',
		placeholder:
			variant === 'dark'
				? 'text-light-100'
				: 'text-slate-500',
		text:
			variant === 'dark'
				? 'text-light-100'
				: 'text-dark-400',
	}

	const onSuccess = (res: any) => {
		setFile(res)
		onFileChange(res.filePath)

		toast({
			title: `${type} uploaded successfully`,
			description: `${res.filePath} uploaded successfully`,
		})
	}

	const onError = (error: any) => {
		console.log('Failed to upload file:', error)

		toast({
			title: `${type} upload failed`,
			description: `Your ${type} could not be uploaded, please try again`,
			variant: 'destructive',
		})
	}

	const onValidate = (file: File) => {
		if (type === 'image') {
			if (file.size > 1024 * 1024 * 20) {
				toast({
					title: 'Image too large',
					description:
						'Please upload an image less than 20MB',
					variant: 'destructive',
				})

				return false
			}
		} else if (type === 'video') {
			if (file.size > 1024 * 1024 * 500) {
				toast({
					title: 'Video too large',
					description:
						'Please upload a video less than 500MB',
					variant: 'destructive',
				})

				return false
			}
		}

		return true
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
				useUniqueFileName={true}
				validateFile={onValidate}
				onUploadStart={() => setProgress(0)}
				onUploadProgress={({ loaded, total }) => {
					const percent = Math.round((loaded / total) * 100)
					setProgress(percent)
				}}
				folder={folder}
				accept={accept}
			/>

			<button
				className={cn('upload-btn', styles.button)}
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

				<p className={cn('text-base', styles.placeholder)}>
					{placeholder}
				</p>
			</button>

			{progress > 0 && progress !== 100 && (
				<div className="w-full rounded-full bg-green-200">
					<div
						className="progress"
						style={{ width: `${progress}%` }}
					>
						{progress}%
					</div>
				</div>
			)}

			{file &&
				file.filePath &&
				file.filePath.length > 0 &&
				(type === 'image' ? (
					<IKImage
						alt={file.filePath ?? 'image'}
						path={file.filePath}
						width={500}
						height={300}
					/>
				) : type === 'video' ? (
					<IKVideo
						path={file.filePath || ''}
						controls={true}
						className="w-full h-96 rounded-xl"
					/>
				) : null)}
		</ImageKitProvider>
	)
}

export default FileUpload
