import { controlContactModule } from "../modules/contact.module.js";

// Fire dataLayer events for the clicks on the Typeform button and link
const typeformElements = document.querySelectorAll("#marketing_websites");
typeformElements.forEach((typeformElement) => {
  typeformElement.addEventListener("click", (e) => {
    console.log("element clicked");
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "initiated_contact_form",
      cta_text: e.target.textContent,
    });
    swetrix.track({
      ev: "initiated_contact_form",
      unique: false,
      meta: {
        cta_next: e.target.textContent,
      },
    });
  });
});

//Fire dataLayer events for the learn more buttons
const learnMoreButtons = document.querySelectorAll('button[data-bs-toggle="modal"]');
learnMoreButtons.forEach((learnMoreButton) => {
  learnMoreButton.addEventListener("click", () => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "clicked_learn_more",
      offered_service: learnMoreButton.parentElement.querySelector(".card-title").textContent,
    });
    swetrix.track({
      ev: "clicked_learn_more",
      unique: false,
      meta: {
        offered_service: learnMoreButton.parentElement.querySelector(".card-title").textContent,
      },
    });
  });
});

//Fire event when user clicks on the different process steps
const processSteps = document.querySelectorAll("a.step-content-wrapper");
processSteps.forEach((processStep) => {
  processStep.addEventListener("click", (e) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "clicked_process_step",
      step_title: processStep.querySelector(".step-title").innerText,
    });
    swetrix.track({
      ev: "clicked_process_step",
      unique: false,
      meta: {
        step_title: processStep.querySelector(".step-title").innerText,
      },
    });
  });
});

window.addEventListener("message", function (event) {
  if (event.data.type === "hsFormCallback" && event.data.eventName === "onFormSubmitted") {
    window.dataLayer.push({
      event: "captured_lead",
      form_id: event.data.id,
    });
    swetrix.track({
      ev: "captured_lead",
      unique: false,
      meta: {
        form_id: event.data.id,
      },
    });
  }
});

window.addEventListener("load", () => {
  controlContactModule();
  const techStackLinks = document.querySelectorAll('a[id*="Editor"]');
  if (typeof techStackLinks == "undefined") {
    throw new Error("Tech stack links were not found");
  }
  let currentTechStackLinkIndex = 1;
  setInterval(() => {
    techStackLinks[currentTechStackLinkIndex].click();
    currentTechStackLinkIndex++;
    if (currentTechStackLinkIndex > 3) {
      currentTechStackLinkIndex = 0;
    }
  }, 5000);
});
