import React from 'react';

const Contact = () => {
  return (
    <section id='contact' className='grid lg:grid-cols-2 md:grid-cols-1'>
      {/* contact us section */}
      <div className='py-16 px-4 bg-primary text-white w-full mx-auto text-center'>
        <h2 className='text-5xl font-primary font-extrabold mb-4'>
          Contact us
        </h2>

        {/* form */}
        <form className='px-8 lg:px-0 max-w-[600px] mx-auto flex flex-col space-y-6 mb-[46px]'>
          <label className='text-left' for='name'>
            Full name
          </label>
          <input
            id='name'
            className='form-control'
            type='text'
            placeholder='Full name'
          />
          <label className='text-left' for='name'>
            Email address
          </label>
          <input
            className='form-control'
            type='text'
            placeholder='Email address'
          />
          <label className='text-left' for='name'>
            Tell us about your case or question / Cuentenos de su caso o
            pregunta:
          </label>
          <textarea className='textarea' placeholder='Message'></textarea>
          <p className='max-w-[38rem] mx-auto px-6 text-left lg:px-0 pb-3'>
            Consultation appointments are available with the attorney for a
            discounted hourly fee of $120. Would you like us to contact you to
            schedule your appointment? / Las citas de consulta están disponibles
            con la abogada por una tarifa por hora con descuento de $120. ¿Desea
            que nos comuniquemos con usted para programar su cita?
          </p>
          <div className='flex max-w-[38rem] text-left pb-3 flex-col'>
            <div>
              <input type='radio' id='yes' name='drone' value='yes' checked />
              <label for='yes'>Yes</label>
            </div>
            <div>
              <input type='radio' id='no' name='drone' value='no' />
              <label for='no'>No</label>
            </div>
          </div>
          <button className='btn bg-accent hover:bg-accent-hover transition-all'>
            Send Message
          </button>
        </form>
      </div>

      {/* office locations section */}
      <div className='w-full py-16 px-4 mx-auto text-center min-h-[732px] bg-[#e0c8ac]'>
        <h2 className='text-5xl font-primary font-extrabold mb-4'>
          Office locations
        </h2>
        <div className='flex flex-col justify-self-center'>
          <h3 className='text-3xl pb-4'>Riverside, CA</h3>
          <p>
            3579 Arlington, Ave, Ste 900, <br /> Riverside, CA 92506
          </p>
          <div className=' px-4 text-lg text-primary font-semibold pb-6'>
            <a className='' href='tel:+1(714) 449-1581'>
              (951) 299-0114
            </a>
          </div>
          <iframe
            className='w-full h-[32rem] mt-2 px-4 lg:px-10'
            title='Riverside Office'
            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3309.78127176057!2d-117.39370564835426!3d33.946753380539775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dcb1630df79f03%3A0x972d1691fbbb2364!2sLaw%20Office%20of%20Belen%20Gomez!5e0!3m2!1sen!2sus!4v1655448019439!5m2!1sen!2sus'
            width='600'
            height='450'
            style={{ border: 0 }}
            allowfullscreen=''
            loading='lazy'
            referrerpolicy='no-referrer-when-downgrade'
          ></iframe>
          <h3 className='text-3xl py-4'>Anaheim, CA</h3>
          <p>
            2400 E Katella Ave Ste 800, <br /> Anaheim, CA 92806
          </p>

          <div className=' px-4 text-lg text-primary font-semibold  pb-6'>
            <a className='' href='tel:+1(714) 449-1581'>
              (714) 449-1581
            </a>
          </div>
          <iframe
            className='w-full h-[32rem] mt-2 px-4 lg:px-10'
            title='Anaheim Office'
            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3315.3007845154475!2d-117.88454024835647!3d33.80455018057906!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dcd5f628c520ad%3A0x47371182cfb2e7c2!2sLaw%20Office%20of%20Belen%20T.%20Gomez!5e0!3m2!1sen!2sus!4v1655447816672!5m2!1sen!2sus'
            width='600'
            height='450'
            style={{ border: 0 }}
            allowfullscreen=''
            loading='lazy'
            referrerpolicy='no-referrer-when-downgrade'
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Contact;
