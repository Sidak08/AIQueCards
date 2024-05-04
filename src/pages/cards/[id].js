
import { useRouter } from 'next/router'

//TODO: use id to query from localstorage and get correct flashcard data

export default function Card() {
	const router = useRouter()
	console.log(router.query.id);
	return (
		<div>

			<p className='text-white'>Card: {router.query.id}</p>
			
			

		</div>
	)
}
