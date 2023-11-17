import { AuthLoading, SignedIn, SignedOut } from '@/components/Auth'
import SignIn from '@/components/Buttons/Sign-In'
import SignOut from '@/components/Buttons/Sign-Out'
import { Button } from '@nextui-org/button'
import { Spinner } from '@nextui-org/spinner'

export default function Home() {
	return (
		<main className='h-screen flex flex-col gap-2 justify-center items-center p-5'>
			<h1 className='text-5xl font-black tracking-widest'>LinkSway</h1>
			<SignedOut>
				<SignIn />
			</SignedOut>
			<SignedIn>
				<SignOut />
			</SignedIn>
			<AuthLoading>
				<Button disabled>
					<Spinner size='sm' />
				</Button>
			</AuthLoading>
		</main>
	)
}
