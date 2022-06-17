import React from 'react';

// import team data
import { team } from '../data';

const Team = () => {
  return (
    <section id='team' className='section'>
      <div className='container mx-auto text-center'>
        <h2 className='text-5xl font-primary font-extrabold mb-10'>
          About Attorney
        </h2>
        <div className='max-w-6xl text-left mx-auto px-6 lg:px-0 mb-10'>
          <p className='pb-5'>
            Bilingual attorney dedicated to obtaining access to the American
            Dream through immigration and estate planning by providing
            personalized representation with dignity.
          </p>
          <p className='pb-5'>
            Owner of the Law Office of Belen Gomez, APC, where she has been
            providing Immigration Law services for almost ten years, and more
            recently has added Estate Planning to its practice. Specializing in
            immigration law, it’s mission is to help non-citizens and families
            achieve the American dream through work cards, permanent residency
            and citizenship. After starting her own family, Attorney Gomez saw
            the importance of adding Estate Planning to the practice, so that
            our communities could protect their family and everything they work
            for.
          </p>
          <p className='pb-5'>
            Attorney Gomez received her Bachelor’s from UC Riverside in History
            and Political Science – International Relations. She attended
            Southwestern Law School and is licensed by the Supreme Court in
            California. She has worked at non-profits – demonstrating a
            commitment to helping survivors of various crimes obtain their visas
            and green cards. Assisted in the founding of the Immigration Clinic
            at Western State Law School in Fullerton, California. Volunteers at
            community citizenship/ DACA workshops, has given individual
            consultations at Legal Orientation Programs at immigration detention
            facilities in Orange County. Conducts immigrant rights trainings and
            educational forums. She has offices in Orange County and Riverside.
          </p>
          <p className='pb-5'>
            As the Founder of Law Office of Belen Gomez, she has been successful
            in various complex immigration matters, including stopping
            deportations due to over stepping by ICE officers, obtaining u visas
            and residency for victims of crimes, and getting many folks lawful
            permanent residency without having to leave the country as well as
            preparing clients for appointments abroad while minimizing possible
            risks involved.
          </p>
        </div>

        <div className='mx-auto max-w-6xl'>
          {team.map((item, index) => {
            const { image, name, position, description } = item;
            return (
              <div className='text-center lg:text-left mb-12' key={index}>
                <img className='mx-auto lg:mx-0' src={image} alt='' />
                <p className='text-sm font-bold text-[#D9AB79] my-6 text-left lg:pl-0 pl-20'>
                  Read full Article
                  <a href='https://issuu.com/sandiegoattorneyjournal/docs/aj-oc_feb21_v180_fullissue_digital'>
                    San Diego Attorney Journal
                  </a>
                </p>
                <h4 className='text-2xl mb-2 font-primary font-bold'>{name}</h4>
                <p className='text-sm uppercase tracking-[0.3px] mb-4 opacity-[0.8]'>
                  {position}
                </p>
                <p className='max-w-2xl text-left mx-auto lg:mx-0 lg:px-0 px-6'>
                  {description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Team;
