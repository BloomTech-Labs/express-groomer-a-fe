import React from 'react';
import FadeIn from 'react-fade-in';
import {
  Container,
  Title,
  SecondTitle,
  SectionOne,
  SectionTwo,
  SectionThree,
  SectionFour,
  IntroImage1,
  IntroImage2,
  Section,
  Row,
  HiddenRow,
  CenterDiv,
  MediumPara,
  Button,
  Blue,
  SpacedDiv,
  BlueExpress,
  Footer,
  LogoContainer,
  SocialContainer,
  Logo,
  FooterTitles,
  FooterSect,
  Copyright,
  GroomerImg,
  GroomerText,
  Spacing,
  Caption,
  Poodle,
  SpacingLeft,
  SpacingRight,
} from '../../styles/landingpagestyles';

const HomePage = () => {
  return (
    <div>
      <FadeIn delay={100} transitionDuration={875}>
        <Container className={'container'}>
          <Section>
            <Title>
              <BlueExpress>Express Groomer</BlueExpress>
            </Title>
            <CenterDiv>
              <SectionOne>
                <div>Grooming on your Schedule</div>
                <SecondTitle>Get Clean, Faster</SecondTitle>
                <MediumPara>
                  With Express Groomer you are your own boss. Whether you're a
                  pet owner looking for a squeaky clean pet or a Groomer looking
                  to add more clients to your business. Your Schedule: Your
                  Rules.
                </MediumPara>
                <div>Changing the way you Groom.</div>
                <SpacedDiv>
                  What are you waiting for? <br />
                  Create an Account Now: <Button>Sign Up</Button>
                </SpacedDiv>
              </SectionOne>
              <SectionTwo>
                <IntroImage1
                  src={require('../../images/golden-bath.jpg')}
                  alt="golden retriever"
                ></IntroImage1>
                <IntroImage2
                  src={require('../../images/shortcoat-smile.jpg')}
                  alt="shortcoat dog"
                ></IntroImage2>
              </SectionTwo>
            </CenterDiv>
          </Section>
        </Container>

        <Container className={'container'} style={{ backgroundColor: 'black' }}>
          <Section
            style={{
              backgroundColor: 'black',
              color: 'white',
              marginTop: '8%',
              marginBottom: '8%',
            }}
          >
            <SpacingLeft style={{ color: 'white' }}>
              Spend less time on grooming...
            </SpacingLeft>
            <CenterDiv>
              <Row>
                <SecondTitle>Why Wait?</SecondTitle>
                <MediumPara>
                  Appointments at a National Chain Salon can take up to 3 hours.
                </MediumPara>
                <div>
                  Most of that time spent waiting in a crate, surrounded by
                  unfamiliar pets and strange noises - then being handled by a
                  stranger. With Express Groomer the average appointment lasts
                  only 90 minutes - most of that time being spent 1 on 1 with a
                  Groomer who can become a familiar face.
                </div>
              </Row>

              <HiddenRow>
                <Poodle
                  src={require('../../images/poodle.jpg')}
                  alt="poodle"
                ></Poodle>
              </HiddenRow>

              <HiddenRow>
                <SecondTitle>Sensitive Skin?</SecondTitle>
                <MediumPara>
                  Commercial shampoos contain harsh sulfates that strip your
                  pet's coat of its delicate oils.
                </MediumPara>
                <div>
                  Our Groomers only use shampoos from a pre-approved list of
                  products containing natural, moisturizing ingredients that are
                  sure to leave your pet with a shiny soft coat. No harsh
                  chemicals needed!
                </div>
              </HiddenRow>
            </CenterDiv>
            <SpacingRight style={{ color: 'white' }}>
              ...and more time with your pets
            </SpacingRight>
          </Section>
        </Container>

        <Container className={'container'}>
          <Section>
            <CenterDiv>
              <SectionThree>
                <GroomerImg
                  src={require('../../images/groomer.jpg')}
                  alt="groomer"
                ></GroomerImg>
                <Caption>
                  All of our Groomers are state certified and licensed, so you
                  know your pets are in good hands.
                </Caption>
              </SectionThree>

              <SectionFour>
                <SecondTitle>We Love Groomers</SecondTitle>
                <MediumPara>
                  Whether you're looking to get extra income or start a
                  Freelance career, turn your passion for pets into extra
                  income!
                </MediumPara>
                <GroomerText>
                  <ul>
                    <li>Make your own hours</li>
                    <li>Schedule at your convience</li>
                    <li>Work as little or as much as you like</li>
                    <li>You decide which appointments to accept</li>
                    <li>
                      Our client rating system lets you pick the clients right
                      for you
                    </li>
                  </ul>
                  <p>
                    Becoming a Groomer with Express Groomer is Easy! Just upload
                    a copy of your Groomer's License and ID and one of our
                    representitives will reach out for a brief chat.
                  </p>
                  <p>Earn a $500 bonus after your first 100 appointments</p>
                </GroomerText>
                <SpacedDiv>
                  <MediumPara>
                    Interested in Grooming but don't have experience? You may be
                    eligible for our <Blue>New Trainee Program</Blue>
                  </MediumPara>
                </SpacedDiv>
              </SectionFour>
            </CenterDiv>
          </Section>
        </Container>

        <Footer className={'footer'}>
          <LogoContainer>
            <Logo>Express Groomer</Logo>
            <SocialContainer>
              <div className="fa fa-facebook"></div>
              <div className="fa fa-twitter"></div>
              <div className="fa fa-instagram"></div>
              <div className="fa fa-youtube"></div>
              <div className="fa fa-reddit"></div>
            </SocialContainer>
          </LogoContainer>

          <FooterSect>
            <FooterTitles>About</FooterTitles>
            <Spacing>Overview</Spacing>
            <Spacing>Press</Spacing>
            <Spacing>Investors</Spacing>
          </FooterSect>
          <FooterSect>
            <FooterTitles>Connect</FooterTitles>
            <Spacing>FAQ</Spacing>
            <Spacing>Help</Spacing>
            <Spacing>Contact Us</Spacing>
          </FooterSect>
          <FooterSect>
            <FooterTitles>Company</FooterTitles>
            <Spacing>Terms</Spacing>
            <Spacing>Privacy Policy</Spacing>
            <Spacing>Careers</Spacing>
          </FooterSect>
          <Copyright>© Copyright - Express Groomer </Copyright>
        </Footer>
      </FadeIn>
    </div>
  );
};

export default HomePage;
