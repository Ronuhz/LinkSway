'use server'

import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/session'
import { revalidatePath } from 'next/cache'
import { getDBUser } from './databse'

export const createLink = async (href: string, type: string) => {
	const dbUser = await getDBUser()

	if (!dbUser) {
		console.log('Authenticated user not found in database')
		return
	}

	await prisma.link
		.create({ data: { href, type, userId: dbUser?.id } })
		.then(() => console.log('Link created'))
		.catch((error) =>
			console.log(`Error while adding link | actions.ts: ${error}`)
		)

	revalidatePath('/user')
}

export const deleteLink = async (linkId: string) => {
	const dbUser = await getDBUser()

	if (!dbUser) {
		console.log('Authenticated user not found in database')
		return
	}

	await prisma.link
		.delete({
			where: { id: linkId, userId: dbUser.id },
		})
		.then(() => console.log('Link deleted'))
		.catch((error) =>
			console.log(`Error while deleting link | actions.ts: ${error}`)
		)

	revalidatePath('/user')
}
