'use client'

import { Button, ButtonProps } from '@nextui-org/react'
import { signIn } from 'next-auth/react'
import { FcGoogle } from 'react-icons/fc'

function SignIn(props: ButtonProps) {
	return (
		<Button
			{...props}
			startContent={<FcGoogle className='w-full h-[70%]' />}
			onClick={() => signIn('google', { callbackUrl: '/user' })}
		>
			Sign in with Google
		</Button>
	)
}

export default SignIn
