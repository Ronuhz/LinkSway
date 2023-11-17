'use client'

import { PLATFORMS } from '@/utils/platforms'
import {
	Dropdown,
	DropdownTrigger,
	Button,
	DropdownMenu,
	DropdownItem,
	useDisclosure,
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	Input,
	ModalFooter,
} from '@nextui-org/react'
import { useState } from 'react'

type linkPlatform = {
	key: string
	label: string
}

function AddLinkButton() {
	const { isOpen, onOpen, onOpenChange } = useDisclosure()
	const [newLinkPlatform, setNewLinkPlatform] = useState<linkPlatform>()

	return (
		<>
			<Dropdown>
				<DropdownTrigger>
					<Button isIconOnly variant='bordered'>
						+
					</Button>
				</DropdownTrigger>
				<DropdownMenu aria-label='Dynamic Actions' items={PLATFORMS}>
					{(item) => (
						<DropdownItem
							onPress={() => {
								setNewLinkPlatform(item)
								onOpen()
							}}
							key={item.key}
							color={item.key === 'delete' ? 'danger' : 'default'}
							className={item.key === 'delete' ? 'text-danger' : ''}
						>
							{item.label}
						</DropdownItem>
					)}
				</DropdownMenu>
			</Dropdown>

			{/* MODAL */}
			<Modal
				backdrop='blur'
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				placement='center'
			>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className='flex flex-col gap-1'>
								Add new link
							</ModalHeader>
							<ModalBody>
								<Input
									autoFocus
									variant='bordered'
									placeholder={`www.${newLinkPlatform?.label}.com`}
								/>
							</ModalBody>
							<ModalFooter>
								<Button color='danger' variant='flat' onPress={onClose}>
									Cancel
								</Button>
								<Button color='primary' onPress={onClose}>
									Add
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	)
}

export default AddLinkButton
