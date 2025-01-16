import config from '@/lib/config'
import ImageKit from 'imagekit'
import { NextResponse } from 'next/server'

const {
	env: {
		imagekit: { urlEndpoint, publicKey, privateKey },
	},
} = config

const imageKit = new ImageKit({
	urlEndpoint,
	publicKey,
	privateKey,
})

export async function GET() {
	return NextResponse.json(
		imageKit.getAuthenticationParameters()
	)
}
