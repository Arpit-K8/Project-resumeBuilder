import React, { useEffect, useRef } from 'react'
import './Future.css'

const CDN_TUBES_CURSOR =
  'https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js'

function randomColors(count) {
  return new Array(count)
    .fill(0)
    .map(
      () =>
        '#' +
        Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, '0')
    )
}

const Future = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    let app
    let cancelled = false

    const run = async () => {
      try {
        const mod = await import(CDN_TUBES_CURSOR)
        const TubesCursor = mod?.default ?? mod

        if (cancelled || !canvasRef.current) return

        app = TubesCursor(canvasRef.current, {
          tubes: {
            colors: ['#f967fb', '#53bc28', '#6958d5'],
            lights: {
              intensity: 200,
              colors: ['#83f36e', '#fe8a2e', '#ff008a', '#60aed5'],
            },
          },
        })

        const onClick = () => {
          if (!app?.tubes) return
          const colors = randomColors(3)
          const lightsColors = randomColors(4)
          app.tubes.setColors(colors)
          app.tubes.setLightsColors(lightsColors)
        }

        document.body.addEventListener('click', onClick)

        // Cleanup on unmount
        return () => {
          document.body.removeEventListener('click', onClick)
          if (app?.dispose) app.dispose()
          if (app?.destroy) app.destroy()
        }
      } catch (err) {
        console.error('Failed to load TubesCursor:', err)
      }
    }

    let cleanupFn = () => {}
    ;(async () => {
      cleanupFn = (await run()) ?? (() => {})
    })()

    return () => {
      cancelled = true
      cleanupFn()
    }
  }, [])

  return (
    <div className='min-h-screen'>
      <canvas id='canvas' ref={canvasRef} />
      <div className='hero'>
        <h1>Resumify</h1>
        <p>This page will be available in the near future.</p>
        <a target='_blank' rel='noreferrer' href='/'>
          Back to Home
        </a>
      </div>
    </div>
  )
}

export default Future