//Implement dashboard page use localstorage to save flash cards

export default function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
      <form
        onSubmit={(e) => {
          fetch("/api/convert", {
            method: "POST",
            body: new FormData(e.currentTarget),
          })
            .then((res) => res.json())
            .then((data) => {
              if ("text" in data) {
                fetch("/api/genQuecard", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    value: data.text,
                  }),
                })
                  .then((res) => res.json())
                  .then((data) => {
                    console.log("data", data?.quecards);
                  })
                  .catch((err) => {
                    console.error(err);
                  });
              }
            });
          e.preventDefault();
        }}
      >
        <input name="lecture" accept=".mp3" type="file"></input>
        <button type="submit" className="bg-white">
          Submit
        </button>
      </form>
    </div>
  );
}
