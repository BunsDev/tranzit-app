import { redirect } from 'next/navigation'

export default function Home() {
  
  redirect('/app/overview');

  return (
    <div>
    </div>
  )
}
