import { ElementType, useCallback, useEffect, useRef, useState } from 'react';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';
import { Typography } from '@ht6/react-ui';
import cx from 'classnames';
import LeftArrow from '../../../images/why-section/icons/left-arrow.png';
import RightArrow from '../../../images/why-section/icons/right-arrow.png';
import {
  root,
  control,
  items,
  item,
  title,
  content,
  label,
  wrapper,
  imgwrapper
} from './Slides.module.scss';

export interface SlidesProps {
  slides: {
    image?: IGatsbyImageData;
    title: string;
    content: string;
    name: string;
    role: string;
  }[];
  headingLevel: ElementType<any>;
}

function Slides({ slides, headingLevel }: SlidesProps) {
  const slideRefs = useRef<(HTMLLIElement | null)[]>([]);
  const scrollRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const onLoad = useRef(true);

  const scrollTo = useCallback((idx: number, smooth = false) => {
    if (!scrollRef.current || !slideRefs.current[idx]) return;
    const slideLeft = slideRefs.current[idx]!.offsetLeft;

    scrollRef.current.scrollTo({
      behavior: smooth ? 'smooth' : 'auto',
      left: slideLeft - 152,
    });
  }, []);

  useEffect(() => {
    const handler = () => {
      if (!slideRefs.current[active]) return;
      scrollTo(active);
    };

    window.addEventListener('resize', handler, true);
    return () => {
      window.removeEventListener('resize', handler, true);
    };
  }, [active, scrollTo]);

  useEffect(() => {
    if (!slideRefs.current[active]) return;
    scrollTo(active, !onLoad.current);
    onLoad.current = false;
  }, [active, scrollTo]);

  console.log(active)

  return (
    <div className={root}>
      <button
        className={control}
        onClick={() => setActive(active - 1)}
        disabled={active === 0}
        id='left'
      >
        <img src={LeftArrow} alt='leftarrow' />
      </button>
      <ul ref={scrollRef} className={items}>
        {slides.map((slide, key) => (
          <li
            ref={(el) => (slideRefs.current[key] = el)}
            className={item}
            key={key}
          >
            <div className={imgwrapper}>
              <GatsbyImage
                image={slide.image!}
                alt={`Headshot of ${item.name}`}
              />
            </div>
            <div className={wrapper}>
              <Typography
                className={title}
                textType='heading3'
                textColor='primary-1'
                as={headingLevel}
              >
                {slide.title}
              </Typography>
              <Typography
                className={content}
                textType='paragraph2'
                textColor='copy-dark'
                as='p'
              >
                {slide.content}
              </Typography>
              <p className={label}>
                <Typography textType='p' textWeight='600' textColor='primary-3' as='span'>
                  {slide.name},{' '}
                </Typography>
                <Typography textType='p' textColor='primary-3' as='span'>
                  {slide.role}
                </Typography>
              </p>
            </div>
          </li>
        ))}
      </ul>
      <button
        className={control}
        onClick={() => setActive(active + 1)}
        disabled={active === slides.length - 3}
        id='right'
      >
        <img src={RightArrow} alt='rightarrow' />
      </button>
    </div>
  );
}

export default Slides;
