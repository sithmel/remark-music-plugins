
// document.querySelectorAll('.pagedjs_page').forEach(pageElement => {
//     const pageNumber = parseInt(pageElement.getAttribute('data-page-number'), 10);
//     document.querySelectorAll('h1, h2, h3').forEach(header => {
//         const title = header.textContent.trim();
//     })
// })


class AddPageNumbersToToc extends Paged.Handler {
  afterRendered() {
    const tocLinks = document.querySelectorAll(
      "ul a[href^='#']"
    );

    tocLinks.forEach((link) => {
      const id = decodeURIComponent(
        link.getAttribute("href").slice(1)
      );

      const target = document.getElementById(id);
      const page = target?.closest(".pagedjs_page");

      if (!page) return;

      const pageNumber = document.createElement("span");
      pageNumber.className = "toc-page-number";
      pageNumber.textContent = page.dataset.pageNumber;

      const leader = document.createElement("span");
      leader.className = "toc-leader";
      leader.setAttribute("aria-hidden", "true");

      link.appendChild(leader);
      link.appendChild(pageNumber);
    });
  }
}

Paged.registerHandlers(AddPageNumbersToToc);