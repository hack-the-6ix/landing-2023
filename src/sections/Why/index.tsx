import { Typography } from '@ht6/react-ui';
import cx from 'classnames';
import { graphql, useStaticQuery } from 'gatsby';
import { useMemo } from 'react';
import Slides from './Slides';
import {
  contentIntro,
  italicsTitle,
  root,
  slidesWrapper,
  title,
  titleDesc,
  whyTitle
} from './Why.module.scss';

import { AnimationOnScroll } from 'react-animation-on-scroll';

const slides = [
  {
    image: 'samson.webp',
    title: 'Thank you so much for this amazing opportunity.',
    content:
      'I had such an amazing time this weekend. I really enjoyed my first hackathon and stepping out of my comfort zone and I am definitely looking to participate in more in the future.',
    name: 'Samson Hua',
    role: 'Hacker',
  },
  {
    image: 'wilson.webp',
    title: 'Inspiring, challenging, and exciting.',
    content:
      'Just a few words I would use to describe the past weekend I had at Hack the 6ix, all from the comfort of my own home! Working on our hackathon project remotely was definitely a unique experience and had its own set of challenges, but it was super rewarding and was an incredible learning opportunity.',
    name: 'Wilson Wang',
    role: 'Hacker',
  },
  {
    image: 'aaiman.webp',
    title: 'So honoured to chat about diversity & inclusion at @HackThe6ix today.',
    content:
      'It\'s the most organized hackathon I\'ve ever been to (from what feels like millions)! Well-moderated, great questions, diverse backgrounds+views of the panelists. Kudos to the HT6 team 👏🏻',
    name: 'Aaiman Aamir',
    role: 'Speaker',
  },
  {
    image: 'sam.webp',
    title: 'It was so nice to guide students through their projects.',
    content:
      'Whether it was simply providing feedback on project ideas, or helping hackers deploy apps, connect their React apps to backends, and build API\'s for their projects, I had a great time.',
    name: 'Sam Eskandar',
    role: 'Mentor',
  },
  {
    image: "ham.webp",
    title: "It was a really great hackathon.",
    content: "I don't think it could be improved in any way really. I think you did everything well. I liked the fact that we did not feel left out even though we were participating from another country. They don't have live presentations at a lot of other hackathons so it was great to see it.",
    name: "Hamish Starling",
    role: "Hacker"
  }
];

const query = graphql`
  query WhySectionQuery {
    allFile(filter: { relativeDirectory: { eq: "why-section/pictures" } }) {
      nodes {
        base
        childImageSharp {
          gatsbyImageData
        }
      }
    }
  }
`;

function Why() {
  const data = useStaticQuery<GatsbyTypes.WhySectionQueryQuery>(query);
  const transformedData = useMemo(() => {
    const imageMap = data.allFile.nodes.reduce<{
      [
        base: string
      ]: GatsbyTypes.WhySectionQueryQuery['allFile']['nodes'][number];
    }>((acc, item) => {
      acc[item.base] = item;
      return acc;
    }, {});

    return slides.map((slide) => ({
      ...slide,
      image: imageMap[slide.image].childImageSharp?.gatsbyImageData! ?? null,
    }));
  }, [data]);

  return (
    <div className={root}>
      {/*<Bg className={bg} />*/}
      <AnimationOnScroll animateIn="animate__fadeInUp">
      <div className={contentIntro}>
        <Typography
          className={title}
          textColor='shades-0'
          textType='heading2'
          textWeight='800'
          id='why-us'
          as='h2'
        >
          Ready to <span className={whyTitle}> leave your mark?</span>
        </Typography>
        <Typography
          className={titleDesc}
          textColor='shades-0'
          textType='paragraph1'
          id='details'
          as='p'
        >
          We understand making a change is difficult. At Hack the 6ix, we aim to inspire young hackers to tackle complex challenges, explore the possibilities of technology, and to build the world of tomorrow by giving the support they need.
          <br/><br/>
          <span
            className={cx(titleDesc, italicsTitle)}
            id='sub-details'
          >
            Join us in our <span className={whyTitle}>9th iteration</span> to discover, collaborate, and push the boundaries of technology.         
          </span>
        </Typography>
      </div>
      </AnimationOnScroll>
      <div className={slidesWrapper}>
        <Slides headingLevel='h3' slides={transformedData} />
      </div>
    </div>
  );
}

export default Why;
