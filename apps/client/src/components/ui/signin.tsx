import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Icons } from './icons';

const formSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' }),
});

export const SignIn = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className='flex items-center justify-center h-screen lg:grid lg:grid-cols-2'>
      <div className='hidden justify-center items-center lg:flex'>
        <img src='../../public/login.svg' alt='logo' />
      </div>
      <div className='flex flex-col items-center justify-center w-full gap-4'>
        <h1 className='font-extrabold text-transparent text-4xl bg-clip-text bg-gradient-to-r from-[#6c63ff] to-[#5a4fff] p-2 bac'>
          Sign in
        </h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-4 items-center justify-center w-full sm:w-1/2 p-4'
          >
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <>
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type='email'
                        placeholder='example@example.com'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <>
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder='*****' type='password' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </>
              )}
            />
            <Button
              type='submit'
              className='w-full justify-center items-center bg-[#6c63ff] hover:bg-[#5a4fff] shadow-sm shadow-[#6c63ff] text-white'
            >
              Login
            </Button>
            <div className='relative'>
              <div className='absolute inset-0 flex items-center'>
                <span className='w-full border-t' />
              </div>
              <div className='relative flex justify-center text-xs uppercase'>
                <span className='bg-background px-2 text-muted-foreground'>
                  Or continue with
                </span>
              </div>
            </div>
            <div className='flex justify-center gap-4'>
              <Button type='button' variant='outline' className='shadow-sm'>
                <Icons.google className='h-4 w-4' />
              </Button>
              <Button type='button' variant='outline' className='shadow-sm'>
                <Icons.gitHub className='h-4 w-4' />
              </Button>
              <Button type='button' variant='outline' className='shadow-sm'>
                <Icons.twitter className='h-4 w-4' />
              </Button>
            </div>
          </form>
        </Form>
        <div>
          <p className='text-muted-foreground'>
            Don't have an account?{' '}
            <a href='#' className='text-[#6c63ff]'>
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
