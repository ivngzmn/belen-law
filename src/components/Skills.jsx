import React from 'react';

// import skills data
import { skills } from '../data';

const Skills = () => {
  return (
    <section id='skills' className='section bg-[#f8f3eca1] pb-32'>
      <div className='container mx-auto text-center'>
        <h2 className='text-5xl font-primary font-extrabold mb-4'>
          What we do
        </h2>
        <div className='pt-5'>
          <p className='max-w-6xl text-left mx-auto px-6 lg:px-0 mb-[20px]'>
            The Law Office of Belen Gomez, APC is an immigration law practice.
            We provide personalized immigration law services including; filing
            family petitions packets, parole, lawful permanent residency,
            waivers, naturalization, U visas for victims of crimes, deferred
            action, and deportation defense before the Immigration court. We are
            dedicated and committed to providing quality representation and
            making sure you are fully informed.
          </p>
          <p className='max-w-6xl text-left mx-auto px-6 lg:px-0 mb-[60px]'>
            Immigration law can be complicated, and every case is unique. We
            want you to be empowered and have an accurate understanding of your
            rights and options under the law. Armed with this knowledge, you can
            make the best possible decisions for your future with the
            convenience of knowing that it is being handled by someone that
            truly knows and cares about your case.
          </p>
        </div>
        <span className='text-3xl font-primary font-extrabold'>
          You can expect:
        </span>
        <ul className='max-w-6xl text-left mx-auto list-disc list-inside py-10 px-8'>
          <li>
            A confidential consultation Quick, clear, and honest answers to your
            questions
          </li>
          <li>To be fully informed about your case</li>
          <li>Quality representation and advocacy</li>
          <li>
            Competitive flat fees – meaning you know what to expect to pay for
            your case.
          </li>
          <li>A payment plan may be available to you.</li>
        </ul>
        <div className='lg:grid lg:grid-cols-3 gap-12 py-10'>
          {skills.map((item, index) => {
            const { icon, title, description } = item;
            return (
              <div
                className='flex flex-col items-center justify-center mb-16 last:mb-0 lg:mb-0'
                key={index}
              >
                <img className='mb-6 w-16' src={icon} alt='' />
                <h4 className='text-2xl mb-2 font-primary font-bold text-[#D9AB79]'>
                  {title}
                </h4>
                <p className='max-w-[332px] lg:max-w-[350px]'>{description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
