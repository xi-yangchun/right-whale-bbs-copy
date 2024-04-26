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
import { createThreadAction } from "@/actions/form"
import { Toaster } from "sonner"
import { toast } from "sonner"
import { useRouter } from "next/navigation";

const formSchema = z.object({
    title: z.string().min(2, {
        message: "タイトルは2文字以上。",
      }).max(100,{message:"タイトルは100文字以内"}),
  name: z.string().min(0, {
    message: "名前は0文字以上。",
  }).max(100,{message:"名前は100文字以内"}),
  content: z.string().min(2, {
    message: "本文は2文字以上。",
  }).max(1000,{message:"本文は1000文字以内"}),
})

export function ThreadForm() {
    const router = useRouter()

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        title:"",
      name:"",
      content: ""
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    createThreadAction(values.title,values.name,values.content);
    router.push('/');
    toast("スレッドを作成しました。");
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

      <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <div>  
            <FormItem>
                <FormLabel>タイトル</FormLabel>
              <FormControl>
                <Input type="text" placeholder="2文字以上100文字以内" {...field}/>
              </FormControl>
              <FormMessage />
            </FormItem>            
            </div>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <div>  
            <FormItem>
            <FormLabel>名前（空欄可）</FormLabel>
              <FormControl>
                <Input type="text" placeholder="0文字以上100文字以内" {...field}/>
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
            <div>
              <FormItem>
              <FormLabel>1レス目の本文</FormLabel>
              <FormControl>
                <Textarea style={{height:"170px"}} placeholder="2文字以上1000文字以内で投稿" {...field}/>
              </FormControl>
              <FormMessage />
            </FormItem>
            </div>
          )}
        />

        <Button type="submit" className="SubmitButton">スレを作成</Button>
        <Toaster />
      </form>
    </Form>
  )
}
