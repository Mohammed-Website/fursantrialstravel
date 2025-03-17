function toggleSidebar() {
    const sidebar = document.getElementById("fursan-trials-mobile-sidebar");
    const overlay = document.getElementById("fursan-trials-sidebar-overlay");

    if (sidebar.style.right === "0px") {
        closeSidebar();
    } else {
        sidebar.style.right = "0px"; // Show sidebar
        overlay.classList.add("active"); // Show overlay
        document.addEventListener("click", outsideClickListener); // Add event listener
        window.removeEventListener("scroll", handleScroll); // Disable scroll event
    }
}

function closeSidebar() {
    const sidebar = document.getElementById("fursan-trials-mobile-sidebar");
    const overlay = document.getElementById("fursan-trials-sidebar-overlay");

    sidebar.style.right = "-250px"; // Hide sidebar
    overlay.classList.remove("active"); // Hide overlay
    document.removeEventListener("click", outsideClickListener); // Remove event listener
    window.addEventListener("scroll", handleScroll); // Re-enable scroll event
}

function outsideClickListener(event) {
    const sidebar = document.getElementById("fursan-trials-mobile-sidebar");

    // Check if the clicked target is outside the sidebar and the menu button
    if (!sidebar.contains(event.target) && !event.target.closest(".fursan-trials-mobile-menu-icon")) {
        closeSidebar();
    }
}

// Scroll event handler
function handleScroll() {
    const currentScrollPosition = window.scrollY;
    const header = document.getElementById("fursan-trials-header");

    if (currentScrollPosition > lastScrollPosition) {
        // Scrolling down
        header.classList.add("hidden");
    } else {
        // Scrolling up
        header.classList.remove("hidden");
    }

    lastScrollPosition = currentScrollPosition;
}

// Attach scroll event initially
let lastScrollPosition = 0;
window.addEventListener("scroll", handleScroll);





















/* Ai bot chat functionality */
let chatbotIcon = document.getElementById("fursan-trials-chatbot-icon");
let chatSidebar = document.getElementById("fursan-trials-chat-sidebar");
let closeChat = document.getElementById("fursan-trials-close-chat");
let sendBtn = document.getElementById("fursan-trials-send-btn");
let messageBar = document.getElementById("fursan-trials-message-bar");
let messageBox = document.querySelector(".fursan-trials-message-box");
let chatOverlay = document.getElementById("fursan-trials-chat-overlay");

let API_URL = "https://api.openai.com/v1/chat/completions";
let API_KEY = "sk-***76cA";

/* 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 */

// Check if the user is on a mobile device
const isMobileDevice = /Mobi|Android/i.test(navigator.userAgent);

// Open Slider if ai bot icon is clicked
chatbotIcon.addEventListener("click", () => {
    chatSidebar.classList.add("active");
    chatOverlay.classList.add("active");
});

// Close Sidebar if close slider button is clicked
closeChat.addEventListener("click", () => {
    chatSidebar.classList.remove("active");
    chatOverlay.classList.remove("active");
});

// Close Sidebar if Overlay is Clicked
chatOverlay.addEventListener("click", () => {
    chatSidebar.classList.remove("active");
    chatOverlay.classList.remove("active");
});

// Send Message Function
sendBtn.onclick = function () {
    if (messageBar.value.trim() !== "") {
        let UserTypedMessage = messageBar.value.trim();
        messageBar.value = "";

        let userMessage = `
                <div class="chat message">
                    <span>${UserTypedMessage}</span>
                </div>
            `;

        let botResponse = `
                <div class="chat response">
                    <img src="مكتب-سياحي/مكتب-سياحي.webp">
                    <span class="new">...</span>
                </div>
            `;

        messageBox.insertAdjacentHTML("beforeend", userMessage);

        setTimeout(() => {
            messageBox.insertAdjacentHTML("beforeend", botResponse);

            let requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${API_KEY}`
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [{ role: "user", content: UserTypedMessage }]
                })
            };

            fetch(API_URL, requestOptions)
                .then((res) => res.json())
                .then((data) => {
                    let ChatBotResponse = document.querySelector(".response .new");
                    ChatBotResponse.innerHTML = data.choices[0].message.content;
                    ChatBotResponse.classList.remove("new");
                })
                .catch(() => {
                    let ChatBotResponse = document.querySelector(".response .new");
                    ChatBotResponse.innerHTML = "الموقع مازال في وضع التجربة";
                });
        }, 100);



        document.getElementById("fursan-trials-message-bar").style.height = "40px"; // Reset to default height;
    }
};

// Attach Send Message Function to Enter Key (for Desktop)
if (!isMobileDevice) {
    messageBar.addEventListener("keydown", (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault(); // Prevent default behavior
            sendBtn.click();
        } else if (event.key === "Enter" && event.shiftKey) {
            event.preventDefault(); // Allow Shift+Enter to insert a new line
            const cursorPosition = messageBar.selectionStart;
            messageBar.value =
                messageBar.value.substring(0, cursorPosition) + "\n" + messageBar.value.substring(cursorPosition);
            messageBar.selectionStart = messageBar.selectionEnd = cursorPosition + 1; // Move cursor to the new line
            messageBar.style.height = "auto"; // Reset height to auto
            messageBar.style.height = `${messageBar.scrollHeight}px`; // Adjust height based on content
        }
    });
}

// Enable Enter for New Line Only (for Mobile)
if (isMobileDevice) {
    messageBar.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevent sending the message
            const cursorPosition = messageBar.selectionStart;
            messageBar.value =
                messageBar.value.substring(0, cursorPosition) + "\n" + messageBar.value.substring(cursorPosition);
            messageBar.selectionStart = messageBar.selectionEnd = cursorPosition + 1; // Move cursor to the new line
            messageBar.style.height = "auto"; // Reset height to auto
            messageBar.style.height = `${messageBar.scrollHeight}px`; // Adjust height based on content
        }
    });
}

// Adjust Textarea Height Dynamically
messageBar.addEventListener("input", function () {
    this.style.height = "auto"; // Reset height to auto
    this.style.height = `${this.scrollHeight}px`; // Set height based on scroll height
});

// Handle Dynamic Text Direction
document.querySelectorAll('.fursan-trials-dynamic-direction-input-class').forEach(input => {
    input.addEventListener('input', function () {
        let firstChar = this.value.trim().charAt(0);

        if (firstChar) {
            // Check if the first character is Arabic
            if (firstChar.match(/[\u0600-\u06FF]/)) {
                this.style.direction = 'rtl';
            } else {
                this.style.direction = 'ltr';
            }
        }
    });
});











messageBar.addEventListener("input", function () {
    this.style.height = "auto"; // Reset height to auto
    this.style.height = `${this.scrollHeight}px`; // Set height based on scroll height
});

















scrollToWhoAreWe = function (elementIdName) {
    const targetDiv = document.getElementById(elementIdName);
    if (targetDiv) {
        const targetPosition = targetDiv.getBoundingClientRect().top + window.scrollY;
        const windowHeight = window.innerHeight;
        const scrollToPosition = targetPosition - (windowHeight / 2) + (targetDiv.clientHeight / 2);

        window.scrollTo({
            top: scrollToPosition,
            behavior: "smooth"
        });
    }
}

function scrollToMiddleOfElement(className) {
    const element = document.querySelector(`.${className}`);
    if (element) {
        const elementRect = element.getBoundingClientRect();
        const absoluteElementTop = elementRect.top + window.scrollY;
        const middlePosition = absoluteElementTop - (window.innerHeight / 2) + (elementRect.height / 2);

        window.scrollTo({
            top: middlePosition,
            behavior: 'smooth'
        });
    }
}














































// create all offers content functionality
const sectionData = [
    {
        title: 'أحدث العروض',
        image_1: ['احدث-العروض/1.jpg', 'رحلة عيد الفطر | طرابزون 5 أيام'],
        image_2: ['احدث-العروض/2.jpg', 'رحلة عيد الفطر | طرابزون 5 أيام'],
        image_3: ['احدث-العروض/3.jpg', 'رحلة اذربيجان 5 أيام | باكو & قبالا & شاهداغ'],
        image_4: ['احدث-العروض/4.jpg', 'رحلة اذربيجان 8 أيام | باكو & قبالا & شاهداغ'],
        image_5: ['احدث-العروض/5.jpg', 'رحلة اذربيجان 8 أيام'],
    },

    {
        title: 'عروض روسيا',
        image_1: ['روسيا/1.jpg', 'رحلة موسكو & بيترسبورغ & موسكو'],
        image_2: ['روسيا/2.jpg', 'رحلة موسكو & بيترسبورغ & موسكو'],
        image_3: ['روسيا/3.jpg', 'رحلة موسكو & بيترسبورغ & موسكو'],
        image_4: ['روسيا/4.jpg', 'رحلة روسيا البيضاء - 8 أيام'],
    },

    {
        title: 'عروض اذربيجان',
        image_1: ['اذربيجان/1.jpg', 'رحلة باكو & قبالا & شاهداغ'],
        image_2: ['اذربيجان/2.jpg', 'رحلة باكو & قبالا & شاهداغ'],
        image_3: ['اذربيجان/3.jpg', 'رحلة اذربيجان - 8 أيام'],
        image_4: ['اذربيجان/4.jpg', 'رحلة اذربيجان - 7 أيام'],
    },

    {
        title: 'عروض اندونيسيا',
        image_1: ['اندونيسيا/1.jpg', 'رحلة اندونيسيا - 8 أيام'],
        image_2: ['اندونيسيا/2.jpg', 'رحلة اندونيسيا - 10 أيام'],
    },

    {
        title: 'عروض طرابزون',
        image_1: ['طرابزون/1.jpg', 'رحلة طرابزون -  5 أيام'],
        image_2: ['طرابزون/2.jpg', 'رحلة طرابزون -  6 أيام'],
        image_3: ['طرابزون/3.jpg', 'رحلة طرابزون -  7 أيام'],
        image_4: ['طرابزون/4.jpg', 'رحلة طرابزون -  8 أيام'],
        image_5: ['طرابزون/5.jpg', 'رحلة طرابزون -  9 أيام'],
    },

    {
        title: 'عروض اسطنبول',
        image_1: ['اسطنبول/1.jpg', 'رحلة اسطنبول -  5 أيام'],
        image_2: ['اسطنبول/2.jpg', 'رحلة اسطنبول -  6 أيام'],
        image_3: ['اسطنبول/3.jpg', 'رحلة اسطنبول -  7 أيام'],
        image_4: ['اسطنبول/4.jpg', 'رحلة اسطنبول -  8 أيام'],
        image_5: ['اسطنبول/5.jpg', 'رحلة اسطنبول -  9 أيام'],
        image_6: ['اسطنبول/6.jpg', 'رحلة اسطنبول -  10 أيام'],
    },

    {
        title: 'عروض ماليزيا',
        image_1: ['ماليزيا/1.jpg', 'رحلة ماليزيا -  8 أيام'],
        image_2: ['ماليزيا/2.jpg', 'رحلة ماليزيا -  10 أيام'],
    },

    {
        title: 'عروض تايلاند',
        image_1: ['تايلاند/1.jpg', 'رحلة تايلاند - 7 ليالي'],
        image_2: ['تايلاند/2.jpg', 'رحلة تايلاند - 9 ليالي'],
        image_3: ['تايلاند/3.jpg', 'رحلة تايلاند - 7 ليالي'],
        image_4: ['تايلاند/4.jpg', 'رحلة تايلاند - 9 ليالي'],
    },
];

// Function to dynamically create the section
function createScrollableCardsSection(dataArray) {
    const section = document.getElementById("fursan-trials-scrollable-cards-section-id");

    dataArray.forEach((data) => {
        const container = document.createElement('div');
        container.className = 'fursan-trials-scrollable-cards-container';

        // Create the title
        const title = document.createElement('h2');
        title.className = 'fursan-trials-scrollable-section-title';
        title.innerText = data.title;
        container.appendChild(title);

        // Create the scrollable row
        const scrollableRow = document.createElement('div');
        scrollableRow.className = 'fursan-trials-scrollable-cards-row';

        // Loop through the images and create cards
        Object.keys(data).forEach((key) => {
            if (key.startsWith('image_')) {
                const [src, text] = data[key];

                const card = document.createElement('div');
                card.className = 'fursan-trials-scrollable-card';

                const img = document.createElement('img');
                img.src = src;
                img.alt = text;
                img.addEventListener('click', () => openFullScreenImage(src, text)); // Pass text to full-screen function
                card.appendChild(img);

                scrollableRow.appendChild(card);
            }
        });

        container.appendChild(scrollableRow);
        section.appendChild(container);
    });
}

function openFullScreenImage(src, text) {

    // Disable document scrolling
    document.body.style.overflow = 'hidden';


    /* Create the sull screen container div */
    const fullScreenDiv = document.createElement('div');
    fullScreenDiv.className = 'fursan-trials-full-screen-container';

    // Add animation class for fade-in effect
    setTimeout(() => fullScreenDiv.classList.add('visible'), 10);

    const exitButton = document.createElement('button');
    exitButton.innerText = 'عودة';
    exitButton.className = 'fursan-trials-exit-button';
    exitButton.addEventListener('click', closeFullScreenImage);
    fullScreenDiv.appendChild(exitButton);

    const title = document.createElement('h2');
    title.innerText = text;
    title.className = 'fursan-trials-full-screen-title';
    fullScreenDiv.appendChild(title);

    // Full-screen image
    const fullScreenImage = document.createElement('img');
    fullScreenImage.src = src;
    fullScreenImage.className = 'fursan-trials-full-screen-image';
    fullScreenDiv.appendChild(fullScreenImage);

    // WhatsApp button
    const whatsappButton = document.createElement('a');
    whatsappButton.className = 'fursan-trials-whatsapp-button';
    whatsappButton.innerText = 'إرسال هذا العرض';
    whatsappButton.href = `https://wa.me/+966599091717?text=💎%20طلب%20حجز%20عرض%20جديد%20💎%0A%0Aسلام%20عليكم،%20حاب%20أسأل%20عن%20عرض%0A*${encodeURIComponent(text)}*%0Aوحاب%20أعرف%20تفاصيل%20أكثر%20عن%20عروضكم%20المشابهة.%0A%0A🔗%20رابط%20صورة%20العرض:%0fursantrials.com/${encodeURIComponent(src)}%0A%0Aبإنتظار%20ردكم%20وشكرًا%20لكم`;
    fullScreenDiv.appendChild(whatsappButton);

    // Close on background click
    fullScreenDiv.addEventListener('click', (e) => {
        if (e.target === fullScreenDiv) closeFullScreenImage();
    });

    document.body.appendChild(fullScreenDiv);

    // Smooth close function
    function closeFullScreenImage() {
        fullScreenDiv.classList.remove('visible'); // Trigger fade-out
        setTimeout(() => fullScreenDiv.remove(), 300); // Remove element after fade-out


        document.body.style.overflow = ''; // Re-enable document scrolling
    }
}

// Call the function with the sample data
createScrollableCardsSection(sectionData);
































/* Function for import all comments from google sheet */
document.getElementById("fursan-trials-comment-form").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent page refresh

    let name = document.getElementById("fursan-trials-comment-username").value.trim();
    let comment = document.getElementById("fursan-trials-comment-text").value.trim();
    let stars = document.getElementById("fursan-trials-comment-stars").value;


    let formData = new URLSearchParams();
    formData.append("name", name); // Match Google Apps Script keys
    formData.append("comment", comment);
    formData.append("stars", stars);

    try {
        let response = await fetch("https://script.google.com/macros/s/AKfycbyBAJQhhVA5Uhxe2rrEZ4rjB0Ttn4SrYBptwjx47VZlxtgi3dENPfmNyAmrfL-QZpdEnQ/exec", {
            method: "POST",
            body: formData,
        });

        let data = await response.text();

        if (data === "Success") {
            document.getElementById("fursan-trials-comment-form").reset();

            await fetchReviews(); // Wait until fetchReviews() is fully executed

            showSuccessNotification(); // Now run the notification function
        }
    } catch (error) {
    }
});

// Function to Fetch and Display Reviews
function fetchReviews() {
    fetch("https://script.google.com/macros/s/AKfycbyBAJQhhVA5Uhxe2rrEZ4rjB0Ttn4SrYBptwjx47VZlxtgi3dENPfmNyAmrfL-QZpdEnQ/exec")
        .then(response => response.json())
        .then(data => {
            let indoforall_clint_rate_area = document.getElementById("fursan-trials-clint-rate-area");
            indoforall_clint_rate_area.innerHTML = ""; // Clear old reviews

            data.reverse().forEach(item => { // Reverse to show newest first
                let { date, name, comment, starAmount } = item;

                // Skip any row where the comment is empty
                if (!comment.trim()) return;

                let clintRateDiv = document.createElement("div");
                clintRateDiv.classList.add("fursan-trials-rate-div");

                clintRateDiv.innerHTML = `
                <div class="fursan-trials-clint-rate-date-div">
                    <h3>${date}</h3>
                </div>

                <div class="fursan-trials-clint-rate-info-div">
                    <img src="مكتب-سياحي/مكتب-سياحي.webp" alt="فرسان العالم - مكتب سياحي" title="فرسان العالم - مكتب سياحي">
                    <h4>${name}</h4>
                </div>

                <div class="fursan-trials-clint-rate-comment-div">
                    <h5>${comment}</h5>
                </div>

                <div class="fursan-trials-clint-rate-star-div">
                    ${"★".repeat(starAmount)}
                </div>
            `;

                indoforall_clint_rate_area.appendChild(clintRateDiv);
            });

            // Smooth appearance with delay
            setTimeout(() => {
                indoforall_clint_rate_area.classList.add("show");
            }, 100);
        })
        .catch(error => console.error("Error fetching reviews:", error));
}

// Function to Show Floating Success Notification
function showSuccessNotification() {
    let notification = document.getElementById("indoforall_success_notification");
    notification.style.display = "block";

    setTimeout(() => {
        notification.style.opacity = "1";
        notification.style.transform = "translateX(-50%) translateY(0px)"; // Move slightly up
    }, 10);

    setTimeout(() => {
        notification.style.opacity = "0";
        notification.style.transform = "translateX(-50%) translateY(10px)"; // Move down slightly while fading out
        setTimeout(() => {
            notification.style.display = "none";
        }, 400);
    }, 3000);
}

// Fetch Reviews on Page Load
fetchReviews();


















/* Function to trach the first inserted letter in the inputs with the class name of "mughader_dynamic_direction_input_class" to set their direction value */
document.querySelectorAll('.fursan-trials-dynamic-direction-input-class').forEach(input => {
    input.addEventListener('input', function () {
        let firstChar = this.value.trim().charAt(0);

        if (firstChar) {
            // Check if the first character is Arabic
            if (firstChar.match(/[\u0600-\u06FF]/)) {
                this.style.direction = 'rtl';
            } else {
                this.style.direction = 'ltr';
            }
        }
    });
});



/* Insert new click data in the google sheet */
function insertNewClick(columnName) {
    const scriptURL = "https://script.google.com/macros/s/AKfycbyU-p7z3tHF0I1K0GCmjcRG3CaG0NPkGyMPTvhlGPISxwIYrt6ueD7O2iHSza9SPOP3/exec";

    // Trim the column name before passing it
    fetch(`${scriptURL}?columnName=${encodeURIComponent(columnName.trim())}`)
        .then(response => response.text())
        .then(data => console.log("Response:", data))
        .catch(error => console.error("Error:", error));
}

/* Open WhatsApp */
openWhatsAppNumber = function () {

    insertNewClick('alseef.com');

    const whatsappNumber = "+966599091717";
    const message = encodeURIComponent('سلام عليكم ورحمة الله وبركاته'); // Optional pre-filled message
    const url = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(url, "_blank"); // Opens in a new tab
}