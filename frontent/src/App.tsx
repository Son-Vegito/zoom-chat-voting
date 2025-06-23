import React, { useRef, useState } from "react"

function App() {


  return (
    <div className="h-screen w-screen bg-black flex justify-center items-center">
      <div className="h-[450px] w-[750px] bg-gray-900 rounded-md
      p-4 flex items-center justify-center">
        <JoinComp/>
      </div>
    </div>
  )
}

function JoinComp() {

  const nameRef = useRef<HTMLInputElement | null>(null),
    roomIdRef = useRef<HTMLInputElement | null>(null);

  const [invalid, setInvalid] = useState(false);

  function onClickHandler() {
    const name = nameRef.current?.value,
      roomId = roomIdRef.current?.value;

    if (!name || !roomId || name.length == 0 || roomId.length == 0) {
      setInvalid(true);
    }

  }

  return (
    <div className="border border-white h-full w-[260px] rounded-md flex flex-col justify-center items-center gap-3">
      <div>
        <h2 className="text-3xl text-white font-bold pb-5">
          Join Room
        </h2>
      </div>
      <LabelInput label="Name" ref={nameRef} />
      <LabelInput label="Room ID" ref={roomIdRef} />

      <button onClick={onClickHandler} className="bg-blue-500 py-1 px-3 rounded-md text-white font-semibold cursor-pointer mt-4">
        Join
      </button>


      {invalid ?
        <p className="text-red-500 text-sm">
          *All fields required
        </p>
        : <p className="select-none text-transparent">.</p>}


    </div>
  )

}

function LabelInput({ label, ref }: { label: string, ref: React.RefObject<HTMLInputElement | null> }) {

  return (
    <div>
      <h3 className="font-bold text-white">{label}</h3>
      <input type="text" className="bg-white p-1 rounded-md" ref={ref} />
    </div>
  )

}

export default App
