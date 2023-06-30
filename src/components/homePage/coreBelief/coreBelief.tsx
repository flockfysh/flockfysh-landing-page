import CoreBeliefCard from '../coreBeliefCard/coreBeliefCard';
import SubHeading from '../../UI/subHeading/subHeading';

import classes from './coreBelief.module.css';

export default function CoreBelief() {
  return (
    <section className={ classes.coreBeliefSection }>
      <SubHeading beforeSpan="" span="Core" afterSpan=" Beliefs" />

      <div className={ classes.cardsGroup }>
        <CoreBeliefCard
          heading="Accessibility"
          subHeading="From large scale companies to the hobbyists who's ragtag experiments pave the way for innovation, we're here for you. Our tools are here to help you take your ideas and products to the next level."
        />

        <CoreBeliefCard
          heading="Customizability"
          subHeading="Our Machine Learning tools are built to serve a large variety of purposes and motivations. Whether you're a data scientist looking to finetune the low-level kinks, or just looking to get some cool data out, we strive to provide a seamless experience."
        />

        <CoreBeliefCard
          heading="Compatiblity"
          subHeading="Our tools are built with complete integratability in mind. Use all of your favorite ML tools seamlessly in tandem with flockfysh to energize your ML workflows."
        />
      </div>
    </section>
  );
}
