'use client'

import { IoIosMore } from 'react-icons/io'
import { PLATFORMS } from '@/utils/platforms'
import {
	Dropdown,
	DropdownTrigger,
	Button,
	DropdownMenu,
	DropdownItem,
} from '@nextui-org/react'
import { deleteLink } from '@/lib/actions'

function LinkMore({ linkId }: { linkId: string }) {
	return (
		<>
			<Dropdown>
				<DropdownTrigger>
					<Button isIconOnly size='sm' variant='light'>
						<IoIosMore />
					</Button>
				</DropdownTrigger>
				<DropdownMenu aria-label='Dynamic Actions' items={PLATFORMS}>
					<DropdownItem>Edit</DropdownItem>
					<DropdownItem
						color={'danger'}
						className={'text-danger'}
						onPress={() => deleteLink(linkId)}
					>
						Delete
					</DropdownItem>
				</DropdownMenu>
			</Dropdown>
		</>
	)
}

export default LinkMore
