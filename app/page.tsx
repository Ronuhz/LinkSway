import { AuthButton, SignedIn } from '@/components/Auth'
import { getDBUser } from '@/lib/databse'
import { Button } from '@nextui-org/button'
import Link from 'next/link'

export default async function Home() {
	const dbUser = await getDBUser()

	return (
		<main className='h-screen flex flex-col gap-2 justify-center items-center p-5'>
			<h1 className='text-5xl font-black'>LinkSway</h1>
			<AuthButton />
			<SignedIn>
				<Button variant='flat' as={Link} href={`/user?id=${dbUser?.id}`}>
					View my profile
				</Button>
				<Button variant='flat' as={Link} href={`/edit`}>
					Edit profile
				</Button>
			</SignedIn>
		</main>
	)
}
