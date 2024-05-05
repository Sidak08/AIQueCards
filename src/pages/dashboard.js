import Navbar from '@/components/common/Navbar';
import { GridBackgroundDemo } from '@/components/ui/GridBackgroundDemo';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const router = useRouter();
  const [flashCards, setFlashCards] = useState([]);

  const [file, setFile] = useState();

  const handleFormSubmit = (e) => {
    e.preventDefault();

    console.log("converting ...");

    var toastId = toast.loading("converting ...");

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
          toast.success("Conversion done !!");
          console.log("Conversion done !!");
          router.push('/cards/xxx');

          
        })
        .catch((err) => {
          console.error(err);
        });
      }
    });


    toast.dismiss(toastId);

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
      <GridBackgroundDemo />

      <div className='pt-16 flex items-center justify-center h-[80vh] flex-col'>
      
      <p className="text-3xl mt-5 text-white inter text-center mb-8">Dashboard to upload audio files </p>
      <form className='flex gap-x-3 items-center justify-center flex-col' onSubmit={handleFormSubmit}>
        <input onChange={handleFileChange} className='pl-[200px] mb-8' name="lecture" accept=".mp3" type="file"></input>
        <p className='text-white lexend mb-8'>{file}</p>
        <button className='bg-white rounded-md px-3 py-2' type="submit">Submit</button>
      </form> 


    </div>
    
    </>

    
  );
}
