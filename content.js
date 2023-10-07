// Create a Set to keep track of tweets that have already been processed
const processedTweets = new Set();

function addLinkTitleToTweets() {
  const tweets = document.querySelectorAll('[data-testid="tweet"]');
  tweets.forEach((tweet) => {
    // Check if this tweet has already been processed
    if (processedTweets.has(tweet)) {
      return; // Skip if already processed
    }

    const urlAndTitle = tweet.querySelector('div[data-testid="card.wrapper"] a[href^="https://t.co"]');
    const elementToGetStylesFrom = tweet.querySelector('div[data-testid="tweetText"] > span');
    const fontFamily = window.getComputedStyle(elementToGetStylesFrom).getPropertyValue('font-family').split(',')[0].trim();
    // const backgroundColor = window.getComputedStyle(elementToGetStylesFrom).getPropertyValue('background-color');
    const backgroundColor = 'TwitterChirp, -apple-system, "system-ui", "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
    const color = window.getComputedStyle(elementToGetStylesFrom).getPropertyValue('color');

    // If there is a urlAndTitle, then we know it's for an image link
    if (urlAndTitle) {
      const urlAndTitleAriaLabel = urlAndTitle.getAttribute('aria-label');
      const url = urlAndTitleAriaLabel.split(' ')[0];
      const title = urlAndTitleAriaLabel.split(`${url} `)[1];

      if (url) {
        const htmlToAppend = `<div style="padding: 0.75em 1em; margin-bottom: 30px; color: ${color}; background-color: ${backgroundColor}; font-family: '${fontFamily}'">${title}</div>`;
        urlAndTitle.insertAdjacentHTML('beforeend', htmlToAppend);

        // Mark this tweet as processed
        processedTweets.add(tweet);
      }
    }
  });
}

// Add an event listener to trigger the highlighting when the page is scrolled.
window.addEventListener('scroll', addLinkTitleToTweets);

// Call the function initially to highlight existing tweets.
addLinkTitleToTweets();
