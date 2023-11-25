'use client'

import AddLinkButton from '@/components/Buttons/Add-link'
import { getUserLinks } from '@/lib/actions'
import {
	DndContext,
	closestCenter,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
	DragEndEvent,
} from '@dnd-kit/core'
import {
	restrictToVerticalAxis,
	restrictToWindowEdges,
} from '@dnd-kit/modifiers'
import {
	arrayMove,
	SortableContext,
	sortableKeyboardCoordinates,
	useSortable,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Button } from '@nextui-org/button'
import { CardBody, Card } from '@nextui-org/card'
import { Skeleton } from '@nextui-org/react'
import { Link } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

function Edit() {
	const [links, setItems] = useState<Link[]>([])

	const { data, isLoading } = useQuery({
		queryKey: ['links'],
		queryFn: () => getUserLinks(),
	})

	useEffect(() => {
		if (data) {
			setItems(data)
			console.log('list updated')
		}
	}, [data])

	return (
		<main className='h-screen p-4 flex flex-col items-center'>
			<div className='flex gap-4 justify-center items-center mb-5'>
				<h1 className='font-black text-3xl text-center'>Edit profile</h1>
				<AddLinkButton />
			</div>

			<div className='w-full max-w-[400px] flex flex-col gap-2'>
				{isLoading && (
					<>
						<Skeleton className='rounded-2xl'>
							<div className='h-12 rounded-lg bg-default-300'></div>
						</Skeleton>
						<Skeleton className='rounded-2xl'>
							<div className='h-12 rounded-lg bg-default-300'></div>
						</Skeleton>
					</>
				)}

				{links.map((link, index) => (
					<SortableLinkCard key={index} id={index} type={link.type} />
				))}
			</div>
		</main>
	)
}

function SortableLinkCard(props: { id: number; type: string }) {
	return (
		<div>
			<Card fullWidth>
				<CardBody>
					<p className='text-center'>{props.type}</p>
				</CardBody>
			</Card>
		</div>
	)
}
export default Edit
