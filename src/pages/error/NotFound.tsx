
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function NotFound() {
  const navigate = useNavigate();

  function handleNavigateHome() {
    navigate('/')
  }
  return (
    <div className="flex h-screen flex-col items-center justify-evenly">
      <h1 className="text-white text-center text-4xl">Página não encontrada</h1>
      <p className="text-white text-center text-xl px-8">Oops! 😖 Essa página não foi encontrada em nosso servidor.</p>
      <Button className="w-[320px]" onClick={handleNavigateHome}>Voltar para Home</Button>
    </div>
  )
}