import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import Intro from '@/components/sections/Intro'
import Services from '@/components/sections/Services'

export default function Home() {
  return (
    <main className="bg-secondary min-h-screen">
      <Navbar />
      <Hero />
      <Intro />
      <Services />
      <Footer />
    </main>
  )
}
