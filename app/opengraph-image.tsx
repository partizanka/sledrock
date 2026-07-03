import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const dynamic = 'force-static';
export const alt = 'СЛЕD — Horror Punk Rock из Минска';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle at center, #1a0505 0%, #060606 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Red glow effect */}
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(196, 30, 30, 0.3) 0%, transparent 70%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            filter: 'blur(100px)',
          }}
        />

        {/* Content container */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            gap: '24px',
          }}
        >
          {/* Subtitle */}
          <div
            style={{
              display: 'flex',
              color: '#c41e1e',
              fontSize: '20px',
              letterSpacing: '0.3em',
              fontWeight: 600,
              textTransform: 'uppercase',
            }}
          >
            Minsk · Horror Punk Rock
          </div>

          {/* Main logo */}
          <div
            style={{
              display: 'flex',
              color: 'white',
              fontSize: '180px',
              fontWeight: 900,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}
          >
            СЛЕ
            <span style={{ color: '#c41e1e' }}>D</span>
          </div>

          {/* Red separator line */}
          <div
            style={{
              display: 'flex',
              width: '200px',
              height: '4px',
              background: '#c41e1e',
            }}
          />

          {/* Slogan */}
          <div
            style={{
              display: 'flex',
              color: '#a8a29e',
              fontSize: '32px',
              fontWeight: 400,
              fontStyle: 'italic',
              letterSpacing: '0.05em',
            }}
          >
            Пакінь свой след у вечнасці
          </div>

          {/* Domain */}
          <div
            style={{
              display: 'flex',
              color: '#57534e',
              fontSize: '18px',
              fontWeight: 500,
              letterSpacing: '0.2em',
              marginTop: '40px',
            }}
          >
            SLEDROCK.BY
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}