import React from 'react'
import Hero from './Components/Hero'
import LatestCrop from './Components/LatestCrop'
import HowItWorks from './Components/HowItWorks'
import AgroNews from './Components/AgroNews'
import PartnerShips from './Components/PartnerShips'
import OurMissionImpact from './Components/OurMissionImpact'

function App() {
  return (
    <div className='*:py-10 md:*:py-20'>
      <Hero/>
      <LatestCrop/>
      <HowItWorks/>
      <AgroNews/>
      <PartnerShips/>
      <OurMissionImpact/>
    </div>
  )
}

export default App