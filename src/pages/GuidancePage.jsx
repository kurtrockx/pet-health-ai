import React, { useEffect, useState } from "react";
import "../components/css/QuickGuidance.css"; // Optional, if you have styling
import Navbar from "../components/NavBar";
import noResultsPng from '../assets/noresults.png'

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
    icon: "🍃",
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
  {
    id: 11,
    category: ["dogs", "grooming"],
    question: "How often should I bathe my dog?",
    icon: "🛁",
    preview:
      "Learn how frequently to bathe your dog based on coat type and lifestyle...",
    primaryCategory: "grooming",
    answer: `
        <div class="answer-content">
            <p><strong>General guideline:</strong> Every 4–6 weeks, but it varies by breed and activity.</p>
            <ul class="tips-list">
                <li>Short-haired dogs: less frequent</li>
                <li>Long-haired breeds: every 4 weeks</li>
                <li>Dogs with allergies or skin issues: consult your vet</li>
            </ul>
            <p>Always use pet-safe shampoo. Human shampoos can irritate dog skin.</p>
        </div>
    `,
  },
  {
    id: 12,
    category: ["cats", "nutrition"],
    question: "Is it okay to feed my cat milk?",
    icon: "🥛",
    preview:
      "Cats and milk: adorable cliché or dietary problem? Find out here...",
    primaryCategory: "nutrition",
    answer: `
        <div class="answer-content">
            <p><strong>Most adult cats are lactose intolerant.</strong></p>
            <ul class="tips-list">
                <li>Milk can cause diarrhea or upset stomach</li>
                <li>If you want to offer milk, choose lactose-free pet milk</li>
                <li>Always provide fresh water as the main drink</li>
            </ul>
            <p><strong>Best practice:</strong> Stick to nutritionally balanced cat food and treats.</p>
        </div>
    `,
  },
  {
    id: 13,
    category: ["dogs", "behavior"],
    question: "Why does my dog eat grass?",
    icon: "🌿",
    preview: "Curious canine habit? Here's why dogs nibble on grass...",
    primaryCategory: "behavior",
    answer: `
        <div class="answer-content">
            <p><strong>Common reasons dogs eat grass:</strong></p>
            <ul class="tips-list">
                <li>Boredom or anxiety</li>
                <li>Upset stomach (some dogs vomit after)</li>
                <li>Seeking fiber or missing nutrients</li>
            </ul>
            <p>If it's frequent or accompanied by vomiting, consult your vet.</p>
        </div>
    `,
  },
  {
    id: 14,
    category: ["cats", "grooming"],
    question: "How can I reduce shedding in my cat?",
    icon: "🐾",
    preview: "Simple grooming techniques to manage your cat’s shedding...",
    primaryCategory: "grooming",
    answer: `
        <div class="answer-content">
            <p><strong>Tips to reduce shedding:</strong></p>
            <ul class="tips-list">
                <li>Brush regularly (daily for long-haired cats)</li>
                <li>Provide proper nutrition and hydration</li>
                <li>Use deshedding tools or gloves</li>
                <li>Consider omega-3 supplements (ask your vet)</li>
            </ul>
        </div>
    `,
  },
  {
    id: 15,
    category: ["dogs", "emergency"],
    question: "What are signs of heatstroke in dogs?",
    icon: "🌡️",
    preview:
      "Critical symptoms of overheating in dogs and emergency care tips...",
    primaryCategory: "emergency",
    answer: `
        <div class="answer-content">
            <div class="emergency-note">
                🚨 Heatstroke is a life-threatening emergency. Act quickly!
            </div>
            <p><strong>Warning signs:</strong></p>
            <ul class="tips-list">
                <li>Excessive panting or drooling</li>
                <li>Red or pale gums</li>
                <li>Vomiting or diarrhea</li>
                <li>Confusion or collapse</li>
            </ul>
            <p><strong>Immediate action:</strong> Move to shade, apply cool (not cold) water, and seek veterinary help immediately.</p>
        </div>
    `,
  },
  {
    id: 16,
    category: ["cats", "behavior"],
    question: "Why is my cat meowing excessively?",
    icon: "📢",
    preview: "Understand what your cat's persistent meowing could mean...",
    primaryCategory: "behavior",
    answer: `
        <div class="answer-content">
            <p><strong>Possible causes:</strong></p>
            <ul class="tips-list">
                <li>Hunger or thirst</li>
                <li>Seeking attention or play</li>
                <li>Medical issues (especially in senior cats)</li>
                <li>Stress or boredom</li>
                <li>Mating behavior (if unspayed/neutered)</li>
            </ul>
            <p>Observe patterns and consult your vet if it becomes frequent or intense.</p>
        </div>
    `,
  },
  {
    id: 17,
    category: ["dogs", "training"],
    question: "How can I crate train my puppy?",
    icon: "📦",
    preview: "Step-by-step crate training tips for a calm and happy puppy...",
    primaryCategory: "behavior",
    answer: `
        <div class="answer-content">
            <p><strong>Crate training tips:</strong></p>
            <ul class="tips-list">
                <li>Make the crate a positive space with toys and treats</li>
                <li>Never use it as punishment</li>
                <li>Start with short periods and gradually increase time</li>
                <li>Maintain a consistent schedule</li>
            </ul>
            <p><strong>Goal:</strong> The crate should be a cozy den, not a cage.</p>
        </div>
    `,
  },
  {
    id: 18,
    category: ["cats", "health"],
    question: "How do I clean my cat's ears safely?",
    icon: "🧼",
    preview: "Gentle and effective steps to clean your cat’s ears at home...",
    primaryCategory: "grooming",
    answer: `
        <div class="answer-content">
            <p><strong>Steps to clean cat ears:</strong></p>
            <ul class="tips-list">
                <li>Use a vet-approved ear cleaner</li>
                <li>Apply solution to a cotton ball (not directly in ear)</li>
                <li>Gently wipe the outer ear — never insert anything deep</li>
                <li>Watch for redness, odor, or discharge</li>
            </ul>
            <p>If your cat resists heavily or you notice inflammation, consult your vet.</p>
        </div>
    `,
  },
  {
    id: 19,
    category: ["dogs", "nutrition"],
    question: "Can I give my dog bones to chew?",
    icon: "🦴",
    preview:
      "Not all bones are safe! Learn the dos and don’ts of feeding bones...",
    primaryCategory: "nutrition",
    answer: `
        <div class="answer-content">
            <p><strong>Safe bone tips:</strong></p>
            <ul class="tips-list">
                <li>Never give cooked bones – they can splinter</li>
                <li>Raw bones may be safer but still carry risks</li>
                <li>Supervise chewing to prevent choking</li>
                <li>Offer alternatives like rubber or nylon chew toys</li>
            </ul>
            <p>Ask your vet before introducing bones, especially for aggressive chewers.</p>
        </div>
    `,
  },
  {
    id: 20,
    category: ["cats", "emergency"],
    question: "What should I do if my cat has a seizure?",
    icon: "⚡",
    preview:
      "Know what actions to take if your cat experiences a seizure episode...",
    primaryCategory: "emergency",
    answer: `
        <div class="answer-content">
            <div class="emergency-note">
                ⚠️ Stay calm. Seizures are frightening but often short. Your vet needs to evaluate the cause.
            </div>
            <p><strong>During a seizure:</strong></p>
            <ul class="tips-list">
                <li>Keep your cat away from sharp or hard objects</li>
                <li>Don’t restrain or try to hold the cat</li>
                <li>Time the seizure and observe symptoms</li>
            </ul>
            <p><strong>After the seizure:</strong> Let your cat rest and call your vet immediately.</p>
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
    <div className="max-h-[100dvh] overflow-x-hidden">
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
              <img src={noResultsPng} className="mx-auto min-w-72 max-w-72" />
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
    </div>
  );
};

export default GuidancePage;
