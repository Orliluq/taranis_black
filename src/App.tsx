import { useState, type ReactNode } from 'react'
import { COLORS, IMG, T, u, type Lang } from './content'

const Img = ({ id, alt, className = '', w = 1400 }: { id: string; alt: string; className?: string; w?: number }) => (
  <img src={u(id, w)} alt={alt} loading="lazy" className={`h-full w-full object-cover ${className}`} />
)

const Tag = ({ kind, t }: { kind: 'data' | 'idea'; t: { data: string; idea: string } }) => (
  <span
    className={`inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] ${kind === 'data' ? 'text-turq' : 'text-coral'}`}
  >
    <span className={`h-1.5 w-1.5 rounded-full ${kind === 'data' ? 'bg-turq' : 'bg-coral'}`} />
    {t[kind]}
  </span>
)

const Wordmark = ({ className = '' }: { className?: string }) => (
  <div className={`font-sans font-bold uppercase tracking-[0.38em] ${className}`}>
    Taranis<span className="text-coral"> </span>
    <span className="font-light">Black</span>
  </div>
)

function Sheet({ id, n, label, title, tone = 'ivory', children, tag, t }: {
  id: string; n: string; label: string; title: string; tone?: 'ivory' | 'graphite' | 'white'
  children: ReactNode; tag: 'data' | 'idea'; t: { data: string; idea: string }
}) {
  const bg = tone === 'graphite' ? 'bg-graphite text-ivory' : tone === 'white' ? 'bg-[#faf7f1]' : 'bg-ivory'
  return (
    <section id={id} className={`sheet ${bg} scroll-mt-14`}>
      <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-12 md:py-20 lg:px-20 lg:py-28">
        <header className="mb-12 grid gap-6 border-t border-current/20 pt-6 lg:mb-16 lg:grid-cols-12">
          <div className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.16em] lg:col-span-4 lg:flex-col lg:items-start lg:gap-3">
            <span className="font-display text-5xl font-light tracking-normal text-coral lg:text-7xl">{n}</span>
            <span className="opacity-70">{label}</span>
            <Tag kind={tag} t={t} />
          </div>
          <h2 className="text-[2rem] leading-[1.1] md:text-5xl lg:col-span-8 lg:text-6xl">{title}</h2>
        </header>
        {children}
      </div>
    </section>
  )
}

const Flow = ({ className = '', stroke = 'currentColor' }: { className?: string; stroke?: string }) => (
  <svg className={className} viewBox="0 0 400 200" preserveAspectRatio="none" fill="none" stroke={stroke} strokeWidth="1.2" aria-hidden>
    {Array.from({ length: 12 }).map((_, i) => (
      <path key={i} d={`M-10 ${20 + i * 14} C 80 ${-10 + i * 14}, 140 ${70 + i * 14}, 220 ${30 + i * 14} S 360 ${i * 14}, 410 ${24 + i * 14}`} />
    ))}
  </svg>
)

const icons = [
  <path key="0" d="M9 4a2 2 0 1 0 0 .01M9 8v6l-3 6M9 14h5l2 6M14 14l1-4h3" />,
  <path key="1" d="M3 9h18M5 9v11M19 9v11M3 9l1-4h16l1 4" />,
  <path key="2" d="M4 12h2M8 8v8M12 5v14M16 8v8M20 12h-2" />,
  <path key="3" d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8" />,
  <path key="4" d="M4 4h16v16H4zM4 9.3h16M4 14.7h16M9.3 4v16M14.7 4v16" />,
  <path key="5" d="M3 9c3-4 6-4 9 0s6 4 9 0M3 15c3-4 6-4 9 0s6 4 9 0" />,
]
const Icon = ({ i }: { i: number }) => (
  <svg viewBox="0 0 24 24" className="h-9 w-9" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    {icons[i]}
  </svg>
)

export default function App() {
  const [lang, setLang] = useState<Lang>(() => (new URLSearchParams(location.search).get('lang') === 'pt' ? 'pt' : 'es'))
  const c = T[lang]
  const t = c.tags
  const switchLang = () => {
    const next: Lang = lang === 'es' ? 'pt' : 'es'
    setLang(next)
    document.documentElement.lang = next === 'es' ? 'es' : 'pt-BR'
    history.replaceState(null, '', `?lang=${next}`)
  }
  const ids = ['essence', 'personality', 'palette', 'type', 'photo', 'graphic', 'products', 'apps', 'campaign']

  return (
    <div lang={lang === 'es' ? 'es' : 'pt-BR'}>
      {/* Toolbar */}
      <div className="no-print sticky top-0 z-50 border-b border-graphite/10 bg-ivory/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-6 py-3 md:px-12 lg:px-20">
          <a href="#top"><Wordmark className="text-[11px]" /></a>
          <nav className="hidden gap-5 text-xs font-semibold xl:flex">
            {c.nav.map((n, i) => (
              <a key={n} href={`#${ids[i]}`} className="opacity-60 transition hover:text-turq hover:opacity-100">{n}</a>
            ))}
          </nav>
          <div className="flex items-center gap-2 text-xs font-bold">
            <button onClick={switchLang} className="rounded-full border border-graphite/25 px-4 py-2 transition hover:bg-graphite hover:text-ivory">
              {c.meta.other}
            </button>
            <button onClick={() => window.print()} className="rounded-full bg-graphite px-4 py-2 text-ivory transition hover:bg-turq">
              {c.meta.print}
            </button>
          </div>
        </div>
      </div>

      {/* 00 Cover */}
      <section id="top" className="sheet relative isolate overflow-hidden bg-graphite text-ivory">
        <div className="absolute inset-0 -z-10">
          <Img id={IMG.hero} alt="" w={2000} className="opacity-55" />
          <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/60 to-graphite/20" />
        </div>
        <div className="mx-auto flex min-h-[760px] max-w-[1440px] flex-col justify-between px-6 py-10 md:min-h-[900px] md:px-12 lg:min-h-[860px] lg:px-20 lg:py-14">
          <div className="flex items-start justify-between text-[11px] font-bold uppercase tracking-[0.16em]">
            <span>{c.cover.kicker}</span>
            <span className="hidden text-coral md:block">{c.cover.origin} · BR</span>
          </div>
          <div>
            <h1 className="font-display text-[3.2rem] font-light leading-[0.95] sm:text-7xl md:text-[7rem] lg:text-[10rem]">
              Taranis
              <br />
              <span className="italic text-turq-light" style={{ color: '#6fd0c8' }}>Black</span>
              <span className="text-coral">.</span>
            </h1>
            <div className="mt-10 grid gap-8 border-t border-ivory/25 pt-6 lg:grid-cols-12">
              <p className="max-w-xl text-lg leading-relaxed md:text-xl lg:col-span-6">{c.cover.sub}</p>
              <p className="text-xs leading-relaxed opacity-70 lg:col-span-4 lg:col-start-9">{c.cover.note}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 01 Essence */}
      <Sheet id="essence" {...c.essence} tag="idea" t={t}>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="grid gap-10 md:grid-cols-2 lg:col-span-7">
            <div>
              <h3 className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-turq">{c.essence.purposeL}</h3>
              <p className="text-xl leading-relaxed">{c.essence.purpose}</p>
            </div>
            <div>
              <h3 className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-turq">{c.essence.posL}</h3>
              <p className="leading-relaxed opacity-80">{c.essence.pos}</p>
            </div>
            <div className="md:col-span-2">
              {c.essence.pillars.map(([a, b], i) => (
                <div key={a} className="grid grid-cols-[3rem_1fr] gap-4 border-t border-graphite/15 py-5 md:grid-cols-[3rem_10rem_1fr]">
                  <span className="font-display text-coral">0{i + 1}</span>
                  <span className="font-display text-2xl">{a}</span>
                  <p className="col-start-2 text-sm leading-relaxed opacity-75 md:col-start-auto">{b}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:col-span-5">
            <div className="aspect-[3/4] overflow-hidden"><Img id={IMG.portrait} alt="" w={900} /></div>
            <div className="mt-12 aspect-[3/4] overflow-hidden"><Img id={IMG.desk} alt="" w={900} /></div>
          </div>
        </div>
      </Sheet>

      {/* 02 Personality */}
      <Sheet id="personality" {...c.personality} tone="graphite" tag="idea" t={t}>
        <div className="grid gap-px overflow-hidden bg-ivory/15 sm:grid-cols-2 lg:grid-cols-3">
          {c.personality.attrs.map(([a, b], i) => (
            <div key={a} className="bg-graphite p-8 lg:p-10">
              <div className="mb-10 text-xs font-bold tracking-[0.16em] text-coral">0{i + 1}</div>
              <h3 className="mb-2 text-3xl">{a}</h3>
              <p className="text-sm opacity-70">{b}</p>
            </div>
          ))}
        </div>
        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h3 className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-coral">{c.personality.voiceL}</h3>
            <p className="font-display text-2xl leading-snug">{c.personality.voice}</p>
          </div>
          {([['isL', 'is', '#6fd0c8'], ['notL', 'not', '#ff6b57']] as const).map(([l, k, col]) => (
            <div key={k} className={`lg:col-span-3 ${k === 'is' ? 'lg:col-start-7' : ''}`}>
              <h3 className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: col }}>{c.personality[l]}</h3>
              <ul className="space-y-2">
                {c.personality[k].map((w) => <li key={w} className="border-b border-ivory/15 pb-2">{w}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </Sheet>

      {/* 03 Palette */}
      <Sheet id="palette" {...c.palette} tag="data" t={t}>
        <p className="mb-10 max-w-2xl text-lg opacity-80">{c.palette.intro}</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {COLORS.map((col, i) => (
            <div key={col.key} className={`flex flex-col justify-between border border-graphite/10 p-6 ${i < 4 ? 'min-h-72' : 'min-h-44'}`} style={{ background: col.hex, color: col.dark ? '#F4EFE6' : '#1E2326' }}>
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] opacity-70">{c.palette.roles[col.key]}</span>
              <div>
                <div className="font-display text-3xl">{c.palette.names[col.key]}</div>
                <div className="mt-1 text-sm font-semibold tracking-widest">{col.hex}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12">
          <h3 className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-turq">{c.palette.propL}</h3>
          <div className="flex h-12 overflow-hidden border border-graphite/15">
            {[['#F4EFE6', 45], ['#1E2326', 30], ['#17857F', 15], ['#D9D2C4', 7], ['#FF6B57', 3]].map(([h, w]) => (
              <div key={h} style={{ background: h as string, width: `${w}%` }} />
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-xs font-semibold opacity-70">
            {c.palette.prop.map((p) => <span key={p}>{p}</span>)}
          </div>
        </div>
      </Sheet>

      {/* 04 Type */}
      <Sheet id="type" {...c.type} tone="white" tag="idea" t={t}>
        <div className="grid gap-px bg-graphite/15 md:grid-cols-2">
          {[
            [c.type.dispL, c.type.dispName, c.type.dispD, 'font-display'],
            [c.type.textL, c.type.textName, c.type.textD, 'font-sans'],
          ].map(([l, n, d, f]) => (
            <div key={n} className="bg-[#faf7f1] p-8 lg:p-12">
              <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-turq">{l}</div>
              <div className={`${f} mt-6 text-7xl leading-none lg:text-8xl`}>Aa</div>
              <div className={`${f} mt-6 text-2xl`}>{n}</div>
              <p className="mt-2 text-sm opacity-70">{d}</p>
              <p className={`${f} mt-6 break-words text-sm tracking-wider opacity-60`}>{c.type.alpha}</p>
            </div>
          ))}
        </div>
        <div className="mt-12">
          {c.type.hier.map(([name, sample, spec], i) => {
            const cls = [
              'font-display text-5xl font-light leading-none md:text-7xl lg:text-[5.5rem]',
              'font-display text-3xl leading-tight md:text-[2.5rem]',
              'font-display text-2xl leading-tight md:text-[1.75rem]',
              'text-lg font-medium',
              'text-base leading-relaxed',
              'text-[11px] font-bold uppercase tracking-[0.16em]',
            ][i]
            return (
              <div key={name} className="grid gap-2 border-t border-graphite/15 py-6 md:grid-cols-[9rem_1fr] lg:grid-cols-[9rem_1fr_13rem] lg:items-center">
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-turq">{name}</span>
                <span className={`${cls} max-w-2xl`}>{sample}</span>
                <span className="text-xs opacity-55 md:col-start-2 lg:col-start-auto">{spec}</span>
              </div>
            )
          })}
        </div>
      </Sheet>

      {/* 05 Photo */}
      <Sheet id="photo" {...c.photo} tag="idea" t={t}>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-6 md:gap-4">
          {[
            [IMG.hero, 'md:col-span-4 aspect-[16/10]'], [IMG.teal, 'md:col-span-2 aspect-[4/5] md:aspect-auto'],
            [IMG.team, 'md:col-span-2 aspect-square'], [IMG.light, 'md:col-span-2 aspect-square'], [IMG.booths, 'md:col-span-2 col-span-2 aspect-[16/9] md:aspect-square'],
          ].map(([id, cls], i) => (
            <figure key={id} className={`relative overflow-hidden ${cls}`}>
              <Img id={id} alt={c.photo.caps[i]} w={1200} />
              <figcaption className="absolute bottom-0 left-0 bg-graphite/80 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-ivory">{c.photo.caps[i]}</figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          <div className="grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:col-span-8">
            {c.photo.rules.map(([a, b]) => (
              <div key={a} className="border-t border-graphite/15 pt-4">
                <h3 className="font-display text-2xl">{a}</h3>
                <p className="mt-1 text-sm opacity-75">{b}</p>
              </div>
            ))}
          </div>
          <div className="lg:col-span-4">
            <h3 className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-coral">{c.photo.avoidL}</h3>
            <ul className="space-y-2 text-sm">
              {c.photo.avoid.map((a) => <li key={a} className="border-b border-graphite/15 pb-2">{a}</li>)}
            </ul>
          </div>
        </div>
      </Sheet>

      {/* 06 Graphic */}
      <Sheet id="graphic" {...c.graphic} tone="graphite" tag="idea" t={t}>
        <div className="grid gap-4 lg:grid-cols-12">
          <div className="border border-ivory/15 p-8 lg:col-span-7">
            <h3 className="mb-6 text-[11px] font-bold uppercase tracking-[0.16em] text-coral">{c.graphic.icoL}</h3>
            <div className="grid grid-cols-3 gap-6 sm:grid-cols-6 lg:grid-cols-3 xl:grid-cols-6">
              {c.graphic.ico.map((n, i) => (
                <div key={n} className="flex flex-col items-center gap-3 text-center text-[#6fd0c8]">
                  <Icon i={i} />
                  <span className="text-[11px] font-semibold text-ivory/80">{n}</span>
                </div>
              ))}
            </div>
            <p className="mt-8 text-sm opacity-70">{c.graphic.icoD}</p>
          </div>
          <div className="relative min-h-60 overflow-hidden bg-turq p-8 lg:col-span-5">
            <Flow className="absolute inset-0 h-full w-full text-ivory/40" />
            <div className="relative">
              <h3 className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em]">{c.graphic.patL}</h3>
              <p className="max-w-xs text-sm">{c.graphic.patD}</p>
            </div>
          </div>
          <div className="border border-ivory/15 p-8 lg:col-span-4">
            <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.16em] text-coral">{c.graphic.gridL}</h3>
            <div className="mb-4 grid h-24 grid-cols-12 gap-1">
              {Array.from({ length: 12 }).map((_, i) => <div key={i} className="bg-coral/25" />)}
            </div>
            <p className="text-sm opacity-70">{c.graphic.gridD}</p>
          </div>
          <div className="border border-ivory/15 p-8 lg:col-span-4">
            <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.16em] text-coral">{c.graphic.shapeL}</h3>
            <div className="mb-4 flex h-24 items-end gap-3">
              <div className="h-full w-16 bg-ivory" />
              <div className="h-14 w-24 rounded-xl bg-turq" />
              <div className="h-8 w-20 rounded-full bg-coral" />
            </div>
            <p className="text-sm opacity-70">{c.graphic.shapeD}</p>
          </div>
          <div className="flex flex-col justify-between bg-ivory p-8 text-graphite lg:col-span-4">
            <Wordmark className="text-base sm:text-lg" />
            <div className="mt-10">
              <h3 className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-coral">{c.graphic.logoL}</h3>
              <p className="text-sm opacity-70">{c.graphic.logoD}</p>
            </div>
          </div>
        </div>
      </Sheet>

      {/* 07 Products */}
      <Sheet id="products" {...c.products} tag="data" t={t}>
        <div className="grid gap-6 md:grid-cols-3">
          {c.products.items.map((p, i) => (
            <article key={p.name} className="group flex flex-col">
              <div className="aspect-[4/5] overflow-hidden">
                <Img id={[IMG.portrait, IMG.desk, IMG.booths][i]} alt={p.name} w={900} className="transition duration-700 group-hover:scale-105" />
              </div>
              <div className="flex-1 border-b border-graphite/15 py-6">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-4xl">{p.name}</h3>
                  <span className="text-xs font-bold tracking-[0.16em] text-coral">0{i + 1}</span>
                </div>
                <div className="mt-2 text-[11px] font-bold uppercase tracking-[0.16em] text-turq">{p.area}</div>
                <p className="mt-4 text-sm leading-relaxed opacity-75">{p.d}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-8 max-w-2xl text-xs leading-relaxed opacity-60">{c.products.note}</p>
      </Sheet>

      {/* 08 Applications */}
      <Sheet id="apps" {...c.apps} tone="white" tag="idea" t={t}>
        <div className="grid gap-8 lg:grid-cols-12">
          {/* LinkedIn */}
          <div className="lg:col-span-7">
            <Label>{c.apps.li.l}</Label>
            <div className="overflow-hidden border border-graphite/15 bg-white">
              <div className="flex items-center gap-3 p-4">
                <div className="grid h-10 w-10 place-items-center bg-graphite text-xs font-bold text-ivory">TB</div>
                <div className="text-sm"><b>TARANIS BLACK</b><div className="text-xs opacity-50">{c.apps.li.sub}</div></div>
              </div>
              <p className="px-4 pb-4 text-sm">{c.apps.li.body}</p>
              <div className="relative aspect-[1.91/1]">
                <Img id={IMG.teal} alt="" w={1200} />
                <div className="absolute inset-0 bg-gradient-to-r from-graphite/85 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-center gap-4 p-6 text-ivory md:p-10">
                  <div className="max-w-[16rem] font-display text-2xl leading-tight md:max-w-sm md:text-4xl">{c.apps.li.head}</div>
                  <span className="w-fit bg-coral px-4 py-2 text-xs font-bold text-graphite">{c.apps.li.cta}</span>
                </div>
              </div>
            </div>
          </div>
          {/* Instagram */}
          <div className="lg:col-span-5">
            <Label>{c.apps.ig.l}</Label>
            <div className="relative mx-auto aspect-square max-w-[440px] overflow-hidden bg-graphite lg:max-w-none">
              <Img id={IMG.light} alt="" w={1000} className="opacity-70" />
              <div className="absolute inset-0 bg-gradient-to-t from-graphite/90 via-transparent to-graphite/30" />
              <div className="absolute inset-x-0 top-0 p-5"><Wordmark className="text-[10px] text-ivory" /></div>
              <div className="absolute inset-x-0 bottom-0 p-6 text-ivory">
                <div className="font-display text-4xl font-light leading-none md:text-5xl">{c.apps.ig.head}</div>
                <div className="mt-3 flex items-center gap-3 text-sm"><span className="h-px w-8 bg-coral" />{c.apps.ig.body}</div>
              </div>
            </div>
          </div>
          {/* Email */}
          <div className="lg:col-span-5">
            <Label>{c.apps.em.l}</Label>
            <div className="mx-auto max-w-[460px] border border-graphite/15 bg-white lg:max-w-none">
              <div className="border-b border-graphite/10 bg-stone/40 px-5 py-3 text-xs font-semibold">{c.apps.em.subj}</div>
              <div className="aspect-[16/7]"><Img id={IMG.desk} alt="" w={900} className="object-[50%_35%]" /></div>
              <div className="p-6">
                <Wordmark className="mb-5 text-[9px]" />
                <div className="font-display text-2xl leading-tight">{c.apps.em.head}</div>
                <p className="mt-2 text-sm opacity-70">{c.apps.em.body}</p>
                <span className="mt-5 inline-block bg-turq px-5 py-2.5 text-xs font-bold text-ivory">{c.apps.em.cta}</span>
              </div>
            </div>
          </div>
          {/* Brochure */}
          <div className="lg:col-span-7">
            <Label>{c.apps.br.l}</Label>
            <div className="grid grid-cols-2 shadow-xl shadow-graphite/10">
              <div className="relative aspect-[3/4] overflow-hidden bg-graphite">
                <Img id={IMG.table} alt="" w={900} className="opacity-60" />
                <div className="absolute inset-0 flex flex-col justify-between p-4 text-ivory md:p-8">
                  <Wordmark className="text-[8px] md:text-[10px]" />
                  <div className="font-display text-xl leading-tight sm:text-3xl md:text-4xl">{c.apps.br.head}</div>
                </div>
              </div>
              <div className="flex aspect-[3/4] flex-col justify-between bg-ivory p-4 md:p-8">
                <div className="text-[8px] font-bold uppercase tracking-[0.16em] text-turq md:text-[10px]">{c.apps.br.page}</div>
                <div>
                  <div className="mb-3 space-y-1 md:space-y-2">
                    {c.products.items.map((p) => (
                      <div key={p.name} className="flex justify-between border-b border-graphite/15 pb-1 font-display text-sm md:text-xl"><span>{p.name}</span><span className="text-coral">→</span></div>
                    ))}
                  </div>
                  <p className="text-[10px] leading-snug opacity-70 md:text-sm">{c.apps.br.body}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Sheet>

      {/* 09 Campaign */}
      <section id="campaign" className="sheet relative isolate overflow-hidden bg-graphite text-ivory scroll-mt-14">
        <div className="absolute inset-0 -z-10 opacity-35"><Img id={IMG.team} alt="" w={2000} /></div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-graphite/70 to-graphite" />
        <Flow className="absolute inset-x-0 top-1/3 -z-10 h-80 w-full text-turq/60" stroke="#17857f" />
        <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-12 md:py-20 lg:px-20 lg:py-28">
          <div className="mb-10 flex flex-wrap items-center gap-4 border-t border-ivory/20 pt-6 text-[11px] font-bold uppercase tracking-[0.16em]">
            <span className="font-display text-5xl font-light tracking-normal text-coral">{c.campaign.n}</span>
            <span className="opacity-70">{c.campaign.label}</span>
            <Tag kind="data" t={t} />
          </div>
          <h2 className="font-display text-[3.4rem] font-light leading-[0.95] sm:text-8xl lg:text-[11rem]">
            Work in <span className="italic" style={{ color: '#6fd0c8' }}>flow</span><span className="text-coral">.</span>
          </h2>
          <p className="mt-8 max-w-2xl font-display text-2xl leading-snug md:text-3xl">{c.campaign.concept}</p>

          <div className="mt-16 grid gap-6 lg:grid-cols-12">
            <div className="bg-ivory p-8 text-graphite lg:col-span-7 lg:p-12">
              <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-turq">{c.campaign.headL}</div>
              <div className="mt-4 font-display text-3xl leading-tight md:text-5xl">{c.campaign.head}</div>
              <div className="mt-8 flex flex-wrap items-center gap-6">
                <span className="bg-coral px-6 py-3 text-sm font-bold">{c.campaign.cta}</span>
                <Wordmark className="text-[10px]" />
              </div>
            </div>
            <div className="grid gap-3 lg:col-span-5">
              {c.campaign.phases.map(([a, b], i) => (
                <div key={a} className="flex items-baseline gap-5 border border-ivory/20 p-5">
                  <span className="font-display text-3xl text-coral">0{i + 1}</span>
                  <div><div className="font-display text-2xl">{a}</div><p className="text-sm opacity-70">{b}</p></div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 grid gap-px bg-ivory/15 sm:grid-cols-2 lg:grid-cols-4">
            {c.campaign.pieces.map(([a, b]) => (
              <div key={a} className="bg-graphite p-6">
                <h3 className="mb-2 text-xl">{a}</h3>
                <p className="text-sm opacity-70">{b}</p>
              </div>
            ))}
          </div>

          <footer className="mt-20 grid gap-6 border-t border-ivory/20 pt-6 text-xs leading-relaxed opacity-70 lg:grid-cols-12">
            <div className="lg:col-span-6"><b className="mb-1 block uppercase tracking-[0.16em]">{c.foot.docL}</b>{c.foot.doc}</div>
            <div className="lg:col-span-5 lg:col-start-8">{c.foot.photo}</div>
          </footer>
        </div>
      </section>
    </div>
  )
}

const Label = ({ children }: { children: ReactNode }) => (
  <div className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-turq">{children}</div>
)
