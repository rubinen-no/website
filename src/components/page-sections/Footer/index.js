const html = String.raw;

export const Footer = () => {
  return html`<footer class="global">
    <div class="container">
      <a class="logo-title" href="https://www.rubinen.no">
        <svg
          class="logo"
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
        >
          <path
            d="M480-120 80-600l120-240h560l120 240-400 480Zm-95-520h190l-60-120h-70l-60 120Zm55 347v-267H218l222 267Zm80 0 222-267H520v267Zm144-347h106l-60-120H604l60 120Zm-474 0h106l60-120H250l-60 120Z"
          />
        </svg>
        Rubinen
      </a>
      <div class="disclaimer">
        <p>
          <strong>RUBINEN</strong> er på ingen måte tilknyttet eller sponset av
          Mojang. Minecraft is © and trademark Mojang AB 2009-2024. Denne
          nettsiden bruker cookies. Om du fortsetter å bruke nettsiden samtykker
          du til det.
        </p>
        <p>
          <a href="https://rubinen.craftingstore.net/legal/terms"
            >Vilkår for kjøp i nettbutikken.</a
          >
        </p>

        <div class="social-icons">
          <ul>
            <li>
              <a
                class="icon"
                href="https://www.facebook.com/groups/103693026384900/user/100094883859676/"
                ><i class="fa-brands fa-facebook"></i
              ></a>
            </li>
            <li>
              <a
                class="icon"
                href="https://www.youtube.com/channel/UCGAcvQeVEa8k6R14kAoHE3w"
                ><i class="fa-brands fa-youtube"></i
              ></a>
            </li>
            <li>
              <a
                class="icon"
                href="https://www.instagram.com/rubinen.no/?igshid=NzZlODBkYWE4Ng%3D%3D&amp;utm_source=qr"
                ><i class="fa-brands fa-instagram"></i
              ></a>
            </li>
            <li>
              <a class="icon" href="https://discord.com/invite/rubinen"
                ><i class="fa-brands fa-discord"></i
              ></a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>`;
};
