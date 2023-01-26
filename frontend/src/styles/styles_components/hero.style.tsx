import styled from 'styled-components';

export const Screen = styled.div`
  position: relative;
  width: 100vw;
  color: antiquewhite;
  
  image {
    object-fit: cover;
  }
  
  .hero-title {
    background-color: darkred;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    font-weight: 900;
  }
`;