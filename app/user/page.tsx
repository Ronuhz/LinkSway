import { Card, CardBody } from '@nextui-org/card'
import { Avatar } from '@nextui-org/avatar'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { Link } from '@nextui-org/link'
import { ExternalLink } from 'lucide-react'

type props = {
	searchParams: {
		id: string
	}
}

async function User({ searchParams }: props) {
	const { id } = searchParams

	if (!id) redirect('/user-not-found')

	const dbUser = await prisma.user
		.findFirst({
			where: { id },
			include: { link: true },
		})
		.catch(() => {
			console.log('dbUser is not found | /user/page.ts')
			redirect('/user-not-found')
		})

	return (
		<main className='h-screen flex flex-col gap-2 justify-start items-center p-5'>
			<Avatar
				className='w-20 h-20 text-large'
				name={dbUser?.name ?? ''}
				src={dbUser?.image ?? ''}
			/>
			<p className='text-xl'>{dbUser?.name}</p>

			<div className='max-w-[400px] w-full flex flex-col gap-2'>
				{dbUser?.link.map((link) => (
					<Card
						key={link.type}
						as={Link}
						href={link.href ?? '#'}
						target='_blank'
						fullWidth
					>
						<CardBody>
							<p className='text-center'>{link.type}</p>
							<ExternalLink
								className='absolute right-7 transform translate-x-1/2 bottom-3'
								size={20}
								strokeWidth={1.2}
							/>
						</CardBody>
					</Card>
				))}
			</div>
		</main>
	)
}

export default User
