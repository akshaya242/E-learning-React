import React from 'react';
import './FaqsHome.css'; // Import CSS for styling

const FaqsHome = () => {    
    const faqs = {
      
        rows: [
          {
            title: "Lorem ipsum dolor sit amet",
            content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed tempor sem. Aenean vel turpis feugiat,
            ultricies metus at, consequat velit. Curabitur est nibh, varius in tellus nec, mattis pulvinar metus.
            In maximus cursus lorem, nec laoreet velit eleifend vel. Ut aliquet mauris tortor, sed egestas libero interdum vitae.
            Fusce sed commodo purus, at tempus turpis.`,
          },
          {
            title: "Nunc maximus, magna at ultricies elementum",
            content:
              "Nunc maximus, magna at ultricies elementum, risus turpis vulputate quam, vitae convallis ex tortor sed dolor.",
          },
          {
            title: "Curabitur laoreet, mauris vel blandit fringilla",
            content: `Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc, ac sagittis leo elit vel lorem.
            Fusce tempor lacus ut libero posuere viverra. Nunc velit dolor, tincidunt at varius vel, laoreet vel quam.
            Sed dolor urna, lobortis in arcu auctor, tincidunt mattis ante. Vivamus venenatis ultricies nibh in volutpat.
            Cras eu metus quis leo vestibulum feugiat nec sagittis lacus. Mauris vulputate arcu sed massa euismod dignissim.`,
          },
          
        ]}
  return (
    <div className="faq-sections">
  <h2 className="faq-heading">FAQs</h2>
  <div className="faq-container">
    {faqs.rows.map((faq, index) => (
      <div className="faq-card" key={index}>
        <h3 className="faq-question">{faq.title}</h3>
        <p className="faq-answer">{faq.content}</p>
      </div>
    ))}
  </div>
</div>

  );
};

export default FaqsHome;
