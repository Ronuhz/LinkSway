import { prisma } from './prisma'
import { getCurrentUser } from './session'

export const getDBUser = async () => {
	const currentUser = await getCurrentUser()

	if (!currentUser) {
		console.log('No authenticated user')
		return undefined
	}

	const dbUser = await prisma.user.findFirst({
		where: { email: currentUser?.email },
	})

	return dbUser
}
