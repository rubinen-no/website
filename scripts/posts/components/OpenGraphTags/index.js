const html = String.raw;

export const OpenGraphTags = (props = {}) => {
  const {
    type = 'website',
    url = 'https://rubinen.no',
    title = 'rubinen.no',
    siteName = 'rubinen.no',
    description = 'Rubinen er en Minecraft-server med et trygt og positivt fellesskap med folk i alle aldre. Her kan du samarbeide om prosjekter eller jobbe alene, du kan være sosial eller trekke deg litt tilbake. Det er mange muligheter, så det er alltid du kan gjøre enten du vil spille survival, teste ut skumle Dungeons, hoppe og sprette i en parkour, slåss mot en kompis eller rett og slett tjene penger og ta opp konkurransen om å bli serverens rikeste!',
    image = 'https://secure.gravatar.com/avatar/e4885fa3c6db55194cb2eb9e81dac456?s=220',
    image2 = null,
    domain = 'rubinen.no'
  } = props;

  return html`<meta property="og:url" content="${url}" />
    <meta property="og:type" content="${type}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:site_name" content="${siteName}" />
    <meta property="og:locale:locale" content="en_GB" />
    <meta property="og:image" content="${image}" />
    ${image2 ? `<meta property="og:image" content="${image2}" />` : ''}

    <meta name="twitter:card" content="summary_large_image" />
    <meta property="twitter:domain" content="${domain}" />
    <meta property="twitter:url" content="${url}" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${image}" />`;
};
