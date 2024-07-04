import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { api } from '@/api/axios'
import { useContext } from 'react'
import { AuthContext } from '@/context/AuthContext'
import { useNavigate } from 'react-router-dom'

const signInForm = z.object({
  email: z.string().email(),
  password: z.string().min(4),
})

type SignInForm = z.infer<typeof signInForm>

export function SignIn() {
  const { signIn } = useContext(AuthContext)
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInForm)
  })

  async function handleSignIn(data: SignInForm) {
    const toastId = toast.loading('Fazendo Login')
    const { email, password } = data
    api.post('auth/session', { email: email, password: password })
    .then((res) => {
      console.log(res)
      if(res.status === 201) {
        signIn(res.data.access_token)
        .then(() => {
          toast.success('Logado com sucesso')
          navigate('/admin')
        })
        .catch((e: any) => {
          console.log(e)
          toast.error('Erro ao fazer login')
        })
      } else {
        toast.error('Credenciais inválidas')
      }
      toast.dismiss(toastId)
    })
    .catch((err) => {
      if(err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error('Credenciais inválidas')
      }
      console.log(err)
      toast.dismiss(toastId)
    })
  }

    
  

  return (
    <>
      <Helmet title="Login" />
      <div className="p-4">
        <div className="flex w-full flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Fazer login
            </h1>
            <p className="text-sm text-muted-foreground">
              Login para administradores do sistema
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(handleSignIn)}>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" {...register('email')} />
              {errors.email && (
                <p className="text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Senha</Label>
              <Input id="password" type="password" {...register('password')} />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button className="w-full" type="submit" disabled={isSubmitting}>
              Logar
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
