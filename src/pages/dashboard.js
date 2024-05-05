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
    
    <Navbar className={" -pb-16"}/>
<GridBackgroundDemo />

<div className='pt-16 h-[90vh] flex items-center justify-center'>



    <div className='flex items-center justify-center'>

      
      

      <div className='dbForm  mx-auto flex items-center justify-center p-8 rounded-md flex-col'>
      
      
      <p className="text-3xl capitalize  text-white inter text-center ">Dashboard to upload audio files </p>
      <form className='flex gap-x-3 pt-10 items-center justify-center flex-col' onSubmit={handleFormSubmit}>
        <input onChange={handleFileChange} className=' mb-8' title='' name="lecture" accept=".mp3" type="file"></input>
        <p className='text-white lexend mb-8'>{file ? file : "No file selected"}</p>
        <button className='bg-white rounded-md px-3 py-2' type="submit">Submit</button>
      </form> 
      


    </div>

    </div>


</div>

    </>

    


    
  );
}
