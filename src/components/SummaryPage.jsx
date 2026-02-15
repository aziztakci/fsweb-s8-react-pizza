import styled from "styled-components";

const LogoImg = styled.img`
  margin: 56px auto 70px;
  width: 363px;
  height: auto;
`;

const Title = styled.h3`
  font-size: 20px;
  font-family: "Barlow", sans-serif;
  font-weight: bold;
  color: #ffffff;
`;

const DivRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  font-size: 18px;
  font-family: "Barlow", sans-serif;
  font-weight: bold;
  color: #ffffff;
`;

const SectionContainer = styled.section`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  background-color: #ce2829;
`;

const StyledPYellow = styled.p`
  margin: 0;
  color: #fdc913;
  font-size: 32px;
  font-family: "satisfy", sans-serif;
`;

const TitleMain = styled.h1`
  color: #ffff;
  font-size: 86px;
  font-family: "roboto", sans-serif;
  font-weight: 300;
`;

const Line = styled.hr`
  border: none;
  border-top: 1px solid white;
  width: 100%;
  max-width: 620px;
  margin: 20px 0;
  opacity: 0.6;
`;

const PPizzaName = styled.p`
  margin: 10px 0 30px;
  font-size: 22px;
  font-family: "Barlow", sans-serif;
  font-weight: 400;
  color: #ffffff;
`;

const DivSuccessDetails = styled.div`
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  width: 200px;
  text-align: start;

  font-size: 16px;
  font-family: "Barlow", sans-serif;
  font-weight: 400;
  color: #ffffff;
`;
const DivPrice = styled.div`
margin-bottom: 30px;
  width: 350px;
  height: 197px;
  display: flex;
  flex-direction: column;
  border: 1px solid #d9d9d9;
  padding: 48.45px;
  border-radius: 6px 6px 0 0 ;

  @media (max-width: 768px) {
 margin-bottom: 50px;
  
`;

const ButtonHome = styled.button`
  border: none;
  margin-bottom: 170px;
  border-radius: 6px;
  font-size: 20px;
  font-family: "Barlow", sans-serif;
  font-weight: 400;
  color: #5f5f5f;
  padding: 5px 15px;

  @media (max-width: 768px) {
    margin-bottom: 50px;
  }
`;

export default function SummaryPage(props) {
  const { apiData, setActivePage } = props;
  return (
    <SectionContainer className="success-container">
      <LogoImg src="/assets/iteration-1/logo.svg" alt="logo" />
      <StyledPYellow>Lezzetin yolda</StyledPYellow>
      <TitleMain>SİPARİŞ ALINDI</TitleMain>
      <Line />

      <PPizzaName>Position Absolute Acı Pizza</PPizzaName>
      <DivSuccessDetails className="success-details">
        <p>
          Boyut: <span style={{ fontWeight: "700" }}>{apiData.size}</span>
        </p>
        <p>
          Hamur: <span style={{ fontWeight: "700" }}>{apiData.dough}</span>
        </p>
        <p>
          Ek Malzemeler:{" "}
          <span style={{ fontWeight: "700" }}>
            {apiData.toppings.join(", ")}
          </span>
        </p>
        <p>
          Sipariş Notu:{" "}
          <span style={{ fontWeight: "700" }}>
            {apiData.note ? apiData.note : "-"}
          </span>
        </p>
      </DivSuccessDetails>
      <DivPrice className="success-price">
        <Title>Sipariş Toplamı</Title>

        <DivRow className="summary-row">
          <span>Seçimler</span>
          <span>{apiData.toppingPrice.toFixed(2)}₺</span>
        </DivRow>

        <DivRow className="summary-row total" style={{ color: "#ffffff" }}>
          <span>Toplam</span>
          <span>{apiData.totalPrice.toFixed(2)}₺</span>
        </DivRow>
      </DivPrice>

      <ButtonHome data-cy="btnHomePage" onClick={() => setActivePage("home")}>
        Ana Sayfaya Dön
      </ButtonHome>
    </SectionContainer>
  );
}
