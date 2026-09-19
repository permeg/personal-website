import type { ElementType } from 'react'

export interface CardPhoto {
  src: string
  alt: string
  /** CSS object-position, to keep the subject in frame when cropped to 16:9. */
  position?: string
  credit?: { text: string; href: string }
}

export interface DetailCardProps {
  org: string
  title: string
  description: string
  highlights?: string[]
  tags?: string[]
  index?: string
  /** 'placeholder' draws the dashed 16:9 slot; a photo fills it; omit for no media. */
  media?: 'placeholder' | CardPhoto
  /** Small label laid over the bottom-left of the media slot. */
  mediaCaption?: string
  heading?: ElementType
  className?: string
}

/** One card, several data sources: map pins, projects, and education all render through this. */
export function DetailCard({
  org,
  title,
  description,
  highlights,
  tags,
  index,
  media,
  mediaCaption,
  heading: Heading = 'h3',
  className = '',
}: DetailCardProps) {
  const photo = media && media !== 'placeholder' ? media : null
  return (
    <article className={`card ${className}`.trim()}>
      {media && (
        <figure className="card__figure">
          <div
            className={photo ? 'card__media card__media--photo' : 'card__media'}
            role={photo ? undefined : 'img'}
            aria-label={photo ? undefined : 'Photo placeholder'}
          >
            {photo && <img src={photo.src} alt={photo.alt} style={{ objectPosition: photo.position }} />}
            {(mediaCaption || !photo) && <span>{mediaCaption ?? 'Photo to come'}</span>}
          </div>
          {photo?.credit && (
            <figcaption className="card__credit">
              <a href={photo.credit.href} target="_blank" rel="noreferrer">
                {photo.credit.text}
              </a>
            </figcaption>
          )}
        </figure>
      )}
      <div className="card__top">
        {index && <span className="card__index">{index}</span>}
        <p className="card__org">{org}</p>
      </div>
      <Heading className="card__title">{title}</Heading>
      <p className="card__desc">{description}</p>
      {highlights && highlights.length > 0 && (
        <ul className="card__points">
          {highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      )}
      {tags && tags.length > 0 && (
        <ul className="tags" aria-label="Technologies">
          {tags.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      )}
    </article>
  )
}
