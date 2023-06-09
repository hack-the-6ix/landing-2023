import Hamborgre from '../../images/menu-icon.svg';
import { useCallback, useEffect, useRef, useState, MouseEvent } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import { Button, BasicLink, BasicLinkProps, Typography } from '@ht6/react-ui';
import cx from 'classnames';
import PageSection from '../PageSection';
import Popup from '../Popup';
import Logo from '../../images/logo.svg';
import {
  root,
  content,
  logo,
  logoSvg,
  linkItems,
  linkItem,
  linkItemActive,
  mobileNav,
  mobileNavShow,
  mobileNavWrapper,
  mobileNavItem,
  mobileNavItemActive,
  banner,
  apply,
  applyContainer,
  applyMobile,
  scrolled,
  hamborgreClass,
  mobileNavCTAWrapper,
  xicon
} from './Navigation.module.scss';
import Xicon from '../../images/xIcon.svg';
import { Link as GatsbyLink } from 'gatsby';

function setHash(event: MouseEvent, path: string, scroll?: boolean) {
  event.preventDefault();
  history.replaceState({}, '', path);
  if (scroll) {
    let top = 0;
    try {
      top = document.querySelector<HTMLElement>(path)?.offsetTop ?? 0;
    } catch {}
    const offset = window.innerHeight * 0.1;
    window.scrollTo({ top: top - offset, behavior: 'smooth' });
  }
}

export interface NavigationProps {
  showMlhBanner?: boolean;
  useScrollSpy?: boolean;
  links: BasicLinkProps[];
  base?: string;
  showApply?: boolean;
}

function Navigation({
  showMlhBanner,
  useScrollSpy,
  base = '/',
  links,
  showApply
}: NavigationProps) {
  const [show, setShow] = useState(false);
  const [top, setTop] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);

  const getItemTops = useCallback(() => {
    if (!useScrollSpy) return [];
    return links.map(
      (link) => document.querySelector<HTMLElement>(link.href)?.offsetTop ?? -999
    );
  }, [links, useScrollSpy]);

  const itemTops = useRef<number[]>([]);
  useEffect(() => {
    if (!useScrollSpy) return;

    const scrollHandler = () => {
      setTop(window.scrollY + window.innerHeight * 0.8);
      setIsAtTop(window.scrollY <= 50)
    }
    window.addEventListener('scroll', scrollHandler, true);

    const resizeHandler = () => {
      itemTops.current = getItemTops();
    };
    window.addEventListener('resize', resizeHandler, true);
    resizeHandler();

    return () => {
      window.removeEventListener('scroll', scrollHandler, true);
      window.removeEventListener('resize', resizeHandler, true);
    };
  }, [useScrollSpy, getItemTops]);

  const activeIdx = itemTops.current.reduce<number>((acc, item, idx) => {
    if ((item ?? -999) <= top) {
      acc = idx;
    }
    return acc;
  }, -1);

  return (
    <PageSection containerClassName={cx(root, (isAtTop) ? "" : scrolled)} className={content} as='nav'>
      <BasicLink
        onClick={(...args) => setHash(...args, '#', true)}
        className={logo}
        to={base}
        as={GatsbyLink}
      >
        <Logo className={logoSvg} />
      </BasicLink>
      {links && (
        <ul className={linkItems}>
          {links.map((link, key) => {
            return (
              <Typography
                key={key}
                textType='paragraph2'
                textWeight={650}
                textColor='grey'
                as='li'
              >
                <BasicLink
                  {...link}
                  onClick={(...args) => {
                    setHash(...args, link.href, true);
                    link.onClick?.(...args);
                  }}
                  className={cx(key === activeIdx && linkItemActive, linkItem)}
                />
              </Typography>
            );
          })}
          <Button buttonVariant='secondary' onClick={() => window.open('mailto:hello@hackthe6ix.com')}>Contact us</Button>
          {showApply && <Button onClick={() => window.open('https://dash.hackthe6ix.com')}>Apply now</Button>}
        </ul>
      )}
      <Hamborgre onClick={() => setShow(!show)} className={hamborgreClass}/>
      <div
        className={cx(mobileNav, (show) ? mobileNavShow : "")}
      >
        <div className={mobileNavWrapper}>
          <BasicLink
            onClick={(...args) => setHash(...args, '#', true)}
            className={logo}
            to={base}
            as={GatsbyLink}
          >
            <Logo className={logoSvg} />
          </BasicLink>
          <Xicon className={xicon} onClick={() => setShow(false)} />
        </div>
        {links.map((link, key) => {
          return (
            <Typography
              key={key}
              textType='paragraph2'
              textWeight={650}
              textColor='grey'
              as='span'
            >
              <BasicLink
                {...link}
                onClick={(...args) => {
                  setHash(...args, link.href, true);
                  link.onClick?.(...args);
                  setShow(false);
                }}
                className={cx(
                  key === activeIdx && mobileNavItemActive,
                  mobileNavItem
                )}
              />
            </Typography>
          );
        })}
        <div className={mobileNavCTAWrapper}>
          {showApply && <Button onClick={() => window.open('https://dash.hackthe6ix.com')}>Apply now</Button>}
          <Button buttonVariant='secondary' onClick={() => window.open('mailto:hello@hackthe6ix.com')}>Contact us</Button>
        </div>
      </div>
      {(showMlhBanner) && (
        <BasicLink
          href='https://mlh.io/seasons/2024/events'
          rel='noreferrer noopener'
          className={banner}
          target='_blank'
        >
          <StaticImage
            alt='MLH 2024 Season Banner'
            src='../../images/mlh.svg'
            placeholder='none'
            quality={100}
            width={200}
          />
        </BasicLink>
      )}
    </PageSection>
  );
}

export default Navigation;
