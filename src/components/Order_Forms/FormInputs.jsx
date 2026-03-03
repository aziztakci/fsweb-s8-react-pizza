import { useEffect, useState } from "react";
import axios from "axios";
import CheckBox from "./CheckBox";
import SelectButton from "./SelectButton";
import OrderInfo from "./OrderInfo";
import RadioButtons from "./RadioButtons";
import OrderTextarea from "./OrderTextarea";
import OrderCount from "./OrderCount";
import SummaryBox from "./SummaryBox";
import styled from "styled-components";
import NameTag from "./NameTag";

const nameRegex = /^[a-zA-ZğüşıöçĞÜŞİÖÇ]{2,}\s+[a-zA-ZğüşıöçĞÜŞİÖÇ]{2,}/;

const FormArea = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const SectionBg = styled.section`
  background-color: #ffffff !important;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const ContentSizer = styled.div`
  max-width: 532px;
  min-width: 532px;
  display: flex;
  flex-direction: column;
  margin: 0 auto 20px;

  @media (max-width: 768px) {
    min-width: 80%;
    padding: 0 30px;
  }
`;

const DivSelection = styled.div`
  margin: 40px 0;
  display: flex;
  justify-content: space-between;
`;

const DivSummary = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  align-items: flex-start;

  @media (max-width: 768px) {
  }
`;

const Pmedia = styled.p`
  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;

export default function FormInputs(props) {
  const { setActivePage, initialFormData, setFormData, formData, setApiData } =
    props;

  const [errors, setErrors] = useState({ name: "" });
  const [toppings, setToppings] = useState([]);

  const isValidNameFormat = (nameValue) => {
    const trimmed = nameValue.trim();
    return trimmed.length >= 5 && nameRegex.test(trimmed);
  };

  const isNameValid = () => {
    const isValid = isValidNameFormat(formData.name);
    if (!isValid) {
      setErrors({
        name: "Lütfen adınızı ve soyadınızı aralarında boşluk bırakarak giriniz!",
      });
    } else {
      setErrors({ name: "" });
    }
    return isValid;
  };

  const isFormInvalid =
    formData.selectedToppings.length < 4 ||
    formData.selectedToppings.length > 10 ||
    !formData.size ||
    !formData.dough;

  const isButtonDisabled = isFormInvalid || !isValidNameFormat(formData.name);
  // [DEPRECATED]: Reqres API key is expired. 
  // Kept for architectural demonstration, but no longer used in the request.
  // const api_key = import.meta.env.VITE_REQRES_API_KEY || 'reqres-free-v1';
  const handleSubmit = (event) => {
    event.preventDefault();

    if (isNameValid() && !isFormInvalid) {
      const allData = {
        name: formData.name,
        size: formData.size,
        dough: formData.dough,
        num: formData.num,
        note: formData.note,
        toppings: formData.selectedToppings,
        toppingPrice: formData.selectedToppings.length * 5 * formData.num,
        totalPrice: finalTotal,
      };

      // [UPDATE]: Switched from Reqres to JSONPlaceholder due to CORS and 402/403 errors.
      // Headers removed as JSONPlaceholder is a public testing API.

      axios
        .post("https://jsonplaceholder.typicode.com/posts", allData) 
  .then((res) => {
          setApiData(res.data);
          setActivePage("success");
          setFormData(initialFormData);
          setErrors({ name: "" });
          console.log(res.data);
          console.log(res.status);
        })
        .catch((err) => console.error(err));
    }
  };

  useEffect(() => {
    axios
      .get("/mockToppings.json")
      .then((res) => setToppings(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (event) => {
    const { name, type, value, checked } = event.target;

    if (type === "checkbox") {
      if (checked) {
        if (formData.selectedToppings.length < 10) {
          setFormData({
            ...formData,
            selectedToppings: [...formData.selectedToppings, name],
          });
        }
      } else {
        setFormData({
          ...formData,
          selectedToppings: formData.selectedToppings.filter(
            (item) => item !== name,
          ),
        });
      }
    } else {
      setFormData({ ...formData, [name]: value });

      if (name === "name") {
        if (!isValidNameFormat(value)) {
          setErrors({
            name: "Lütfen adınızı ve soyadınızı aralarında boşluk bırakarak giriniz!",
          });
        } else {
          setErrors({ name: "" });
        }
      }
    }
  };

  const increaseNum = () => setFormData({ ...formData, num: formData.num + 1 });
  const decreaseNum = () => {
    if (formData.num > 1) setFormData({ ...formData, num: formData.num - 1 });
  };

  const toppingsPrice = formData.selectedToppings.length * 5;
  const finalTotal = (85.5 + toppingsPrice) * formData.num;

  return (
    <FormArea onSubmit={handleSubmit}>
      <ContentSizer>
        <OrderInfo setActivePage={setActivePage} />
      </ContentSizer>

      <SectionBg>
        <ContentSizer>
          <DivSelection>
            <RadioButtons
              handleChange={handleChange}
              selectedSize={formData.size}
            />
            <SelectButton
              handleChange={handleChange}
              selectedDough={formData.dough}
            />
          </DivSelection>

          <CheckBox
            toppings={toppings}
            selectedToppings={formData.selectedToppings}
            handleTopChange={handleChange}
          />

          {formData.selectedToppings.length < 4 && (
            <Pmedia
              data-cy="checkbox-error-message"
              style={{
                color: "red",
                fontSize: "14px",
                fontFamily: "roboto",
                fontWeight: "500",
              }}
            >
              En az 4 malzeme seçiniz.
            </Pmedia>
          )}

          <NameTag
            name={formData.name}
            handleChange={handleChange}
            errors={errors}
          />

          <OrderTextarea note={formData.note} handleChange={handleChange} />

          <DivSummary className="order-footer">
            <OrderCount
              increaseNum={increaseNum}
              decreaseNum={decreaseNum}
              num={formData.num}
            />
            <SummaryBox
              num={formData.num}
              isNameValid={isNameValid}
              toppingsPrice={toppingsPrice}
              finalTotal={finalTotal}
              isFormInvalid={isFormInvalid}
              disabled={isButtonDisabled}
            />
          </DivSummary>
        </ContentSizer>
      </SectionBg>
    </FormArea>
  );
}
