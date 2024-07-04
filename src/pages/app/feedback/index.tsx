import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router-dom"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from "@/components/ui/textarea"
import { api } from "@/api/axios";

const feedbackInForm = z.object({
  user_name: z.string().min(3),
  feedback: z.string().min(1),
})

type FeedbackInForm = z.infer<typeof feedbackInForm>

export function Feedback() {

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FeedbackInForm>({
    resolver: zodResolver(feedbackInForm)
  })

  function handleSendFeedback(data: FeedbackInForm) {
    const toastId = toast.loading('Enviando feedback')
    const {user_name, feedback} = data
    api.post(`feedback`, { 
        user_name: user_name,
        feedback: feedback
     })
    .then((response) => {
        console.log(response)
        toast.success('Feedback enviado')
        toast.dismiss(toastId)
        navigate("/");
    }).catch((e) => {
        if(e.response?.data?.message) {
            toast.error(e.response.data.message);
        } else {
            toast.error('Erro ao enviar feedback');
        }
        console.log(e)
        toast.dismiss(toastId)
    })
}

  return(
    <>
      <Helmet title="Feedback"/>
        <div className="flex flex-col flex-1 items-center justify-center min-h-screen">
          <div className=" flex flex-col p-5 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Feedback
              </h1>
              <p className="text-sm text-muted-foreground">
                Deixe um feedback e nos ajude a melhorar!
              </p>
          </div>
          <form className="space-y-4 w-96 px-5" onSubmit={handleSubmit(handleSendFeedback)}>
            <div className="space-y-2">
              <Label htmlFor="user_name">Nome</Label>
              <Input id="user_name" type="user_name" {...register('user_name')} />
              {errors.user_name && (
                <p className="text-sm text-red-500">
                  {errors.user_name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="feedback">Feedback</Label>
              <Textarea className="h-40" placeholder="Faça seu feedback aqui..." id="feedback" {...register('feedback')} />
              {errors.feedback && (
                <p className="text-sm text-red-500">
                  {errors.feedback.message}
                </p>
              )}
            </div>

            <Button className="w-full" type="submit"  disabled={isSubmitting}>
              Enviar Feedback
            </Button>
          </form>
        </div>
    </>
    
  )
}