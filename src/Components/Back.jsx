import React from 'react'
import Particles from './Particles'

const Back = () => {
    return (
        <div className='fixed w-full h-[400vh] bg-black -z-10'>
            <div className='-z-10 h-full'>
                <Particles
                    particleColors={['#ffffff', '#ffffff']}
                    particleCount={1000}
                    particleSpread={10}
                    speed={0.1}
                    particleBaseSize={100}
                    moveParticlesOnHover={true}
                    alphaParticles={false}
                    disableRotation={false}
                />
            </div>
        </div>
    )
}

export default Back