import type { ElementType } from 'react'

export interface DetailCardProps {
  org: string
  title: string
  description: string
  highlights?: string[]
  tags?: string[]
  index?: string
  /** 'placeholder' draws the dashed 16:9 photo slot; a string is an image URL; omit for no media. */
  media?: 'placeholder' | string
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
  return (
    <article className={`card ${className}`.trim()}>
      {media && (
        <div className="card__media" role={media === 'placeholder' ? 'img' : undefined} aria-label={media === 'placeholder' ? 'Photo placeholder' : undefined}>
          {media !== 'placeholder' && <img src={media} alt="" loading="lazy" />}
          {media === 'placeholder' && <span>{mediaCaption ?? 'Photo to come'}</span>}
        </div>
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
