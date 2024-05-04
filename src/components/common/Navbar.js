import { useRouter } from "next/router";


const Navbar = () => {

  const router = useRouter();

  return (
    <div className='h-[60px] fixed w-full z-[100000] flex items-center justify-between px-3 bg-black bottomShadow text-white'>

        <div className={"cursor-pointer akira transition-all duration-200 hover:text-[#28ff28] "}  onClick={() => { router.push("/") }} ><span className='text-white'>Name</span><span>yyyy</span></div>

      
    </div>
  )
}

export default Navbar;
