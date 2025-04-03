const endpointURL =
  "https://faas-fra1-afec6ce7.doserverless.co/api/v1/web/fn-38cc1c79-bedc-4697-9ed1-ccdd1ce8a7f4/default/newsletter-form";

// individual mailing
const mailingIndividualDIVs = document.getElementsByClassName(
  "mailing-form-individual",
);
for (let i = 0; i < mailingIndividualDIVs.length; i++) {
  const individualForm = mailingIndividualDIVs[i];
  const newsletter = individualForm.dataset.mailing;
  const label = individualForm.dataset.label;
  const email = document.createElement("input");
  email.type = "email";
  email.name = "email";
  email.className = "mailing-email";
  email.placeholder = "franta@mail.cz";
  email.required = true;
  const button = document.createElement("button");
  button.innerText = "Přihlásit";
  button.className = "mailing-button";
  individualForm.innerHTML = `
    <div id="newsletter_individual">
      <div class="mailing-label">Chci odebírat články ${label}</div>
    </div>
  `;
  const status = document.createElement("div");
  status.className = "mailing-status";
  const reMail =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  button.addEventListener("click", () => {
    if (String(email.value).toLowerCase().match(reMail) === null) {
      status.innerText = "Neplatný e-mail";
    } else {
      fetch(endpointURL, {
        method: "POST",
        body: JSON.stringify({
          email: email.value,
          newsletter,
        }),
      })
        .then((resp) => resp.json())
        .then((r) => {
          console.log(r);
          if (r.status === "ok") {
            status.innerText = "Děkujeme!";
          } else {
            status.innerText =
              'Něco se pokazilo. Zkuste to později nebo napište na <a href="mailto:adela@investigace.cz">adela@investigace.cz</a>';
          }
        });
    }
  });
  individualForm.appendChild(email);
  individualForm.appendChild(button);
  individualForm.appendChild(status);
}
