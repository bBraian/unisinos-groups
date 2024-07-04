

import { Button } from "@/components/ui/button";
import { useNavigate  } from "react-router-dom"

export function InDevelopment() {
  const navigate = useNavigate();

  function handleNavigateHome() {
    navigate('/')
  }
  return (
    <div className="flex h-screen flex-col items-center justify-evenly">
      <h1 className="text-white text-4xl text-center">Página em desenvolvimento</h1>
      <p className="text-white text-center text-xl px-8">Oops! Essa página está em desenvolvimento, logo iremos disponibilizar este recurso para você 😉.</p>
      <Button className="w-[320px]" onClick={handleNavigateHome}>Voltar para Home</Button>
    </div>
  )
}