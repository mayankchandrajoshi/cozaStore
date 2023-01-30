/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    screens: {
      'sm': '351px',
      'md':'576px',
      'tablet':'768px',
      'lg': '991px',
    },
    extend: {
      colors:{
        'bg-black':"#222222",
        'text-black':'rgb(51,51,51)',
        'Purple':'#717fe0',
        'Red':"#f74877",
        'bg-Grey':'rgb(102,102,102)',
        'text-Grey':"rgb(136,136,136)",
        'grey3':'#ccc',
        'CategoryCard-Blue':"rgba(103,117,214,0.8)"
      },
      keyframes: {
        fadeInDown: {
          '0%' : {
            opacity: 0,
            transform: 'translateY(-20px)',
          },
          '100%' : {
            opacity: 1,
            transform: 'translateY(0)',
          }
        },
        fadeInUp: {
          '0%' : {
            opacity: 0,
            transform: 'translateY(50px)',
          },
          '100%' : {
            opacity: 1,
            transform: 'translateY(0)',
          }
        },
        zoomIn: {
          '0%': {
            transform:'scale(0)',
            opacity:0
          },
          '100%': {
            transform: 'scale(1)',
            opacity:1
          }
        },
        rollIn : {
          '0%' : { opacity: 0 ,transform: 'translateX(-10%) translateY(500%) rotate(-120deg)'},
          '100%' : { opacity:1,transform: 'translateX(0px) translateY(0%) rotate(0deg)',}
       },
        lightSpeedIn: {
          '0%' :{
              transform: 'translateX(100%) skewX(-20deg)',
              opacity: 0,
            },
          '60% ':{
            transform: 'translateX(-5%) skewX(20deg)',
            opacity:1,
          },
          '80% ':{
            transform: 'translateX(0%) skewX(-10deg)',
            opacity:1,
          },
         '100%' : {
            transform: 'translateX(0%) skewX(0deg)',
            opacity: 1,
          },
        }
        ,
        slideInUp: {
          '0%' : {
            transform: 'translateY(100%)',
            opacity:0
          },
          '100%' : {
          transform: 'translateY(0)',
          opacity:1
          }
        }
        ,
       rotateInDown : {
        '0%' : {
          'transform-origin': 'left bottom',
          transform: 'rotate(-90deg)',
          opacity: 0,
       },
       '100%' : {
          'transform-origin': 'left bottom',
          transform: 'rotate(0)',
          opacity: 1, 
       }
       },
       rotateInUpRight : {
        '0%' : {
          'transform-origin': 'right bottom',
          transform: 'rotate(-90deg)',
          opacity: 0,
       },
       '100%' : {
          'transform-origin': 'right bottom',
          transform: 'rotate(0)',
          opacity: 1, 
       }
       },
       rotateIn : {
        '0%' : {
          transform:'rotate(-170deg)',
          opacity:0
        },
        '100%' : {
          transform : 'rotate(0deg)',
          opacity : 1
        }
       }
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ]
}