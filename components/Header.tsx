import { getInitials } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Avatar, AvatarFallback } from './ui/avatar'
import { Session } from 'next-auth'
import { signOut } from '@/auth'
import { Button } from './ui/button'

const Header = ({ session }: { session: Session }) => {
	return (
		<header className="my-10 flex justify-between gap-5">
			<Link href="/">
				<Image
					src="/icons/logo.svg"
					alt="logo"
					width={40}
					height={40}
				/>
			</Link>
			<ul className="flex flex-row items-center gap-8">
				<li>
					<Link
						href="/library"
						className="text-base cursor-pointer capitalize text-light-100"
					>
						Library
					</Link>
				</li>

				<li>
					<Link href="/profile">
						<Avatar>
							<AvatarFallback className="bg-slate-100 font-semibold">
								{getInitials(
									session?.user?.name || 'John Doe'
								)}
							</AvatarFallback>
						</Avatar>
					</Link>
				</li>
				<form
					action={async () => {
						'use server'

						await signOut()
					}}
				>
					<Button>Logout</Button>
				</form>
			</ul>
		</header>
	)
}

export default Header
