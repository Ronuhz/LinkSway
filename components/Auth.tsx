'use client'

import { Button, ButtonProps, Spinner } from '@nextui-org/react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { FcGoogle } from 'react-icons/fc'

type Props = { children: React.ReactNode }

export const SignedIn = ({ children }: Props) => {
	const { status } = useSession()
	if (status === 'authenticated') return <>{children}</>
	else return <></>
}

export const SignedOut = ({ children }: Props) => {
	const { status } = useSession()
	if (status === 'unauthenticated') return <>{children}</>
	else return <></>
}

export const AuthLoading = ({ children }: Props) => {
	const { status } = useSession()
	if (status === 'loading') return <>{children}</>
	else return <></>
}

export const AuthButton = (props: ButtonProps) => {
	const { status } = useSession()

	switch (status) {
		case 'unauthenticated':
			return (
				<Button
					{...props}
					startContent={<FcGoogle className='w-full h-[70%]' />}
					onClick={() => signIn('google', { callbackUrl: '/edit' })}
				>
					Sign in with Google
				</Button>
			)
		case 'authenticated':
			return (
				<Button {...props} onClick={() => signOut({ callbackUrl: '/' })}>
					Sign Out
				</Button>
			)
		default:
			return (
				<Button disabled>
					<Spinner size='sm' />
				</Button>
			)
	}
}
