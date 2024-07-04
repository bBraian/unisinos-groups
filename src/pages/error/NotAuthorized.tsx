import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom";

export function NotAuthorized() {
  const navigate = useNavigate();

  function handleNavigateHome() {
    navigate('/')
  }

  return (
    <div className="flex h-screen flex-col items-center justify-evenly">
      <h1 className="text-white text-4xl text-center">Não autorizado</h1>
      <p className="text-white text-center text-xl px-8">Oops! 😖 Parece que você não tem acesso a esse recurso.</p>
      <Button className="w-[320px]" onClick={handleNavigateHome}>Voltar para Home</Button>
    </div>
  )
}