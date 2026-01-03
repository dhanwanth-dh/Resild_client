import React from 'react'
import Particles from './Particles'

const Back = () => {
    return (
        <div className='fixed w-full h-[400vh] bg-black -z-10'>
            <div className='-z-10 h-full'>
                <Particles
                    particleColors={['#ffffff', '#ffffff']}
                    particleCount={10000}
                    particleSpread={20}
                    speed={0.5}
                    particleBaseSize={500}
                    moveParticlesOnHover={true}
                    alphaParticles={false}
                    disableRotation={false}
                />
            </div>
        </div>
    )
}

export default Back