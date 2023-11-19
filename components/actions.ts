'use server'

import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/session'

export const createLink = async (href: string, type: string) => {
	const currentUser = await getCurrentUser()

	if (!currentUser) {
		console.log('No authenticated user | actions.ts')
		return
	}

	const dbUser = await prisma.user.findFirst({
		where: { email: currentUser?.email },
	})

	if (!dbUser) {
		console.log('Authenticated user not found in database | actions.ts')
		return
	}

	await prisma.link
		.create({ data: { href, type, userId: dbUser?.id } })
		.then(() => console.log('Link created'))
		.catch((error) =>
			console.log(`Error while adding link | actions.ts: ${error}`)
		)
}
