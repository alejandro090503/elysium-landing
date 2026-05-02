import { ResetScroll } from '@/app/components/ResetScroll'
import { Hero } from '@/app/components/Hero'
import { StatsStrip } from '@/app/components/StatsStrip'
import { Features } from '@/app/components/Features'
import { WhyUs } from '@/app/components/WhyUs'
import { HowItWorks } from '@/app/components/HowItWorks'
import { Showcase } from '@/app/components/Showcase'
import { FinalCTA } from '@/app/components/FinalCTA'
import { Footer } from '@/app/components/Footer'
import { ScrollProgress } from '@/app/components/ui/ScrollProgress'

export default function Home() {
  return (
    <main>
      <ResetScroll />
      <ScrollProgress />
      <Hero />
      <StatsStrip />
      <Features />
      <WhyUs />
      <HowItWorks />
      <Showcase />
      <FinalCTA />
      <Footer />
    </main>
  )
}
