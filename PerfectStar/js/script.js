// Chatbot functionality
const chatbotWidget = document.getElementById('chatbot-widget');
const chatbotHeader = document.getElementById('chatbot-header');
const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotSend = document.getElementById('chatbot-send');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotMessages = document.getElementById('chatbot-messages');

  // Minimize on page load
  chatbotWidget.classList.add('minimized');
  chatbotToggle.innerHTML = '<i class="fas fa-comment"></i>';

  // Toggle on header click
  chatbotHeader.addEventListener('click', () => {
    chatbotWidget.classList.toggle('minimized');
    chatbotToggle.innerHTML = chatbotWidget.classList.contains('minimized')
      ? '<i class="fas fa-comment"></i>' 
      : '<i class="fas fa-minus"></i>';
  });

chatbotSend.addEventListener('click', () => {
  const userInput = chatbotInput.value.trim();
  if (userInput !== '') {
    appendMessage("You", userInput, true);
    sendMessage(userInput);
    chatbotInput.value = '';
  }
});

chatbotInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const userInput = chatbotInput.value.trim();
    if (userInput !== '') {
      appendMessage("You", userInput, true);
      sendMessage(userInput);
      chatbotInput.value = '';
    }
  }
});

let chatHistory = [];
const maxHistory = 10;

async function sendMessage(userInput) {
  chatHistory.push({ role: "user", content: userInput });

  if (chatHistory.length > maxHistory) {
    chatHistory = chatHistory.slice(-maxHistory);
  }

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer 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`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "llama3-70b-8192",
        messages: [
          { 
            role: "system", 
            content: `
            You are a friendly and concise assistant for Perfect Star PC Shoppe. 
            Always reply in a helpful, casual tone, like chatting with a friend, no long response just enough. 
            Here are some details to help you answer customer questions:

            Perfect Star PC Shoppe is located at P. del Rosario St., Cebu City, near USC Main, right in front of Sunstar.
            
            Our Main Branch Opening Hours is 8:30am to 5:30pm during Monday-Friday, Saturday is 8:30am to 3:00pm

            We have several branches:
            - Perfect Star PC Shoppe Emall is on the 3rd Floor of E Mall.
              +63 9604239120  emall@starpc.com.ph
            - Perfect Star PC Shoppe Toledo is on the Ground Floor of Gaisano Grand Toledo.
              349 6349  toledo@starpc.com.ph
            - Perfect Star PC Shoppe Mactan is on the Ground Floor of Gaisano Mactan Island Mall.
               +63 9322320087  mactan@starpc.com.ph
            - Perfect Star PC Shoppe Danao is on the Ground Floor of Gaisano Capital Danao.
              +63 9322360857 danao@starpc.com.ph

            We offer a wide range of products including desktops, laptops, printers, and computer peripherals. 
            If someone asks about products availability or specific product, politely respond that your just ai help answering faq contact our fb page "Perfect Star PC Shoppe".

            If someone asks for contact information, respond with:
            "Sure! You can reach us through any of these numbers: 0917 625 0075, 0922 877 1771, or 253 9449."

            If someone ask for contact information on branches respond with the correct information.

            If user as for branches respond with:
            "We have several branches Perfect Star PC Shoppe Emall, Toledo, Danao and Mactan"

            If user ask for Item availability give them our facebook page, "Perfect Star PC Shoppe" for the main branch
            "Perfect Star PC Shoppe Emall" for Emall branch
            "Perfect Star PC Shoppe Danao" for Danao branch
            "Perfect Star PC Shoppe Mactan" for Mactan branch
            "Perfect Star PC Shoppe Toledo" for Toledo branch

            We offer also custom built PC, just tell us your budget or if you want pre built. message us on Facebook "Perfect Star PC Shoppe"

            Perfect Star Is Also an authorized service center of Epson

            Dont answer any other questions like politics, bulliying, history and other out of the box questions, politely refuse
             `,
          },
          ...chatHistory,
        ],
      }),
    });

    const data = await response.json();

    if (response.ok) {
      const aiReply = data.choices[0].message.content.trim();
      chatHistory.push({ role: "assistant", content: aiReply });
      appendMessage("Ariel", aiReply, false);
    } else {
      appendMessage("Ariel", "Sorry, I couldn’t process that request.", false);
      console.error("API error:", data);
    }
  } catch (error) {
    appendMessage("Ariel", "Oops! Something went wrong.", false);
    console.error("Fetch error:", error);
  }
}

function appendMessage(sender, message, isUser = false) {
  const intro = document.getElementById("chatbot-intro");
  if (intro && !intro.classList.contains("hidden")) {
    intro.classList.add("hidden");
  }

  const chatBox = document.getElementById("chatbot-messages");
  const messageElement = document.createElement("div");

  messageElement.className = isUser ? "user-message" : "ai-message";
  messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;

  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight;
}
