function addCustomDiv(messageUsername, messageText) {
  // const targetContainer = document.querySelector('main.seventv-chat-list');
  // if (!targetContainer) {
  //   console.error('Target container not found.');
  //   return;
  // }

  // Main container div
  const mainDiv = document.createElement('div');
  mainDiv.setAttribute('data-v-90e21ec9', '');
  mainDiv.setAttribute('message-id', 'youtube-message');
  mainDiv.setAttribute('class', 'seventv-message');

  const banSlider = document.createElement('div');
  banSlider.setAttribute('class', 'seventv-ban-slider');
  banSlider.setAttribute('data-v-56d4a96d', '');
  banSlider.setAttribute('data-v-90e21ec9', '');
  banSlider.setAttribute('style', 'transform: translateX(0px); transition: none 0s ease 0s; box-shadow: none;');

  const wrapped = document.createElement('div');
  wrapped.setAttribute('data-v-56d4a96d', '');
  wrapped.setAttribute('class', 'wrapped');

  const messageContainer = document.createElement('div');
  messageContainer.setAttribute('class', 'seventv-chat-message-container');
  messageContainer.setAttribute('data-v-81315227', '');

  const messageBackground = document.createElement('div');
  messageBackground.setAttribute('class', 'seventv-chat-message-background');
  messageBackground.setAttribute('data-v-81315227', '');
  messageBackground.tabIndex = 0;

  const userMessage = document.createElement('span');
  userMessage.setAttribute('class', 'seventv-user-message');
  userMessage.setAttribute('data-v-82270c68', '')
  userMessage.setAttribute('state', 'IDLE');
  userMessage.setAttribute('data-highlight-style', '0');

  const timestamp = document.createElement('span');
  timestamp.setAttribute('data-v-82270c68', '');
  timestamp.setAttribute('class', 'seventv-chat-message-timestamp');
  timestamp.textContent = '00:00 PM';

  // Possible Mod Buttons
  const modButtonsSpan = document.createElement('span');
  modButtonsSpan.setAttribute('class', 'seventv-chat-mod-buttons');
  modButtonsSpan.setAttribute('data-v-071f3a4f', '');
  modButtonsSpan.setAttribute('data-v-82270c68', '');
  const innerSpan = document.createElement('span');
  innerSpan.setAttribute('data-v-071f3a4f', '');
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '1em');
  svg.setAttribute('height', '1em');
  svg.setAttribute('viewBox', '0 0 20 20');
  svg.setAttribute('fill', 'currentColor');
  svg.setAttribute('data-v-071f3a4f', '');
  const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path1.setAttribute('d', 'M12 2H8v1H3v2h14V3h-5V2zM4 7v9a2 2 0 002 2h8a2 2 0 002-2V7h-2v9H6V7H4z');
  const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path2.setAttribute('d', 'M11 7H9v7h2V7z');
  g.appendChild(path1);
  g.appendChild(path2);
  svg.appendChild(g);
  innerSpan.appendChild(svg);
  modButtonsSpan.appendChild(innerSpan);

  // Now, `modButtonsSpan` contains the entire structure and can be appended to the desired parent element in the DOM
  // For example, appending it to the body for demonstration purposes (replace `document.body` with your actual target element)
  document.body.appendChild(modButtonsSpan);

  // User Container
  const chatUserDiv = document.createElement('div');
  chatUserDiv.setAttribute('data-v-6cbf31b5', '');
  chatUserDiv.setAttribute('class', 'seventv-chat-user');
  chatUserDiv.style.color = 'rgb(30, 144, 255)';

  // Badgelist
  const badgelist = document.createElement('span');
  badgelist.setAttribute('class', 'seventv-chat-user-badge-list');
  badgelist.setAttribute('data-v-6cbf31b5', '');
  const badge = document.createElement('div');
  badge.setAttribute('data-v-5aff362b', '');
  badge.setAttribute('data-v-6cbf31b5', '');
  badge.setAttribute('class', 'seventv-chat-badge');
  const img = document.createElement('img');
  img.srcset = "https://i.ibb.co/W66wbHk/youtube.png 1x, https://i.ibb.co/b3Tj001/youtube-1.png 2x, https://i.ibb.co/b3Tj001/youtube-1.png 4x";
  img.setAttribute('data-v-5aff362b', '');
  badge.appendChild(img);
  badgelist.appendChild(badge);

  // Username
  const usernameContainer = document.createElement('span');
  usernameContainer.setAttribute('class', 'seventv-chat-user-username');
  usernameContainer.setAttribute('data-v-6cbf31b5', '');
  usernameContainer.setAttribute('style', 'color: rgb(255, 127, 80);')
  const outerContainer = document.createElement('span');
  const username = document.createElement('span');
  username.textContent = messageUsername;
  outerContainer.appendChild(username);
  outerContainer.setAttribute('data-v-6cbf31b5', '');
  usernameContainer.appendChild(outerContainer);
  usernameContainer.setAttribute('data-v-6cbf31b5', '');

  chatUserDiv.appendChild(badgelist);
  chatUserDiv.appendChild(usernameContainer);

  // COLON
  const colon = document.createElement('span');
  colon.setAttribute('data-v-82270c68', '');
  colon.textContent = ':';

  // Message Body
  const messageBody = document.createElement('span');
  messageBody.setAttribute('class', 'seventv-chat-message-body');
  messageBody.setAttribute('data-v-82270c68', '');
  const message = document.createElement('span');
  message.setAttribute('class', 'text-token');
  message.setAttribute('data-v-82270c68', '');
  message.setAttribute('style', 'margin-left: 3px;')
  message.textContent = messageText;
  messageBody.appendChild(message);

  //Combine
  // userMessage.appendChild(timestamp);
  userMessage.appendChild(modButtonsSpan);
  userMessage.appendChild(chatUserDiv);
  userMessage.appendChild(colon);
  userMessage.appendChild(messageBody);

  // Append the constructed div to the target container
  messageBackground.appendChild(userMessage);
  messageContainer.appendChild(messageBackground);
  wrapped.appendChild(messageContainer);
  banSlider.appendChild(wrapped);
  mainDiv.appendChild(banSlider);
  // targetContainer.appendChild(mainDiv);
  return mainDiv;

}

// Function to initialize an observer on the chat list
function observeChatList(chatList) {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      console.log('Mutation observed:', mutation); // Log all mutations
      // Additional logic based on the mutations can be placed here
    });

    // Check for the existence of child nodes in the chat list
    if (chatList.hasChildNodes()) {
      const lastChild = chatList.lastElementChild;
      console.log('Last child:', lastChild);

      if (lastChild) {
        const customDiv = addCustomDiv('YT-Twitch-Fuser', 'Extension Connected.');
        lastChild.appendChild(customDiv); // Append the customDiv to the last child
        observer.disconnect(); // Optional: disconnect if no further observation is needed
      }
    }
  });

  // Start observing the chat list for child list changes
  observer.observe(chatList, {
    childList: true, // Observe direct children additions/removals
  });
}

// Initial observer to detect when the chat list becomes available
const initialObserver = new MutationObserver((mutations, observer) => {
  const chatList = document.querySelector('main.seventv-chat-list');

  if (chatList) {
    console.log('Chat list found:', chatList);
    observeChatList(chatList); // Call the function to observe the chat list specifically
    observer.disconnect(); // Disconnect the initial observer as it's no longer needed
  }
});

// Start observing the body for the chat list element
initialObserver.observe(document.body, {
  childList: true,
  subtree: true, // Observe changes in the entire DOM tree to catch dynamically added elements
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "youtube-chat-message") {
    // Extract the displayName and message from the request
    const displayName = request.displayName;
    const message = request.message;

    const chatList = document.querySelector('main.seventv-chat-list');

    if (chatList.hasChildNodes()) {
      const lastChild = chatList.lastElementChild;
      console.log('Last child:', lastChild);

      if (lastChild) {
        const customDiv = addCustomDiv(displayName, message);

        lastChild.appendChild(customDiv); // Append the customDiv to the last child
      }
    }
  }16
});

chrome.runtime.sendMessage({action: "contentScriptReady"});
