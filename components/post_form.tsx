"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { addPostAction } from "@/actions/form"
import { Toaster } from "sonner"
import { toast } from "sonner"
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(0, {
    message: "名前は0文字以上。",
  }).max(100,{message:"名前は100文字以内"}),
  content: z.string().min(2, {
    message: "本文は2文字以上。",
  }).max(1000,{message:"本文は1000文字以内"}),
  thread_id: z.string().min(2).max(30),
})

export function PostForm(props:{thread_id:string}) {
  const router = useRouter()

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name:"",
      content: "",
      thread_id:props.thread_id
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    addPostAction(values.name,values.content,values.thread_id);
    toast("投稿しました。");
    router.push("/");
    console.log(values);
  }

  return (
    <div style={{"width":"75%"}}>
    <h1 style={{fontSize:"30px"}}><b>投稿フォーム</b></h1>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <div style={{height:"45px"}}>  
            <FormItem>
              <FormLabel><b>名前（空欄可）</b></FormLabel>
              <FormControl>
                <Input type="text" placeholder="0文字以上100文字以内で投稿" {...field}/>
              </FormControl>
              <FormMessage />
            </FormItem>            
            </div>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <div style={{height:"150px"}}>
              <FormItem>
              <FormLabel><b>本文</b></FormLabel>
              <FormControl>
                <Textarea style={{height:"170px"}} placeholder="2文字以上1000文字以内で投稿" {...field}/>
              </FormControl>
              <FormMessage />
            </FormItem>
            </div>
          )}
        />

        <FormField
          control={form.control}
          name="thread_id"
          render={({ field }) => (
            <div>  
            <FormItem>
              <FormControl>
                <Input type="hidden" {...field}/>
              </FormControl>
              <FormMessage />
            </FormItem>            
            </div>
          )}
        />
        <Button type="submit" className="SubmitButton"
          variant="secondary" style={{width:"100%"}}>
            <b style={{fontSize:"15px"}}>投稿</b></Button>
        <Toaster />
      </form>
    </Form>
    </div>
  )
}
