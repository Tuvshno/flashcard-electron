document.addEventListener('DOMContentLoaded', function () {
  const toggleButton = document.getElementById('toggleButton');
  const saveSettingsButton = document.getElementById('saveSettingsButton');
  const addChannelIdButton = document.getElementById('addChannelIdButton');
  const addApiKeyButton = document.getElementById('addApiKeyButton');
  const channelIdsContainer = document.getElementById('channelIdsContainer');
  const apiKeysContainer = document.getElementById('apiKeysContainer');

  // Function to add a new input field
  function addInputField(container, className, type, placeholder, value = '') {
    const input = document.createElement('input');
    input.type = type;
    input.className = className;
    input.placeholder = placeholder;
    input.value = value;
    container.appendChild(input);
  }

  // Load saved settings
  chrome.storage.local.get(['channelIds', 'apiKeys'], function (data) {
    // Load all saved channel IDs
    const channelIds = data.channelIds || [''];
    channelIdsContainer.innerHTML = ''; // Clear existing inputs
    channelIds.forEach(channelId => {
      addInputField(channelIdsContainer, 'channelIdInput', 'text', 'Channel ID', channelId);
    });

    // Load all saved API keys
    const apiKeys = data.apiKeys || [''];
    apiKeysContainer.innerHTML = ''; // Clear existing inputs
    apiKeys.forEach(apiKey => {
      addInputField(apiKeysContainer, 'apiKeyInput', 'password', 'API Key', apiKey);
    });

    chrome.storage.local.get('isChatLoopActive', function (data) {
      let state = data.isChatLoopActive
      toggleButton.textContent = state ? "Stop" : "Start";
    });

  });

  // Add more inputs on button click
  addChannelIdButton.addEventListener('click', function () {
    addInputField(channelIdsContainer, 'channelIdInput', 'text', 'Channel ID');
  });
  addApiKeyButton.addEventListener('click', function () {
    addInputField(apiKeysContainer, 'apiKeyInput', 'password', 'API Key');
  });

  // Save settings
  saveSettingsButton.addEventListener('click', function () {
    const channelIds = Array.from(channelIdsContainer.querySelectorAll('.channelIdInput')).map(input => input.value.trim()).filter(Boolean);
    const apiKeys = Array.from(apiKeysContainer.querySelectorAll('.apiKeyInput')).map(input => input.value.trim()).filter(Boolean);
    chrome.storage.local.set({ channelIds, apiKeys }, () => alert("Settings saved successfully!"));
  });

  // Toggle chat loop
  toggleButton.addEventListener('click', function () {
    chrome.storage.local.get('isChatLoopActive', function (data) {
      const newState = !data.isChatLoopActive;
      chrome.storage.local.set({ isChatLoopActive: newState }, function () {
        toggleButton.textContent = newState ? "Stop" : "Start";
        chrome.runtime.sendMessage({ action: "toggleChatLoop", state: newState });
      });
    });
  });
  
});
