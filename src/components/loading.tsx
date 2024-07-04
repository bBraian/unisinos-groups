
import logo from "../assets/uni.png"
import { SyncLoader } from 'react-spinners';


export function Loading() {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-muted flex flex-col justify-center items-center">
      <img className="w-[120px]" src={logo} alt="Logo Unisinos Groups" />
      <h2 className="text-white mb-14 mt-3 font-semibold text-4xl">Unisinos Groups</h2>
      <SyncLoader color="#FFF" speedMultiplier={0.6} />
    </div>
  );
};