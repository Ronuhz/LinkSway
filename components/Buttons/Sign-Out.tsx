'use client'

import { Button, ButtonProps } from '@nextui-org/react'
import { signOut } from 'next-auth/react'

function SignOut(props: ButtonProps) {
	return (
		<Button {...props} onClick={() => signOut({ callbackUrl: '/' })}>
			Sign Out
		</Button>
	)
}

export default SignOut
