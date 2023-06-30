import { ReactNodeLike } from 'prop-types';

import rocket from '../../../images/icons/rocket.svg';
import sparkles from '../../../images/icons/sparkles.svg';
import bankNotes from '../../../images/icons/bankNotes.svg';

import classes from './featureCard.module.css';

const ICONS = {
  rocket: rocket,
  sparkles: sparkles,
  banknotes: bankNotes
};

type FeatureCardProps = {
  image: keyof typeof ICONS;
  heading: string;
  content: ReactNodeLike;
};

export default function FeatureCard(props: FeatureCardProps) {
  return (
    <div className={ classes.cardDiv }>
      <div className={ classes.headContent }>
        <h3 className={ classes.heading }>{ props.heading }</h3>

        <img className={ classes.image } src={ ICONS[props.image] } alt="icon" />
      </div>

      <p className={ classes.content }>{ props.content }</p>
    </div>
  );
}
