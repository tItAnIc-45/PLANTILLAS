/* Consulta local: prepara un enlace; la persona decide si abre WhatsApp y envía. */
function iniciarFormulario() {
  const form = document.getElementById('form-contacto');
  if (!form) return;
  const t = text => window.TUPLUS_I18N?.t(text) || text;
  const status = document.getElementById('form-estado');
  const fields = ['nombre', 'empresa', 'contacto', 'pais', 'mensaje', 'consentimiento'];
  const countries = ['PE','AR','BO','BR','CL','CO','CR','CU','EC','SV','GT','HN','MX','NI','PA','PY','DO','UY','VE','US','CA','GB','ES','FR','DE','PT','CN','JP','RU'];
  let prepared = false;
  let lastStatus = null;
  status.setAttribute('translate','no');
  fields.forEach(name => document.getElementById('error-' + name).setAttribute('translate','no'));

  function countryOptions() {
    const list = document.getElementById('paises');
    const names = new Intl.DisplayNames([document.documentElement.lang || 'es'], {type:'region'});
    list.replaceChildren(...countries.map(code => {
      const option = document.createElement('option');
      option.value = names.of(code);
      return option;
    }));
  }
  function clearPrepared() {
    prepared = false;
    lastStatus = null;
    status.hidden = true;
    status.replaceChildren();
  }
  function error(name) {
    const field = form.elements[name];
    const value = field.value.trim();
    if (name === 'consentimiento') return field.checked ? '' : 'Confirma que deseas compartir los datos de tu consulta.';
    if (name === 'nombre' && value.length < 2) return 'Escribe tu nombre.';
    if (name === 'empresa' && value.length < 2) return 'Escribe tu empresa o actividad.';
    if (name === 'pais' && value.length < 2) return 'Selecciona o escribe tu país.';
    if (name === 'mensaje' && value.length < 10) return 'Cuéntanos en qué podemos ayudarte (mínimo 10 caracteres).';
    if (name === 'contacto') {
      const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      const digits = value.replace(/\D/g,'');
      const phone = /^[\d\s()+-]+$/.test(value) && digits.length >= 7 && digits.length <= 15;
      if (!email && !phone) return 'Escribe un teléfono o un correo válido.';
      if (form.elements.preferencia.value === 'correo' && !email) return 'Introduce un correo para la preferencia de contacto elegida.';
      if (form.elements.preferencia.value !== 'correo' && !phone) return 'Introduce un teléfono para la preferencia de contacto elegida.';
    }
    return '';
  }
  function showError(name) {
    const message = error(name);
    const node = document.getElementById('error-' + name);
    node.textContent = t(message);
    node.hidden = !message;
    if (message) form.elements[name].setAttribute('aria-invalid','true');
    else form.elements[name].removeAttribute('aria-invalid');
    return message;
  }
  function messageStatus(message, type) {
    lastStatus = {message, type};
    status.className = 'form-estado form-estado-' + type;
    status.textContent = t(message);
    status.hidden = false;
  }
  function setBusy(busy) {
    const button = form.querySelector('button[type="submit"]');
    button.disabled = busy;
    button.setAttribute('aria-busy', busy ? 'true' : 'false');
  }
  function showWhatsAppFallback() {
    const note = document.createElement('p');
    const link = document.createElement('a');
    link.className = 'prepared-link btn btn-primary';
    link.href = (typeof construirEnlaceWhatsApp === 'function') ? construirEnlaceWhatsApp() : '#';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = t('Escribir por WhatsApp ↗');
    status.append(note, link);
  }
  async function submitEndpoint() {
    const endpoint = (typeof SITE !== 'undefined' && SITE.formulario && SITE.formulario.endpoint) || '';
    if (!endpoint) {
      messageStatus('No pudimos enviar tu consulta. Escríbenos por WhatsApp mientras lo resolvemos.', 'error');
      showWhatsAppFallback();
      return;
    }
    setBusy(true);
    messageStatus('Enviando tu consulta…', 'procesando');
    try {
      const data = new FormData(form);
      data.delete('_gotcha');
      const response = await fetch(endpoint, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) {
        messageStatus('¡Listo! Recibimos tu consulta y te contactaremos pronto.', 'exito');
        form.reset();
      } else {
        messageStatus('No pudimos enviar tu consulta. Escríbenos por WhatsApp mientras lo resolvemos.', 'error');
        showWhatsAppFallback();
      }
    } catch (err) {
      messageStatus('No pudimos enviar tu consulta. Escríbenos por WhatsApp mientras lo resolvemos.', 'error');
      showWhatsAppFallback();
    } finally {
      setBusy(false);
    }
  }
  function prepareLink() {
    const e = form.elements;
    const line = (label, value) => t(label) + ': ' + value;
    const text = [t('Hola, TUPLUS. Me interesa la plantilla para servicios profesionales.'),
      line('Tu nombre',e.nombre.value.trim()), line('Empresa o actividad',e.empresa.value.trim()),
      line('Correo o teléfono',e.contacto.value.trim()), line('País',e.pais.value.trim()),
      line('Solución de interés',e.servicio.selectedOptions[0].textContent),
      line('Prefiero que me contacten por',e.preferencia.selectedOptions[0].textContent),
      line('Cuéntanos sobre tu proyecto',e.mensaje.value.trim())].join('\n');
    const url = new URL(construirEnlaceWhatsApp());
    url.searchParams.set('text', text);
    messageStatus('Tu mensaje está preparado.', 'exito');
    const note = document.createElement('p');
    note.textContent = t('Continúa en WhatsApp para revisarlo y enviarlo.');
    const link = document.createElement('a');
    link.className = 'prepared-link btn btn-primary';
    link.href = url.href;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = t('Abrir WhatsApp ↗');
    status.append(note,link);
    prepared = true;
  }
  fields.forEach(name => {
    const field = form.elements[name];
    field.addEventListener('blur',() => showError(name));
    field.addEventListener('input',() => {
      clearPrepared();
      if(field.hasAttribute('aria-invalid')) showError(name);
    });
  });
  form.addEventListener('input',clearPrepared);
  form.addEventListener('change',() => {
    clearPrepared();
    if(form.elements.contacto.value.trim()) showError('contacto');
  });
  form.addEventListener('submit',event => {
    event.preventDefault();
    clearPrepared();
    let first;
    fields.forEach(name => { if(showError(name) && !first) first = form.elements[name]; });
    if(first) {
      messageStatus('Revisa los campos marcados antes de enviar.', 'error');
      first.focus();
      return;
    }
    if(form.elements._gotcha.value) {
      messageStatus('No pudimos preparar la consulta. Revisa el formulario e inténtalo de nuevo.', 'error');
      return;
    }
    const canal = (typeof SITE !== 'undefined' && SITE.formulario && SITE.formulario.canal) || 'whatsapp';
    if (canal === 'endpoint') submitEndpoint();
    else prepareLink();
  });
  document.addEventListener('tuplus:language-change',() => {
    countryOptions();
    fields.forEach(name => { if(form.elements[name].hasAttribute('aria-invalid')) showError(name); });
    if(prepared) prepareLink();
    else if(lastStatus) messageStatus(lastStatus.message, lastStatus.type);
  });
  countryOptions();
}
