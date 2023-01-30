import React, { useEffect } from 'react'
import MetaData from '../Utils/MetaData'

const About = () => {

  useEffect(() => {
    window.scrollTo({top:0,behavior:"smooth"});
  }, [])

  return (
    <>
      <MetaData title='AboutUs'/>
      <div className='mt-20 font-[Poppins]'>
        <div className={`h-60 bg-[url(Images/bg-01.jpg)] bg-center flex justify-center items-center`}>
            <h1 className="text-5xl font-black text-white">About</h1>
        </div>
        <div className="flex justify-center font-[Poppins] pt-16 pb-12 text-[13px] px-2">
          <div className="max-w-[1195px] w-full grid grid-cols-1 tablet:grid-cols-2 lg:grid-cols-[2fr_1fr] gap-12 lg:gap-24">
            <div className="flex flex-col gap-8 text-[15px]">
              <h1 className="capitalize text-2xl font-black">Our Story</h1>
              <p className="text-text-Grey text-sm leading-6 text-sm leading-6">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris consequat consequat enim, non auctor massa ultrices non. Morbi sed odio massa. Quisque at vehicula tellus, sed tincidunt augue. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas varius egestas diam, eu sodales metus scelerisque congue. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas gravida justo eu arcu egestas convallis. Nullam eu erat bibendum, tempus ipsum eget, dictum enim. Donec non neque ut enim dapibus tincidunt vitae nec augue. Suspendisse potenti. Proin ut est diam. Donec condimentum euismod tortor, eget facilisis diam faucibus et. Morbi a tempor elit.
              </p>
              <p className="text-text-Grey text-sm leading-6 text-sm leading-6">
                  Donec gravida lorem elit, quis condimentum ex semper sit amet. Fusce eget ligula magna. Aliquam aliquam imperdiet sodales. Ut fringilla turpis in vehicula vehicula. Pellentesque congue ac orci ut gravida. Aliquam erat volutpat. Donec iaculis lectus a arcu facilisis, eu sodales lectus sagittis. Etiam pellentesque, magna vel dictum rutrum, neque justo eleifend elit, vel tincidunt erat arcu ut sem. Sed rutrum, turpis ut commodo efficitur, quam velit convallis ipsum, et maximus enim ligula ac ligula.
              </p>

              <p className="text-text-Grey text-sm leading-6 text-sm leading-6">
                Any questions? Let us know in store at 8th floor, 379 Hudson St, New York, NY 10018 or call us on (+1) 96 716 6879
              </p>
            </div>
            <div className="flex justify-center items-center pl-1 pr-5">
              <div className="w-[170px] border-solid border-[3px] border-grey3 grow shrink">
                <img src={'/Images/about-01.jpg'} alt="" className="translate-x-5 -translate-y-5 w-full"/>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center font-[Poppins] pt-8 pb-20 text-[13px]  px-2">
          <div className="max-w-[1195px] w-full grid  grid-cols-1 tablet:grid-cols-2 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-24">
            <div className="flex justify-center items-center pr-1 pl-5 row-start-2 row-end-3 tablet:row-start-1 tablet:row-end-2">
              <div className="w-[170px] border-solid border-[3px] border-grey3 grow shrink">
                <img src={'/Images/about-02.jpg'} alt="" className="-translate-x-5 -translate-y-5 w-full" />
              </div>
            </div>
            <div className="flex flex-col gap-8 text-[15px]">
              <h1 className="capitalize text-2xl font-black">Our Mission</h1>
              <p className="text-text-Grey text-sm leading-6">
                Mauris non lacinia magna. Sed nec lobortis dolor. Vestibulum rhoncus dignissim risus, sed consectetur erat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam maximus mauris sit amet odio convallis, in pharetra magna gravida. Praesent sed nunc fermentum mi molestie tempor. Morbi vitae viverra odio. Pellentesque ac velit egestas, luctus arcu non, laoreet mauris. Sed in ipsum tempor, consequat odio in, porttitor ante. Ut mauris ligula, volutpat in sodales in, porta non odio. Pellentesque tempor urna vitae mi vestibulum, nec venenatis nulla lobortis. Proin at gravida ante. Mauris auctor purus at lacus maximus euismod. Pellentesque vulputate massa ut nisl hendrerit, eget elementum libero iaculis
              </p>
              <div className="text-text-Grey leading-relaxed border-solid border-l-2 border-grey3">
                <p className="ml-4 md:ml-8 italic">
                  Creativity is just connecting things. When you ask creative people how they did something, they feel a little guilty because they didn't really do it, they just saw something. It seemed obvious to them after a while.
                </p>
                <p className="ml-8 mt-3 text-sm">- Steve Jobs</p>
              </div>
            </div>
          </div>
        </div>
    </div>
    </>
  )
}

export default About