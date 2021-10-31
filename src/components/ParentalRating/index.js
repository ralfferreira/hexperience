import React, { useEffect, useState } from "react";

import FreeIcon from '../../assets/img/freeicon.png';
import TenYearsIcon from '../../assets/img/tenyearsicon.png';
import TwelveYearsIcon from '../../assets/img/twelveyearsicon.png';
import FourteenYearsIcon from '../../assets/img/fourteenyearsicon.png';
import SixteenYearsIcon from '../../assets/img/fourteenyearsicon.png';
import EighteenYearsIcon from '../../assets/img/eighteenyearsicon.png';

import { ParentalRatingImg } from "./styles";

const ParentalRating = ({ age }) => {
  const [parentalRatingIcon, setParentalRatingIcon] = useState(FreeIcon);

  useEffect(() => {
    if (age >= 18) {
      setParentalRatingIcon(EighteenYearsIcon);
      return;
    }

    if (age >= 16) {
      setParentalRatingIcon(SixteenYearsIcon);
      return;
    }

    if (age >= 14) {
      setParentalRatingIcon(FourteenYearsIcon);
      return;
    }

    if (age >= 12) {
      setParentalRatingIcon(TwelveYearsIcon);
      return;
    }

    if (age >= 10) {
      setParentalRatingIcon(TenYearsIcon);
      return;
    }
  }, []);

  return (
    <ParentalRatingImg source={parentalRatingIcon} />
  );
};

export default ParentalRating;