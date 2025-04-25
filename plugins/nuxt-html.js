export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("nuxtHtml", {
    mounted(el, binding) {
      el.innerHTML = assignAnchorsIds(binding.value);
      convertAnchorToNuxtLink(el);
    },
    updated(el, binding) {
      el.innerHTML = assignAnchorsIds(binding.value);
      convertAnchorToNuxtLink(el);
    },
    unmounted() {
      removeListeners();
    },
  });
  nuxtApp.hook('app:mounted', () => {
    console.log('Custom HTML tag PLugin ✅')
  })
});


const idsWithListeners = new Set();

function generateUuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function assignAnchorsIds(html) {
  const domParser = new DOMParser();
  const doc = domParser.parseFromString(html, "text/html");
  const anchors = doc.querySelectorAll("a");

  anchors.forEach((anchor) => {
    if (!anchor.hasAttribute("id")) {
      anchor.setAttribute("id", generateUuid());
    }
  });
  return doc.documentElement.outerHTML;
}

function convertAnchorToNuxtLink(html) {
  const anchors = html.querySelectorAll("a");

  anchors.forEach((anchor) => {
    if (anchor.id && !idsWithListeners.has(anchor.id)) {
      const link = document.getElementById(anchor.id);

      link?.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation() // https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation
        const to = anchor.getAttribute("href");
        const target = anchor.getAttribute("target");
        if (to) {
          if (to.startsWith('http://') || to.startsWith('https://') || to.startsWith('www.')) {
            if (target === "_blank") {
              window.open(to, "_blank");
            } else {
              window.location.href = to;
            }
          } else {
            useNuxtApp().$router.push(to);
          }
          // useNuxtApp().$router.push(to);
        }
      });

      idsWithListeners.add(anchor.id);
    }
  });
}

function removeListeners() {
  idsWithListeners.forEach((id) => {
    const link = document.getElementById(id);
    link?.removeEventListener("click", () => { });
    idsWithListeners.delete(id);
  });
}

