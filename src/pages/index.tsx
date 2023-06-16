import { useLocation } from '@reach/router';
import Footer from '../components/Footer';
import Navigation, { NavigationProps } from '../components/Navigation';
import Page from '../components/Page';
import About from '../sections/About';
import Faq from '../sections/Faq';
import Notify from '../sections/Notify';
import PastSpeakers from '../sections/PastSpeakers';
import PastSponsors from '../sections/PastSponsors';
import Question from '../sections/Question';
import Splash from '../sections/Splash';
import Why from '../sections/Why';
import Journey from "../sections/Journey";
import FullWebsiteBackground from "../../static/full-website-background.svg";
import HeroBackgound from "../../static/hero-background.svg"


const navLinks: NavigationProps['links'] = [
  {
    children: 'About',
    href: '#about',
    linkStyle: "pure"
  },
  {
    children: 'Why Us?',
    href: '#why-us',
    linkStyle: "pure"
  },
  {
    children: 'Sponsors',
    href: '#sponsors',
    linkStyle: "pure"
  },
  {
    children: 'Past Speakers',
    href: '#past-speakers',
    linkStyle: "pure"
  },
  {
    children: 'FAQ',
    href: '#faq',
    linkStyle: "pure"
  },
];

const pageBackground = {
  backgroundColor: "#020F29",
  backgroundImage: `url(${FullWebsiteBackground})`,
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
}


function IndexPage() {
  const location = useLocation();
  return (
    <div style={pageBackground}>
    <Page title='Home'>
      <Navigation links={navLinks} showMlhBanner useScrollSpy />
      <Splash />
      <About />
      <Journey />
      <Why />
      <PastSponsors />
      <Notify />
      {/* <PastSpeakers /> */}
      <Faq />
      <Question />
      <Footer />
    </Page>
    </div>
  );
}

export default IndexPage;
