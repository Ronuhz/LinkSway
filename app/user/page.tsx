import { Link } from '@nextui-org/link'
import { Card, CardBody } from '@nextui-org/card'
import { Avatar } from '@nextui-org/avatar'
import { getCurrentUser } from '@/lib/session'
import AddLinkButton from '@/components/Buttons/Add-link'
import SignOut from '@/components/Buttons/Sign-Out'

const SOCIAL = [
	{ name: 'X', link: 'https://www.x.com' },
	{ name: 'YouTube', link: 'https://www.youtube.com' },
	{ name: 'Instagram', link: 'https://www.instagram.com' },
	{ name: 'Facebook', link: 'https://www.facebook.com' },
]
async function User() {
	const user = await getCurrentUser()

	return (
		<main className='h-screen flex flex-col gap-2 justify-start items-center p-5'>
			<Avatar
				name={user?.name ?? ''}
				src={user?.image ?? ''}
				className='w-20 h-20 text-large'
			/>
			<p className='text-xl'>{user?.name}</p>
			<SignOut />
			<AddLinkButton />
			{SOCIAL.map((social) => (
				<Link
					key={social.name}
					href={social.link ?? '#'}
					className='max-w-[400px] w-full'
				>
					<Card className='w-full'>
						<CardBody>
							<p className='text-center'>{social.name}</p>
						</CardBody>
					</Card>
				</Link>
			))}
		</main>
	)
}

export default User
