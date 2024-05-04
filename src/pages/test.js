import { useEffect, useState, useRef } from "react"

export default function Test() {
	const [data, setData] = useState([])	
	const fetchedRef = useRef(false)

	console.log(data)

	useEffect(() => {
		if (fetchedRef.current) {
			return	
		}
		
		fetchedRef.current = true

		fetch("/api/genQuecard", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				value: "linear algebra"
			}) 
		}).then(res => res.json()).then(newdata => setData((data) => ([...data, ...newdata.quecards])))
	}, [])

	return (
		<div className="text-white">{data.map(({question, answer}) => <span key={answer}>{question}: {answer}</span>)}</div>
	)
}
