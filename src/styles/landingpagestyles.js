import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.125rem;
  margin-top: 75px;
  margin-bottom: 75px;

  @media screen and (max-width: 600px) {
    font-size: 1.125rem;
  }
  @media screen and (max-width: 1100px) and (min-width: 600px) {
    font-size: 1rem;
  }
`;

export const Title = styled.div`
  font-size: 4.25rem;
  display: flex;
  justify-content: center;
  font-family: 'Lobster', cursive;
  @media screen and (max-width: 600px) {
    font-size: 2.75rem;
    margin-top: 15px;
    margin-bottom: 0px;
  }
`;

export const SecondTitle = styled.div`
  font-size: 2.5rem;
  font-family: 'Poppins', sans-serif;
  @media screen and (max-width: 600px) {
    font-size: 1.25rem;
    margin: 5px;
    margin-bottom: 0px;
    text-align: center;
  }
`;

export const SectionOne = styled.div`
  width: 50%;
  height: 414px;
  padding: 20px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  margin-right: 30px;
  @media screen and (max-width: 600px) {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 100%;
    margin: 10px;
    padding: 10px;
  }
`;

export const SectionTwo = styled.div`
  width: 50%;
  height: 520px;
  padding: 20px;
  margin-top: 10px;
  position: relative;
  @media screen and (max-width: 600px) {
    display: none;
  }
`;

export const SectionThree = styled.div`
  width: 50%;
  height: 414px;
  padding: 20px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  margin-right: 30px;
  @media screen and (max-width: 600px) {
    display: none;
  }
`;

export const SectionFour = styled.div`
  width: 50%;
  height: 520px;
  padding: 20px;
  margin-top: 10px;
  @media screen and (max-width: 600px) {
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 90%;
    margin: 0px;
    padding: 0px;
    font-size: 1.125rem;
  }
`;

export const IntroImage1 = styled.img`
  position: absolute;
  right: 10px;
  top: 10px;
  border-radius: 50%;
  width: 85%;
  height: auto;
`;

export const IntroImage2 = styled.img`
  position: absolute;
  left: 10px;
  top: 250px;
  border-radius: 50%;
  width: 40%;
  height: auto;
`;

export const Section = styled.div`
  background-color: white;
  border-radius: 10px;
  border: none;
  width: 85%;
  margin-top: 15px;
  height: 650px;
  margin-bottom: 15px;
  @media screen and (max-width: 450px) {
    width: 90%;
    margin-top: -10px;
    margin-bottom: -10px;
    height: 550px;
  }
`;

export const Row = styled.div`
  width: 33%;
  padding: 20px;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  margin-right: 10px;
  margin-left: 10px;
  @media screen and (max-width: 600px) {
    font-size: 1.125rem;
    border-radius: 10px;
    padding: 0;
    margin: 30px;
    margin-bottom: 2.5px;
    width: 100%;
    display: flex;
    text-align: center;
    justify-content: center;
  }
`;

export const HiddenRow = styled.div`
  width: 33%;
  padding: 20px;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  margin-right: 10px;
  margin-left: 10px;
  @media screen and (max-width: 600px) {
    display: none;
  }
`;

export const CenterDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const MediumPara = styled.div`
  font-size: 1.25rem;
  margin-top: 20px;
  margin-bottom: 30px;
  @media only screen and (max-width: 600px) {
    font-size: 1.125rem;
    margin-top: 10px;
    margin-bottom: 20px;
  }
  @media screen and (max-width: 1100px) and (min-width: 600px) {
    font-size: 1.125rem;
  }
`;
export const Button = styled.button`
  color: white;
  background-color: #1ea7fd;
  border: none;
  border-radius: 10px;
  padding: 10px;
  padding-top: 7.5px;
  padding-bottom: 7.5px;
  width: 170px;
  outline: none;
`;

export const Blue = styled.span`
  color: #1ea7fd;
  font-weight: 900;
`;

export const SpacedDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  margin-top: 50px;
  @media screen and (max-width: 600px) {
    margin-top: 20px;
  }
`;
export const BlueExpress = styled.span`
  font-family: 'Lobster', cursive;
  color: black;
  margin-top: -5%;
  margin-left: 5px;
  margin-right: 5px;
  @media screen and (max-width: 600px) {
    margin-bottom: 0px;
  }
`;

export const Footer = styled.footer`
  background-color: black;
  height: 265px;
  display: flex;
  justify-content: space-around;
  position: relative;
  @media screen and (max-width: 600px) {
    font-size: 1.125rem;
    margin-top: 15px;
    margin-bottom: 25px;
    display: flex;
    justify-content: center;
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 600px) {
    position: absolute;
    top: 5px;
    margin-bottom: 10px;
  }
`;

export const SocialContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  color: white;
  font-size: 2rem;
  @media screen and (max-width: 600px) {
    font-size: 1.125rem;
  }
`;

export const Logo = styled.div`
  color: white;
  font-size: 4em;
  padding: 0.25em;
  border-radius: 10px;
  font-family: 'Lobster', cursive;
  @media screen and (max-width: 600px) {
    font-size: 1.5rem;
  }
`;

export const FooterTitles = styled.span`
  margin-top: 30px;
  font-size: 1.55rem;
  font-weight: 700;
  color: white;
  @media screen and (max-width: 600px) {
    font-size: 1.125rem;
    margin-top: 15px;
  }
`;

export const FooterSect = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  font-size: 1.125rem;
  @media screen and (max-width: 600px) {
    font-size: 1.125rem;
    margin-top: 20px;
    width: 120px;
    padding-top: 50px;
  }
`;
export const Copyright = styled.div`
  font-size: 0.5 rem;
  display: flex;
  flex-direction: column-reverse row-reverse;
  color: white;
  position: absolute;
  top: 200px;
  @media screen and (max-width: 600px) {
    padding-top: 20px;
    font-size: 0.75rem;
  }
`;

export const GroomerImg = styled.img`
  border-radius: 10px;
  height: auto;
  margin: auto;
  width: 75%;
`;

export const GroomerText = styled.div`
  @media screen and (max-width: 600px) {
    font-size: 1rem;
    margin-top: -10px;
    margin-bottom: -20px;
  }
`;

export const Spacing = styled.div`
  margin-bottom: 5px;
  @media screen and (max-width: 600px) {
    margin-bottom: 2.5px;
  }
`;

export const Caption = styled.div`
  margin: 15px;
  margin-left: 45px;
  margin-right: 45px;
`;

export const Poodle = styled.img`
  border-radius: 50%;
  width: 100%;
  height: auto;
  @media screen and (max-width: 600px) {
    display: none;
  }
`;

export const SpacingLeft = styled.div`
  margin: 25px;
  margin-bottom: 10px;
  color: #1ea7fd;
  font-weight: 900;
  font-size: 2rem;
  display: flex;
  flex-direction: row;
  @media screen and (max-width: 600px) {
    font-size: 1.25rem;
    margin-top: 30px;
  }
`;

export const SpacingRight = styled.div`
  margin: 25px;
  color: #1ea7fd;
  font-weight: 900;
  font-size: 2rem;
  display: flex;
  flex-direction: row-reverse;
  @media screen and (max-width: 600px) {
    font-size: 1.25rem;
    margin-bottom: 30px;
  }
`;
