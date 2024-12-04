import React from 'react';
import './FaqsHome.css'; // Import CSS for styling

const FaqsHome = () => {    
    const faqs = {
      
        rows: [
          {
            title: "How do I choose a course?",
            content: `You can browse our course catalog by subject, popularity, or rating. Each course page includes a description, syllabus, and user reviews to help you make an informed decision.`,
          },
          {
            title: "What is the duration of the courses?",
            content:
              "Course durations vary depending on the content. Most courses provide an estimated time for completion, typically ranging from a few hours to several weeks.",
          },
          {
            title: "Can I access course materials after completing the course?",
            content: `Yes, once you enroll in a course, you will have lifetime access to the course materials, even after you complete it.`,
          },
          {
            title: "What payment methods are accepted?",
            content: `We accept various payment methods, including credit/debit cards and PayPal. Please check our payment page for more details.`,
          },
          {
            title: "What is your refund policy?",
            content: `If you are not satisfied with a course, you can request a refund within a specified period (e.g., 30 days) after enrollment, provided you have not completed a significant portion of the course.`,
          },
          {
            title: "How can I contact customer support?",
            content:
              "You can reach our customer support team via email, live chat, or by submitting a support ticket through our website.",
          },
          {
            title: "Can I interact with other learners?",
            content: `Yes, our platform includes community features where you can engage with fellow learners, participate in discussions, and collaborate on projects.`,
          },
          {
            title: "Do you offer mentorship or coaching?",
            content: `Some courses may include mentorship or coaching options for an additional fee. Check the course details for availability.`,
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
