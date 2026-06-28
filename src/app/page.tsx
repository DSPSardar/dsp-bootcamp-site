import Hero from '@/components/Hero'
import WhyDsp from '@/components/WhyDsp'
import Shift from '@/components/Shift'
import Learn from '@/components/Learn'
import Roadmap from '@/components/Roadmap'
import Modules from '@/components/Modules'
import AgentFlow from '@/components/AgentFlow'
import Audience from '@/components/Audience'
import Outcomes from '@/components/Outcomes'
import Project from '@/components/Project'
import Certificates from '@/components/Certificates'
import About from '@/components/About'
import Faq from '@/components/Faq'
import Admission from '@/components/Admission'
import LatestPosts from '@/components/LatestPosts'
import StudentProjects from '@/components/StudentProjects'
import SeoSchema from './components/SeoSchema'

export default function Page() {
  return (
    <>
      <SeoSchema />
      <Hero />
      <WhyDsp />
      <Shift />
      <Learn />
      <Roadmap />
      <Modules />
      <AgentFlow />
      <Audience />
      <Outcomes />
      <Project />
      <StudentProjects />
      <Certificates />
      <LatestPosts />
      <About />
      <Faq />
      <Admission />
    </>
  )
}
