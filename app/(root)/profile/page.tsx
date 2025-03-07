import { auth } from '@/auth'
import BookCard from '@/components/BookCard'
import { db } from '@/database/drizzle'
import { books, borrowRecords } from '@/database/schema'
import { desc, eq } from 'drizzle-orm'

const page = async () => {
	const session = await auth()

	const borrowedBooks = await db
		.select()
		.from(books)
		.leftJoin(
			borrowRecords,
			eq(books.id, borrowRecords.bookId)
		)
		.where(
			eq(borrowRecords.userId, session?.user?.id ?? '')
		)
		.orderBy(desc(borrowRecords.borrowDate))

	return (
		<>
			{/* <Profile /> */}
			<section>
				<h2 className="font-bebas-neue text-4xl text-light-100">
					Borrowed Books
				</h2>

				{
					<ul className="book-list">
						{borrowedBooks.map((book) => (
							<BookCard
								key={book.books.id}
								{...book.books}
							/>
						))}
					</ul>
				}
			</section>
		</>
	)
}

export default page
