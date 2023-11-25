import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'LinkSway',
	description: 'A place to share your social links.',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<Providers>
					{children} <ReactQueryDevtools initialIsOpen={false} />
				</Providers>
			</body>
		</html>
	)
}
