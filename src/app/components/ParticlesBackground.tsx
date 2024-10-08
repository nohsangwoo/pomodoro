'use client'

import { useState, useEffect, memo } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { ISourceOptions } from "@tsparticles/engine";


const particlesOptions: ISourceOptions = {
    background: {
        color: {
            value: "transparent",
        },
    },
    fpsLimit: 120,
    particles: {
        color: {
            value: "#ffffff",
        },
        links: {
            color: "#ffffff",
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
        },
        move: {
            direction: "none",
            enable: true,
            outModes: {
                default: "bounce",
            },
            random: false,
            speed: 1,
            straight: false,
        },
        number: {
            density: {
                enable: true,
                width: 1920,
                height: 1080
            },
            value: 80,
        },
        opacity: {
            value: 0.5,
        },
        shape: {
            type: "circle",
        },
        size: {
            value: { min: 1, max: 5 },
        },
    },
    detectRetina: true,
};

const ParticlesBackground = () => {
    const [init, setInit] = useState(false);

    useEffect(() => {
        console.log('initParticlesEngine rerender check');


        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    if (!init) {
        return null;
    }

    return (
        <Particles
            id="tsparticles"
            options={particlesOptions}
            className="absolute inset-0 z-0"
        />
    );
}

export default memo(ParticlesBackground);
