import { Hero } from '@/app/components/Hero'
import { Features } from '@/app/components/Features'
import { WhyUs } from '@/app/components/WhyUs'
import { HowItWorks } from '@/app/components/HowItWorks'
import { Examples } from '@/app/components/Examples'
import { FinalCTA } from '@/app/components/FinalCTA'
import { Footer } from '@/app/components/Footer'

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <WhyUs />
      <HowItWorks />
      <Examples />
      <FinalCTA />
      <Footer />
    </main>
  )
}
