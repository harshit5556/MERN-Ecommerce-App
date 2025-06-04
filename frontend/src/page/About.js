import React, { useEffect } from 'react';

const About = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="bg-gray-50 text-gray-800 px-6 py-10 min-h-screen font-sans">
      <div className="max-w-6xl mx-auto space-y-14">

        {/* Hero Section */}
        <section className="text-center">
          <h1 className="text-5xl font-extrabold text-green-700 mb-4">About EcoMarket</h1>
          <p className="text-lg text-gray-600 mb-8">Delivering Freshness at Your Doorstep — From Farms to Families</p>
        <div className='h-12px'>
        <img
            src="https://www.jbtc.com/foodtech/wp-content/uploads/sites/2/2021/08/Fresh-Produce-Collage.jpg"
            alt="Fresh produce"
            className="rounded-xl mx-auto shadow-sm w-90 max-w-2xl"
          />
        </div>
        </section>

        {/* Brand Story */}
        <section className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            <p className="mb-3">In 2021, the seed for <strong>EcoMarket</strong> was planted. Our founders noticed a gap in access to fresh food during the pandemic. That spark led to a mission to deliver farm-fresh fruits, veggies, and delicious meals like pizza and burgers right to your doorstep.</p>
            <p className="mb-3">From a single vegetable order to serving thousands, our journey is one of care, community, and commitment. We started with local farmers, built our delivery network, and launched our first mobile app in 2022.</p>
            <p>And we’re just getting started!</p>
          </div>
          <img
            src="https://uexcelerate.com/wp-content/uploads/2023/07/Coaching-Can-Empower-Your-Startup-Journey.jpg"
            alt="Startup journey"
            className="rounded-lg shadow-lg"
          />
        </section>

        {/* Mission, Vision & Goals */}
        <section className="bg-white p-6 md:p-10 rounded-xl shadow-md">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Mission, Vision & Values</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Mission:</strong> Make healthy food accessible and affordable for all.</li>
              <li><strong>Vision:</strong> To be India’s most loved food delivery brand.</li>
              <li><strong>Goal:</strong> Deliver 1M+ meals and empower 10K+ local sellers by 2026.</li>
            </ul>
            <ul className="list-disc pl-6 space-y-2">
              <li>Eco-conscious packaging</li>
              <li>Fast, farm-fresh delivery</li>
              <li>Support for local farmers & chefs</li>
              <li>Community-centered innovation</li>
            </ul>
          </div>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHQ7Tt4uvULoIUjb5w6mz4Av1Y2_ItUhIwwg&s"
            alt="Mission image"
            className="mt-6 rounded-lg w-full object-cover max-h-80"
          />
        </section>

        {/* Milestones & Timeline */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-center">Our Journey</h2>
          <div className="space-y-6">
            {[
              {
                title: '🌱 2021: The Idea Sparked',
                text: 'We came up with the idea for EcoMarket during COVID-19, seeing the need for safe grocery delivery.',
                img: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314',
              },
              {
                title: '🎯 2023: 1K+ Orders Completed',
                text: 'Our team grew, our users loved us, and we crossed 1000 successful deliveries with 5-star ratings!',
                img: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092',
              },
              {
                title: '🏆 2024: Award-Winning Growth',
                text: 'We were honored as "Emerging Startup of the Year" at FoodTech India.',
                img: 'https://static.vecteezy.com/system/resources/previews/032/312/670/non_2x/business-winner-achievement-or-prize-success-or-victory-challenge-or-business-mission-career-goal-or-stair-to-success-concept-businessman-professional-step-up-growing-bar-graph-to-win-the-trophy-vector.jpg',
              },
            ].map((milestone, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow flex flex-col md:flex-row gap-6 items-center"
              >
                <img
                  src={milestone.img}
                  alt={milestone.title}
                  className="w-full md:w-1/3 rounded-md"
                />
                <div>
                  <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
                  <p>{milestone.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-green-100 p-8 rounded-xl text-center">
          <h2 className="text-3xl font-bold mb-3">Join Our Fresh Revolution</h2>
          <p className="text-gray-700 mb-3">Whether you're a foodie, a local farmer, or a delivery hero — we welcome you to the EcoMarket family. Let’s grow together.</p>
          <p className="text-green-700 font-semibold">Thanks for being part of our journey! 💚</p>
        </section>
      </div>
    </div>
  );
};

export default About;
