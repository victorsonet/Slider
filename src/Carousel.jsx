import { useEffect, useState } from "react";
import { shortList, list, longList } from "./data";
import { FaQuoteRight } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

function Carousel() {
  const [people, setPeople] = useState(longList);
  const [currentPerson, setCurrentPerson] = useState(0);

  function prevSlide() {
    if (currentPerson === 0) {
      setCurrentPerson(people.length - 1);
    } else {
      setCurrentPerson((oldPerson) => oldPerson - 1);
    }
  }

  function nextSlide() {
    if (currentPerson === people.length - 1) {
      setCurrentPerson(0);
    } else {
      setCurrentPerson((oldPerson) => oldPerson + 1);
    }
  }

  useEffect(() => {
    let sliderID = setInterval(() => {
      nextSlide();
    }, 2000);
    return () => {
      clearInterval(sliderID);
    };
  }, [currentPerson]);

  return (
    <section className="slider-container">
      {people.map(({ id, image, name, title, quote }, index) => {
        return (
          <article
            className="slide"
            style={{
              transform: `translateX(${100 * (index - currentPerson)}%)`,
              opacity: index === currentPerson ? 1 : 0,
              visibility: index === currentPerson ? "visible" : "hidden",
            }}
            key={id}
          >
            <img src={image} alt={name} className="person-img" />
            <h5 className="name">{name}</h5>
            <p className="title">{title}</p>
            <p className="text">{quote}</p>
            <FaQuoteRight className="icon" />
          </article>
        );
      })}
      <button type="button" className="prev" onClick={prevSlide}>
        <FiChevronLeft />
      </button>
      <button type="button" className="next" onClick={nextSlide}>
        <FiChevronRight />
      </button>
    </section>
  );
}
export default Carousel;
