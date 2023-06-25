import { Typography } from '@ht6/react-ui';
import cx from 'classnames';
import { graphql, useStaticQuery } from 'gatsby';
import { useState } from 'react';
import InputButton from '../../components/InputButton';
import PageSection from '../../components/PageSection';
import Socials from '../../components/Socials';
import TurnstileChallenge from "../../components/TurnstileChallenge";
import VCarousel from './VCarousel/VCarousel';

import toast from 'react-hot-toast';
import Cloud from '../../images/cloud.svg';
import Ship from '../../images/ship.svg';
import { ApiService, ApiServiceError } from '../../utils';
import {
  carousel,
  cloud,
  container,
  dates,
  eventType,
  hideDesktop,
  hideMobile,
  ship,
  shipWrapper,
  signUpText,
  socials,
  splashContent,
  text,
  textHighlight,
  title
} from './Splash.module.scss';

const query = graphql`
  query SplashQuery {
    allSite {
      nodes {
        siteMetadata {
          event {
            start
            end
          }
          socials {
            link
            type
          }
        }
      }
    }
  }
`;

const words = ['network.', 'learn.', 'win.', 'create a project.', 'collaborate.'];

function Splash() {
  const data = useStaticQuery<GatsbyTypes.SplashQueryQuery>(query);
  const startDate = new Date(data.allSite.nodes[0].siteMetadata!.event!.start!);
  const endDate = new Date(data.allSite.nodes[0].siteMetadata!.event!.end!);
  const isSameMonth = startDate.getMonth() === endDate.getMonth();
  // const [emailInput, setEmailInput] = useState({email: ''});
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  // const [submitting, setSubmitting] = useState(false);

  const startFormat = new Intl.DateTimeFormat('en-CA', {
    month: 'long',
    day: 'numeric',
  });
  const endFormat = new Intl.DateTimeFormat('en-CA', {
    month: isSameMonth ? undefined : 'long',
    day: 'numeric',
  });

  // Email Submission
  const onSubmit = async () => {
    const id = toast.loading('Loading...');
    try {
      const { response } = ApiService.subscribe({
          email, captchaToken: token
      }, 'subscribe', 'reset');
      toast.success(await response, {id});
      setEmail('');
    } catch (err) {
      switch ((err as any).name) {
        case 'AbbortError':
          break;
        case 'ApiServiceError':
          toast.error((err as ApiServiceError).getHumanError(), { id });
          console.error(err);
          break;
        default:
          toast.error('Unexpected error. Please try again later', { id });
          console.error(err);
          break;
      }
    }
  }

  return (
    <PageSection
      containerClassName={container}
      className={splashContent}
    >
      <div className={shipWrapper}>
        <Cloud className={cloud}/>
        <Ship className={ship}/>
      </div>
        <Typography
          className={cx(text, dates)}
          textColor='neutral-50'
          textType='heading3'
          as='p'
        >
          {startFormat.format(startDate)} - {endFormat.format(endDate)}, 2023
          <span className={hideMobile}> • </span> 
          <span className={eventType}> In-person event</span>
        </Typography>
        <Typography
          className={cx(text, title)}
          textColor='neutral-50'
          textType='heading1'
          as='h1'
        >
          Hack the 6ix is Toronto's <br className={hideMobile} /> <span className={textHighlight}>largest</span> summer hackathon, <br className={hideMobile} /> where <span className={textHighlight}>anyone</span> can hack <br className={hideDesktop} /> to <br className={hideMobile} />
          <VCarousel className={carousel} items={words} />
        </Typography>
        <Typography
          className={cx(text, signUpText)}
          textColor='neutral-50'
          textType='paragraph1'
          as='p'
        >
          Applications opening soon! Receive the latest updates in your inbox.
        </Typography>
        <InputButton
          label='Enter email'
          name='email'
          buttonText='Notify me'
          inputProps={{
            noBorder: true,
            required: true,
            opacity: 38,
            opacityOnHover: 50,
            placeHolderColor: "primary-50",
            textColor: "shades-0",
            value: email,
            type: 'email',
            onChange: (e) => setEmail(e.currentTarget.value)
          }}
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
            return false;
          }}

        >
        </InputButton>
        <TurnstileChallenge onToken={(token) => setToken(token)}/>
        <Socials
          className={socials}
          baseColor='shades-0'
          activeColor='primary-500' 
          gap='1rem'
        />
    </PageSection>
  );
}

export default Splash;