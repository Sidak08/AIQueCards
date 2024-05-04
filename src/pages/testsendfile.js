

export default function TestSendFile() {	
	return (
		<form method="post" encType="multipart/form-data" action="/api/convert">
			<input name="lecture" accept=".mp3" type="file"></input>
			<button className="bg-white rounded-md p-2" type="submit">Submit</button>
		</form>	
	)	
}
