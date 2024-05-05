import Navbar from '@/components/common/Navbar';
import React, { useState } from 'react';

export default function Dashboard() {
  const [flashCards, setFlashCards] = useState([]);

  const [file, setFile] = useState();

  const handleFormSubmit = (e) => {
    e.preventDefault();

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
          const newFlashCards = data?.quecards || [];
          setFlashCards(newFlashCards);

          // Save to localStorage
          localStorage.setItem('flashCards', JSON.stringify(newFlashCards));
        })
        .catch((err) => {
          console.error(err);
        });
      }
    });
  };

  const handleFileChange = (e) => {
    console.log("called");
    console.log(e);
    // Update the file state when the input value changes
    const selectedFile = e.target.files[0];
    setFile(selectedFile?.name);
  };

  console.log(file);

  return (

    <>

      <Navbar  />

      <div className='pt-16'>
      
      <p className="text-3xl mt-5 text-white inter text-center mb-3">Dashboard to upload audio files : </p>
      <form className='flex items-center justify-center flex-col' onSubmit={handleFormSubmit}>
        <input onChange={handleFileChange} className='pl-[200px] mb-8' name="lecture" accept=".mp3" type="file"></input>
        <p className='text-white lexend mb-8'>{file?.name}</p>
        <button className='bg-white rounded-md px-3 py-2' type="submit">Submit</button>
      </form> 


    </div>
    
    </>

    
  );
}
