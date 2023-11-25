'use client'

import { createLink } from '@/lib/actions'
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
import { ChangeEvent, useState } from 'react'

function AddLinkButton() {
	const { isOpen, onOpen, onOpenChange } = useDisclosure()
	const [linkDetails, setLinkDetails] = useState({
		platform: { key: '', label: '' },
		href: '',
	})

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value
		setLinkDetails((prev) => ({ ...prev, href: value }))
	}

	const handleAddLink = () => {
		if (linkDetails.href.length === 0) return
		createLink(linkDetails.href, linkDetails.platform.key)
	}

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
								setLinkDetails((prev) => ({ ...prev, platform: item }))
								onOpen()
							}}
							key={item.key}
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
									placeholder={`www.${linkDetails?.platform.label}.com`}
									value={linkDetails.href}
									onChange={(event) => handleInputChange(event)}
								/>
							</ModalBody>
							<ModalFooter>
								<Button color='danger' variant='flat' onPress={onClose}>
									Cancel
								</Button>
								<Button
									color='primary'
									onPress={onClose}
									onClick={handleAddLink}
								>
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
