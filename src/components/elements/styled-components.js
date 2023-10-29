import styled from 'styled-components'

export const themeObj = {
  grey: {
    0: '#FFFFFF',
    100: '#F9FAFB',
    200: '#F4F6F8',
    300: '#DFE3E8',
    400: '#C4CDD5',
    500: '#919EAB',
    600: '#637381',
    700: '#454F5B',
    800: '#212B36',
    900: '#161C24',
  },
  font_size: {
    size1: '54px',
    size2: '32px',
    size3: '28px',
    size4: '24px',
    size5: '20px',
    size6: '18px',
    size7: '16px',
    size8: '14px',
    size9: '12px',
    size10: '10px',
    size11: '8px',
  }
}

export const Row = styled.div`
display: flex;
`
export const Col = styled.div`
display: flex;
flex-direction:column;
`
export const RowMobileColumn = styled.div`
display: flex;
@media (max-width:1000px) {
    flex-direction:column;
}
`
export const Title = styled.h1`
margin: 5rem auto 1rem auto;
font-size:${themeObj.font_size.size1};
font-weight:bold;
@media (max-width:1000px) {
  font-size:${themeObj.font_size.size3};
}
`
export const Title2 = styled.h2`
margin: 1rem auto;
font-size:${themeObj.font_size.size3};
font-weight:bold;
@media (max-width:1000px) {
  font-size:${themeObj.font_size.size5};
}
`
export const Title3 = styled.h3`
margin: 1rem auto;
font-size:${themeObj.font_size.size5};
font-weight:bold;
@media (max-width:1000px) {
  font-size:${themeObj.font_size.size7};
}
`
export const SideTitle = styled.div`
margin: 1rem auto 1rem 0;
font-size:${themeObj.font_size.size3};
font-weight:bold;
`
export const Wrappers = styled.div`
max-width:1200px;
margin:0 auto;
padding-bottom:8rem;
width:90%;
display: flex;
flex-direction: column;
`