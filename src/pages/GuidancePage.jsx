import React, { useEffect, useState } from "react";
import "../components/css/QuickGuidance.css"; // Optional, if you have styling
import Navbar from "../components/NavBar";

const faqData = [
  {
    id: 1,
    category: ["dogs", "emergency"],
    question: "My dog is vomiting. When should I be concerned?",
    icon: "🐕",
    preview:
      "Learn when occasional vomiting becomes a serious concern and what warning signs to watch for...",
    primaryCategory: "emergency",
    answer: `
            <div class="answer-content">
                <div class="emergency-note">
                    🚨 Seek immediate veterinary care if your dog shows signs of severe distress, blood in vomit, or continuous vomiting for more than 24 hours.
                </div>
                <p><strong>Occasional vomiting can be normal</strong>, but watch for these warning signs:</p>
                <ul class="tips-list">
                    <li>Vomiting multiple times in a day</li>
                    <li>Blood in vomit or dark coffee-ground appearance</li>
                    <li>Lethargy or weakness</li>
                    <li>Loss of appetite for more than 24 hours</li>
                    <li>Signs of dehydration</li>
                </ul>
                <p><strong>What you can do:</strong> Withhold food for 12-24 hours, provide small amounts of water frequently, and monitor closely.</p>
            </div>
        `,
  },
  {
    id: 2,
    category: ["cats", "behavior"],
    question: "Why is my cat not using the litter box?",
    icon: "🐱",
    preview:
      "Discover common reasons for litter box avoidance and practical solutions to fix this issue...",
    primaryCategory: "behavior",
    answer: `
            <div class="answer-content">
                <p><strong>Common reasons for litter box avoidance:</strong></p>
                <ul class="tips-list">
                    <li>Dirty litter box - clean daily</li>
                    <li>Wrong type of litter - cats prefer unscented, clumping litter</li>
                    <li>Box location - should be quiet, accessible, away from food</li>
                    <li>Medical issues - urinary tract infections, arthritis</li>
                    <li>Stress or anxiety from changes in environment</li>
                    <li>Not enough boxes - rule is one per cat plus one extra</li>
                </ul>
                <p><strong>Solutions:</strong> Keep boxes clean, try different litter types, ensure privacy, and consult your vet if the problem persists.</p>
            </div>
        `,
  },
  {
    id: 3,
    category: ["dogs", "cats", "nutrition"],
    question: "What human foods are toxic to pets?",
    icon: "⚠️",
    preview:
      "Essential information about dangerous foods that could harm your pet and emergency steps to take...",
    primaryCategory: "nutrition",
    answer: `
            <div class="answer-content">
                <div class="emergency-note">
                    ☠️ If your pet has consumed any of these foods, contact your veterinarian immediately!
                </div>
                <p><strong>Highly Toxic Foods:</strong></p>
                <ul class="tips-list">
                    <li>Chocolate (especially dark chocolate)</li>
                    <li>Grapes and raisins</li>
                    <li>Onions and garlic</li>
                    <li>Xylitol (artificial sweetener)</li>
                    <li>Macadamia nuts</li>
                    <li>Avocado</li>
                    <li>Alcohol</li>
                    <li>Coffee and caffeine</li>
                </ul>
                <p><strong>Keep these foods out of reach</strong> and educate family members about pet food safety.</p>
            </div>
        `,
  },
  {
    id: 4,
    category: ["dogs", "behavior"],
    question: "How can I stop my dog from excessive barking?",
    icon: "🔊",
    preview:
      "Effective training techniques and strategies to reduce problematic barking behavior...",
    primaryCategory: "behavior",
    answer: `
            <div class="answer-content">
                <p><strong>First, identify the cause:</strong></p>
                <ul class="tips-list">
                    <li>Boredom - provide mental stimulation and exercise</li>
                    <li>Attention-seeking - ignore the barking, reward quiet behavior</li>
                    <li>Fear or anxiety - gradual desensitization training</li>
                    <li>Territorial behavior - block visual triggers</li>
                    <li>Medical issues - check with your vet</li>
                </ul>
                <p><strong>Training techniques:</strong> Use positive reinforcement, teach "quiet" command, increase physical exercise, and consider professional training if needed.</p>
            </div>
        `,
  },
  {
    id: 5,
    category: ["cats", "emergency"],
    question: "My cat is having difficulty breathing. What should I do?",
    icon: "🫁",
    preview:
      "Critical emergency information about breathing problems in cats and immediate action steps...",
    primaryCategory: "emergency",
    answer: `
            <div class="answer-content">
                <div class="emergency-note">
                    🚨 EMERGENCY: Difficulty breathing is always a veterinary emergency. Go to the nearest animal hospital immediately!
                </div>
                <p><strong>Signs of breathing problems:</strong></p>
                <ul class="tips-list">
                    <li>Open-mouth breathing (abnormal for cats)</li>
                    <li>Rapid or labored breathing</li>
                    <li>Blue gums or tongue</li>
                    <li>Wheezing or gasping sounds</li>
                    <li>Restlessness or inability to get comfortable</li>
                </ul>
                <p><strong>While heading to the vet:</strong> Keep your cat calm, ensure good ventilation, and avoid handling unless necessary.</p>
            </div>
        `,
  },
  {
    id: 6,
    category: ["dogs", "cats", "nutrition"],
    question: "How much should I feed my pet?",
    icon: "🍽️",
    preview:
      "Guidelines for proper pet nutrition and feeding schedules based on age, size, and activity level...",
    primaryCategory: "nutrition",
    answer: `
            <div class="answer-content">
                <p><strong>Feeding guidelines vary by:</strong></p>
                <ul class="tips-list">
                    <li>Age (puppy/kitten, adult, senior)</li>
                    <li>Size and breed</li>
                    <li>Activity level</li>
                    <li>Health status</li>
                    <li>Type of food (dry, wet, raw)</li>
                </ul>
                <p><strong>General rules:</strong> Follow feeding guidelines on pet food packaging, divide daily amount into 2-3 meals, monitor body condition, and adjust portions based on your pet's needs. Consult your veterinarian for personalized feeding recommendations.</p>
            </div>
        `,
  },
  {
    id: 7,
    category: ["dogs", "cats", "emergency"],
    question: "How do I know if my pet is in pain?",
    icon: "😰",
    preview:
      "Recognize the subtle signs of pain in pets and when to seek veterinary care...",
    primaryCategory: "emergency",
    answer: `
            <div class="answer-content">
                <p><strong>Signs of pain in pets:</strong></p>
                <ul class="tips-list">
                    <li>Changes in behavior or personality</li>
                    <li>Decreased appetite or activity</li>
                    <li>Excessive panting or drooling</li>
                    <li>Limping or difficulty moving</li>
                    <li>Hiding or seeking extra attention</li>
                    <li>Vocalizing more than usual</li>
                    <li>Changes in posture or gait</li>
                    <li>Reluctance to jump or climb stairs</li>
                </ul>
                <p><strong>Important:</strong> Pets often hide pain well. Any significant behavior change warrants a veterinary examination.</p>
            </div>
        `,
  },
  {
    id: 8,
    category: ["cats", "behavior"],
    question: "Why does my cat scratch furniture?",
    icon: "🪑",
    preview:
      "Understanding natural scratching behavior and how to redirect it to appropriate surfaces...",
    primaryCategory: "behavior",
    answer: `
            <div class="answer-content">
                <p><strong>Scratching is natural behavior for:</strong></p>
                <ul class="tips-list">
                    <li>Maintaining healthy claws</li>
                    <li>Marking territory with scent glands</li>
                    <li>Stretching muscles</li>
                    <li>Expressing emotions</li>
                </ul>
                <p><strong>Solutions:</strong> Provide appropriate scratching posts (sisal, cardboard, carpet), place near sleeping areas, use deterrents on furniture, trim claws regularly, and reward use of proper scratching surfaces. Never declaw - it's inhumane and illegal in many places.</p>
            </div>
        `,
  },
  {
    id: 9,
    category: ["dogs", "cats", "emergency"],
    question: "What should I do if my pet eats something they shouldn't?",
    icon: "🤢",
    preview:
      "Emergency steps to take when your pet ingests something potentially harmful...",
    primaryCategory: "emergency",
    answer: `
            <div class="answer-content">
                <div class="emergency-note">
                    🚨 Call your veterinarian or pet poison control hotline immediately! Don't wait for symptoms to appear.
                </div>
                <p><strong>Important steps:</strong></p>
                <ul class="tips-list">
                    <li>Remove any remaining dangerous substance from reach</li>
                    <li>Don't induce vomiting unless specifically told to do so</li>
                    <li>Keep packaging/labels of what was consumed</li>
                    <li>Note the time and amount consumed</li>
                    <li>Watch for symptoms but don't wait to seek help</li>
                </ul>
                <p><strong>Pet Poison Control:</strong> Keep emergency numbers handy and act quickly - time is critical in poisoning cases.</p>
            </div>
        `,
  },
  {
    id: 10,
    category: ["dogs", "cats", "behavior"],
    question: "How can I help my anxious pet during thunderstorms?",
    icon: "⛈️",
    preview:
      "Comfort strategies and long-term solutions for pets with storm anxiety...",
    primaryCategory: "behavior",
    answer: `
            <div class="answer-content">
                <p><strong>Immediate comfort measures:</strong></p>
                <ul class="tips-list">
                    <li>Create a safe space - quiet room, comfortable bedding</li>
                    <li>Stay calm yourself - pets pick up on your energy</li>
                    <li>Use calming music or white noise</li>
                    <li>Consider anxiety wraps or thundershirts</li>
                    <li>Distract with favorite toys or treats</li>
                </ul>
                <p><strong>Long-term solutions:</strong> Gradual desensitization training, consult your vet about anti-anxiety medications, and maintain consistent routines to build confidence.</p>
            </div>
        `,
  },
];

const GuidancePage = () => {
  const [currentFilter, setCurrentFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFAQs, setFilteredFAQs] = useState([]);
  const [modalItem, setModalItem] = useState(null);

  useEffect(() => {
    const filtered = faqData.filter((item) => {
      const matchesCategory =
        currentFilter === "all" || item.category.includes(currentFilter);
      const matchesSearch =
        searchTerm === "" ||
        item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.preview.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    setFilteredFAQs(filtered);
  }, [currentFilter, searchTerm]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const closeModal = () => {
    setModalItem(null);
    document.body.style.overflow = "auto";
  };

  const openModal = (item) => {
    setModalItem(item);
    document.body.style.overflow = "hidden";
  };

  return (
    <>
      <Navbar />
      <div className="faq-section">
        <div className="faq-header">
          <h2>Quick Pet Health Guidance</h2>
          <p className="faq-subtitle">
            Find quick answers to common pet health questions
          </p>
        </div>

        <div className="search-container">
          <input
            type="text"
            className="search-box-input"
            placeholder="Search pet health topics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-tabs">
          {["all", "dogs", "cats", "emergency", "nutrition", "behavior"].map(
            (category) => (
              <button
                key={category}
                className={`filter-tab ${
                  currentFilter === category ? "active" : ""
                }`}
                data-category={category}
                onClick={() => setCurrentFilter(category)}
              >
                {category === "all"
                  ? "All Topics"
                  : category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            )
          )}
        </div>

        <div className="faq-cards-container" id="faqContainer">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((item) => (
              <div
                key={item.id}
                className="faq-card"
                data-id={item.id}
                onClick={() => openModal(item)}
              >
                <div className="category-badge">{item.primaryCategory}</div>
                <span className="faq-card-icon">{item.icon}</span>
                <div className="faq-card-question">{item.question}</div>
                <div className="faq-card-preview">{item.preview}</div>
                <div className="faq-card-arrow">→</div>
              </div>
            ))
          ) : (
            <div className="no-results" id="noResults">
              <img
                src="your-image-path.png"
                alt="No Results"
                className="no-results-image"
              />
              <p>No results found.</p>
            </div>
          )}
        </div>

        {modalItem && (
          <div
            className="modal-overlay active"
            id="modalOverlay"
            onClick={(e) => {
              if (e.target.classList.contains("modal-overlay")) closeModal();
            }}
          >
            <div className="modal-content">
              <div className="modal-header">
                <button className="modal-close" onClick={closeModal}>
                  &times;
                </button>
                <div className="modal-icon">{modalItem.icon}</div>
                <div className="modal-question">{modalItem.question}</div>
              </div>
              <div
                className="modal-body"
                dangerouslySetInnerHTML={{ __html: modalItem.answer }}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default GuidancePage;
