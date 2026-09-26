import car2007 from './assets/history/2007.jpg'
import car2008 from './assets/history/2008-edited.jpg'
import car2010 from './assets/history/2010-edited.jpg'
import car2013 from './assets/history/2013.jpg'
import car2014 from './assets/history/2014-768x619.jpg'
import car2016 from './assets/history/2016.jpg'
import car2020 from './assets/history/2020.jpg'

// Archive sources, retained for future updates:
// https://bulldogsracing.com/team-history
// https://bulldogsracing.com/the-team/previous-cars
// Source wording is preserved, including historical plans and original typos.
export const historyChapters = [
  {
    years: '2006–2008',
    title: 'From a seminar to a team.',
    text: 'The Bulldogs Racing team began in 2006, when Yale College seniors designed and constructed a car in a mechanical engineering design seminar to compete in the inaugural Formula SAE Hybrid Competition. The team evolved into a Yale Undergraduate Organization in 2008 to become Bulldogs Racing. Since then, we have grown by leaps and bounds to become a world-renowned racing team.',
  },
  {
    years: '2010–2013',
    title: 'International champions.',
    text: 'In 2010, our car won the GM Best Engineered Hybrid Systems Award (2nd place) and was a finalist in the design competition. Diligent development and careful work over the course of three years saw Bulldogs Racing field BR13. At the 2013 Formula SAE Hybrid competition, Bulldogs Racing became the international champions, posting the fastest times in all dynamic events and sweeping the Ford Most Efficient Hybrid Award (1st place), the Chrysler Innovation Award (1st place), and the GM Best Engineered Hybrid System Award (2nd place).',
  },
  {
    years: '2014–2020',
    title: 'An all-electric future.',
    text: 'After a 4th place finish in Formula SAE Hybrid 2014 with BR14, Bulldogs Racing decided to focus its attention and resources on electric drivetrains to further explore, experiment on and learn about the future of the automotive industry. Consequently, we embarked on a project to build an new all-electric race car, the BR16, which was the first all-electric vehicle built at Yale University. Following an unfortunate battery fire right before it was scheduled to compete, the BR16 was completely overhauled and additional safety features were included, leading to the development of the BR20 throughout the COVID-19 pandemic.',
  },
  {
    years: '2023 & beyond',
    title: 'Back on track.',
    text: 'In the spring of 2023, the BR20 raced in the Formula Hybrid + Electric competition at the New Hampshire Motor Speedway, where the team tied for 8th place in a field of 17. Taking the lessons that our current team has learned from our first competition in many years, we are currently developing our next all-electric race car, the BR25, with the aim of returning to New Hampshire in the spring of 2026.',
  },
]

// Add/remove/reorder entries here to maintain the car archive.
export const previousCars = [
  {
    year: '2007', image: car2007, alt: 'Team members working on Yale’s first Formula SAE car',
    paragraphs: [
      'Yale’s first entry into a Formula SAE competition. The project was conceived under the supervision of Professor John Morrell, within a senior mechanical design seminar.',
      'As a first-year entry, the car came in 3rd place overall and won the electric-only acceleration event at the inaugural Formula SAE Hybrid competition.',
    ],
  },
  {
    year: '2008', image: car2008, alt: 'The 2008 Bulldogs Racing car on track',
    paragraphs: [
      'The first car after the inception of Bulldogs Racing as a Yale Undergraduate Organization. It was a mixed success vis-à-vis the design criteria, but provided the team with invaluable experience at the 2007 Formula SAE Hybrid competition.',
      'Fun Fact: This car was designed to accommodate all the members of the team, including a 6’7” 300 lbs power lifter.',
    ],
  },
  {
    year: '2010', image: car2010, alt: 'BR10 beside orange cones at the track',
    paragraphs: [
      'BR10 was built upon the experience that the team gathered over the past two races, and am expanded knowledge of hybrid drivetrains.',
      'The car secured a 2nd place for the General Motors Award for Best Hybrid System Engineering.',
    ],
  },
  {
    year: '2013', image: car2013, alt: 'Team members with the championship-winning BR13',
    paragraphs: [
      'The year when it all come together: BR13 won the Formula SAE Hybrid 2013 competitions, posting the fastest times in all dynamic events and garnering the Ford Most Efficient Hybrid Award (1st place), the Chrysler Innovation Award (1st place), and the GM Best Engineered Hybrid System Award (2nd place).',
      'BR13 ran the 75m acceleration event in an incredible 5.283 seconds and posted an autocross time of 49.417 seconds.',
    ],
  },
  {
    year: '2014', image: car2014, alt: 'Team members guiding BR14 through the paddock',
    paragraphs: [
      'Bulldogs Racing fielded BR14 as the defending champion. Due to difficulties with the clutch system, the car could not use the full potential of its internal combustion engine, and came in 4th place at the 2014 Formula SAE Hybrid competition.',
      'The team decided to focus more on the electrical drivetrains for the next competition cycle in order to learn more about the latest technologies in the automotive industry.',
    ],
  },
  {
    year: '2016', image: car2016, alt: 'The all-electric BR16 displayed outdoors',
    paragraphs: [
      'BR16 was designed to emulate vintage race cars of yore, and was built as an all-electric vehicle, using a 180-Volt battery box and 2 Emrax 207 Motors.',
      'On the day prior to the competition, it experienced a battery fire that gutted the internals of the battery box and rendered it unable to race. This prompted a completed redesign of the car with additional safety features and performance improvements.',
    ],
  },
  {
    year: '2020', image: car2020, alt: 'Team members preparing the BR20 electric race car',
    paragraphs: [
      'BR20 is a completely redesigned and refurbished racecar built on top of BR16’s chassis. The chassis, battery box, dashboard, steering, electric systems and sensors have all been redesigned with durability, safety and performance in mind.',
      'It houses an electric drive train consisting of 2 Emrax 207 motors, and a 192V, 3.6 kWh battery pack.',
    ],
  },
]
