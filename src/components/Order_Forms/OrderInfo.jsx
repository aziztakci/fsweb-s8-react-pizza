import styled from "styled-components";

const InfoWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const ButtonHome = styled.button`
  background: none;
  border: none;
  padding: 0;
  color: #000000;
  cursor: pointer;
  font-family: "Barlow", sans-serif;
  font-size: 16px;
  font-weight: medium;

  &:hover {
    background-color: #f38383;
    border-radius: 10px;
    text-decoration: underline;
  }
`;
const HeaderImg = styled.img`
display: block;
  margin: 0 auto 48px;
  transform: translateX(-30px);
  @media (max-width: 768px) {
  display: block;
  transform: translateX(-5px);
    min-width: 100%; 
    max-width: 100%;
    padding: 0 30px; 
`;
const DivNav = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DivSpan = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 55px;
`;
const Span = styled.span`
  font-size: 28px;
  font-family: "Barlow", sans-serif;
  font-weight: bold;
`;
const Title = styled.h1`
  font-size: 22px;
  font-family: "Barlow", sans-serif;
  font-weight: medium;
`;
const Info = styled.p`
  font-size: 16px;
  font-family: "Barlow", sans-serif;
  line-height: 30px;
`;

export default function OrderInfo(props) {
  const { setActivePage } = props;
  return (
    <InfoWrapper className="order-info">
      <HeaderImg
        src="/assets/form-banner2.png"
        alt=""
      />
      <div>
        <nav className="page-buttons">
          <ButtonHome
            data-cy="btnHome"
            className="page-btn"
            onClick={() => setActivePage("home")}
          >
            Anasayfa
          </ButtonHome>
          <span className="page-seperator"> - </span>
          <span
            className="page-active"
            style={{ color: "red", fontWeight: "bold" }}
          >
            Sipariş Oluştur
          </span>
        </nav>
      </div>
      <Title>Position Absolute Acı Pizza</Title>
      <DivNav>
        <Span>85.50₺</Span>
        <DivSpan>
          <span>4.9</span>
          <span>(200)</span>
        </DivSpan>
      </DivNav>
      <Info className="order-info-text">
        Frontent Dev olarak hala position:absolute kullanıyorsan bu çok acı
        pizza tam sana göre. Pizza, domates, peynir ve genellikle çeşitli diğer
        malzemelerle kaplanmış, daha sonra geleneksel olarak odun ateşinde bir
        fırında yüksek sıcaklıkta pişirilen, genellikle yuvarlak, düzleştirilmiş
        mayalı buğday bazlı hamurdan oluşan İtalyan kökenli lezzetli bir
        yemektir. . Küçük bir pizzaya bazen pizzetta denir.
      </Info>
    </InfoWrapper>
  );
}
