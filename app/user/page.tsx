import { Link } from '@nextui-org/link'
import { Card, CardBody } from '@nextui-org/card'
import { Avatar } from '@nextui-org/avatar'
import { getCurrentUser } from '@/lib/session'
import AddLinkButton from '@/components/Buttons/Add-link'
import SignOut from '@/components/Buttons/Sign-Out'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'

type props = {
	searchParams: {
		id: string
	}
}

async function User({ searchParams }: props) {
	let ownLinks = false
	let dbUser

	const currentUser = await getCurrentUser()

	if (currentUser && !searchParams.id) {
		// the logged in user owns the open profile

		ownLinks = true
		try {
			dbUser = await prisma.user.findFirst({
				where: { email: currentUser.email },
			})
		} catch (error) {
			console.log('User not found in database | user/page.ts')
		}
	} else if (searchParams.id) {
		// viewing a profile NON edit mode

		try {
			dbUser = await prisma.user.findFirst({
				where: { id: searchParams.id },
			})
		} catch (error) {
			console.log('User not found in database | user/page.ts')
		}
	}

	if (!dbUser) redirect('/user-not-found')

	const links = await prisma.link.findMany({ where: { userId: dbUser?.id } })

	return (
		<main className='h-screen flex flex-col gap-2 justify-start items-center p-5'>
			<Avatar
				name={dbUser?.name ?? ''}
				src={dbUser?.image ?? ''}
				className='w-20 h-20 text-large'
			/>
			<p className='text-xl'>{dbUser?.name}</p>

			<div className='max-w-[400px] w-full flex flex-col gap-2'>
				{links.map((link) => (
					<Link key={link.type} href={link.href ?? '#'} target='_blank'>
						<Card className='w-full'>
							<CardBody>
								<p className='text-center'>{link.type}</p>
							</CardBody>
						</Card>
					</Link>
				))}
			</div>

			{ownLinks && (
				<div className='absolute bottom-10 border-stone-800 border-1 backdrop-blur-sm px-6 py-4 rounded-2xl flex gap-4'>
					<AddLinkButton />
					<SignOut />
				</div>
			)}
		</main>
	)
}

export default User
