function urlMatchesPattern(url) {
  if (typeof url !== 'string') return false; // Add this line

  const patterns = [
    "https://www.twitch.tv/popout/imls/chat*",
    "https://www.twitch.tv/imls"
  ];

  return patterns.some(pattern => {
    return url.startsWith(pattern.replace('*', ''));
  });
}


async function fetchLiveStreamVideoId(channelId, apiKey) {
  const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&order=date&type=video&eventType=live&key=${apiKey}`;
  console.log(`Getting Live Stream Video ID ${channelId} and ${apiKey}`);
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`YouTube API request failed with status ${response.status}`);
    }

    const data = await response.json();
    const liveStream = data.items.find(item => item.snippet.liveBroadcastContent === 'live');

    if (liveStream) {
      const liveVideoId = liveStream.id.videoId;
      console.log(`Live Stream Video ID: ${liveVideoId}`);
      return liveVideoId
      // You can now use this video ID as needed, e.g., send it to your popup or content script
    } else {
      console.log('No live stream found for the specified channel.');
    }
  } catch (error) {
    console.error(`Error fetching live stream video ID: ${error.message}`);
  }
}

async function fetchLiveChatId(videoId, apiKey) {
  const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=liveStreamingDetails,snippet&id=${videoId}&key=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`YouTube API request failed with status ${response.status}`);
    }

    const data = await response.json();
    const videoDetails = data.items[0]; // Assuming the video ID is valid and the video exists

    if (videoDetails && videoDetails.liveStreamingDetails) {
      const liveChatId = videoDetails.liveStreamingDetails.activeLiveChatId;
      if (liveChatId) {
        console.log(`Live Chat ID: ${liveChatId}`);
        // You can now use the liveChatId as needed
        return liveChatId;
      } else {
        console.log('This video does not have an active live chat.');
      }
    } else {
      console.log('No video details found for the specified video ID.');
    }
  } catch (error) {
    console.error(`Error fetching live chat ID: ${error.message}`);
  }
}

async function fetchLiveChatMessages(liveChatId, apiKey) {
  const apiUrl = `https://www.googleapis.com/youtube/v3/liveChat/messages?liveChatId=${liveChatId}&part=snippet,authorDetails&maxResults=2000&key=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`YouTube API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data
  } catch (error) {
    console.error(`Error fetching live chat messages: ${error.message}`);
    return [];
  }
}

async function fetchAndDisplayLiveChat(channelId, apiKey) {
  try {
    const liveVideoId = await fetchLiveStreamVideoId(channelId, apiKey);
    if (liveVideoId) {
      const liveChatId = await fetchLiveChatId(liveVideoId, apiKey);
      if (liveChatId) {
        console.log(`Fetched Live Chat ID: ${liveChatId}`);
        // Fetch and display live chat messages
        const chatMessages = await fetchLiveChatMessages(liveChatId, apiKey);
        console.log(chatMessages)
        return [chatMessages, liveChatId]
      } else {
        console.log('Live chat is not available for the current live stream.');
      }
    } else {
      console.log('No live stream found for the specified channel.');
    }
  } catch (error) {
    console.error(`Error in fetching and displaying live chat: ${error.message}`);
  }
}

async function fetchNextChat(liveChatId, nextPageToken, apiKey) {
  let pageTokenParam = `&pageToken=${nextPageToken}`;
  const apiUrl = `https://www.googleapis.com/youtube/v3/liveChat/messages?liveChatId=${liveChatId}&part=snippet,authorDetails&maxResults=2000${pageTokenParam}&key=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`YouTube API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error(`Error fetching live chat messages: ${error}`);
  }
}

async function chatLoop(channelId, apiKey) {
  let attempts = 0;
  let data;
  const maxAttempts = 100; // Maximum number of attempts for initial data fetch
  const retryInterval = 5000; // Time to wait before retrying in milliseconds

  console.log(`Fetching this Channel: ${channelId} with API: ${apiKey}`);

  // Retry loop for initial data fetch
  do {
    console.log(`Attempting to fetch initial live chat data, Attempt: ${attempts + 1}`);
    data = await fetchAndDisplayLiveChat(channelId, apiKey);

    if (!data) {
      console.log(`Failed to fetch data, retrying in ${retryInterval / 1000} seconds...`);
      await new Promise(resolve => setTimeout(resolve, retryInterval));
      attempts++;
    }
  } while (!data && attempts < maxAttempts && isChatLoopActive);

  if (!data) {
    console.error('Failed to fetch initial live chat data after maximum attempts.');
    return; // Exit the chatLoop if data couldn't be fetched
  }

  // If data is successfully fetched, continue with the chat loop
  let liveChatId = data[1];
  let nextPageToken = data[0].nextPageToken;
  let pollingInterval = data[0].pollingIntervalMillis || 10000; // Default to 10 seconds

  while (isChatLoopActive) {
    console.log('Getting next chat...');

    try {
      await new Promise(resolve => setTimeout(resolve, pollingInterval)); // Properly wait before continuing
      const chatData = await fetchNextChat(liveChatId, nextPageToken, apiKey);

      if (chatData && chatData.items) {
        chatData.items.forEach(item => {
          const displayName = item.authorDetails.displayName;
          const message = item.snippet.displayMessage;
          console.log(`${displayName}: ${message}`); // Printing out the username and message
          // Send message to content.js
          chrome.tabs.query({}, function (tabs) {
            tabs.forEach(tab => {
              if (urlMatchesPattern(tab.url)) {
                // Tab URL matches one of your patterns
                console.log('sending message back to content')
                chrome.tabs.sendMessage(tab.id, {
                  action: "youtube-chat-message",
                  displayName: displayName,
                  message: message
                });
              }
            });
          });


        });

        nextPageToken = chatData.nextPageToken;
        pollingInterval = chatData.pollingIntervalMillis || 10000;
      } else {
        isChatLoopActive = false; // Consider stopping the loop if no new messages
      }
    } catch (error) {
      console.error(`Error in chat loop: ${error}`);
      isChatLoopActive = false; // Consider stopping the loop on error
    }
  }
}

let isChatLoopActive = false;

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "toggleChatLoop") {
    isChatLoopActive = !isChatLoopActive;
    chrome.storage.local.set({ isChatLoopActive: isChatLoopActive }); // Save the state

    if (isChatLoopActive) {
      console.log('starting loop')
      chrome.storage.local.get(['channelIds', 'apiKeys'], function (data) {
        // Load all saved channel IDs
        const channelIds = data.channelIds;
        const apiKeys = data.apiKeys;

        // chatLoop(channelIds[0], apiKeys[0]);

        channelIds.forEach((channelId, index) => chatLoop(channelId, apiKeys[index]));

      });
    }
    // No need for an else block to stop the chat loop, assuming it checks isChatLoopActive
    sendResponse({ isChatLoopActive: isChatLoopActive }); // Optional: send back the new state
  }
});

