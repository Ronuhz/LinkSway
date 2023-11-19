import { Button } from '@nextui-org/button'
import { Link } from '@nextui-org/link'

const UserNotFound = () => {
	return (
		<main className='h-screen flex flex-col gap-2 justify-center items-center p-5'>
			<h1 className='text-3xl font-black tracking-widest'>User not found</h1>
			<p className='text-center text-gray-400 max-w-xl'>
				{
					"Oops! We couldn't find that user. Please double-check the link and id or try searching again. Thank you!"
				}
			</p>
			<Button variant='flat' as={Link} href={'/'}>
				Back to home
			</Button>
		</main>
	)
}

export default UserNotFound
