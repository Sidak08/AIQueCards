import { useRouter } from "next/router";


const Navbar = () => {

  const router = useRouter();

  return (
    <div className='h-[60px] fixed w-full z-[100000] flex items-center justify-between px-3 bg-black bottomShadow text-white'>

        <div className={"cursor-pointer akira transition-all duration-200 hover:text-[#28ff28] "}  onClick={() => { router.push("/") }} ><span className='text-white'>Sound</span><span>Card</span><span> AI</span></div>

        <div className="flex  gap-x-4">
          <div className="bg-white rounded-md px-2 py-1 text-black cursor-pointer lexend" onClick={() => { router.push("/dashboard") }}>Dashboard</div>
          <div className="bg-white rounded-md px-2 py-1 text-black cursor-pointer lexend" onClick={() => { router.push("/cards/xxx") }}>FlashCards</div>
        </div>

    </div>
  )
}

export default Navbar;
