const endpointURL = 'https://faas-fra1-afec6ce7.doserverless.co/api/v1/web/fn-38cc1c79-bedc-4697-9ed1-ccdd1ce8a7f4/default/newsletter-form';

// individual mailing
const mailingIndividualDIVs = document.getElementsByClassName('mailing-form-individual');
for (let i = 0; i <  mailingIndividualDIVs.length; i++) {
  const individualForm = mailingIndividualDIVs[i];
  const newsletter = individualForm.dataset.mailing; 
  const email = document.createElement('input')
  email.type = 'email'
  email.name = 'email'
  const button = document.createElement('button')
  button.innerText = 'Přihlásit'
  individualForm.innerHTML = `
    <div id="newsletter_individual">
      <label for="email">e-mail:</label>
      <butto
    </div>
  `
  button.addEventListener('click', () => {
    console.log(email.value, newsletter)
    const formPayload = new FormData();
    formPayload.append('newsletter', newsletter)
    formPayload.append('email', email.value)
    fetch(endpointURL, {
      method: 'POST',
      body: JSON.stringify({
        'email': email.value,
        newsletter,
      }),
    })
    .then((resp) => resp.json())
    .then((r) => console.log(r))
  })
  individualForm.appendChild(email)
  individualForm.appendChild(button)
}
