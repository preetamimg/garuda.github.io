// ? @@@@@@@@@@@@@@@@@@@@@@[  Invalid Form  ]@@@@@@@@@@@@@@@@@@@@@@
export function invalid(event) {
  event.preventDefault();
  event.stopPropagation();
  $(event.currentTarget).find('[type=submit]').attr('disabled', true);
}

// ? @@@@@@@@@@@@@@@@@@@@@@[  Stop Refresh Form  ]@@@@@@@@@@@@@@@@@@@@@@
export function stopRefresh(event) {
  event.preventDefault();
  event.stopPropagation();
}


// ? @@@@@@@@@@@@@@@@@@@@@@[  On Load Form Data  ]@@@@@@@@@@@@@@@@@@@@@@
let loaded_form_params = {};
export function onload_form(event,form,formInputs) {

  if (!form.checkValidity()) {
    $(form).find('[type=submit]').attr('disabled', true);
    event.preventDefault();
    event.stopPropagation();

  } else {
    loaded_form_params = {};

    for (let i = 0; i < formInputs.length; i++) {

      if(formInputs[i].hasAttribute('name')){
        loaded_form_params[formInputs[i].name] = formInputs[i].value;
      }

      if(i === formInputs.length-1){

        if(formInputs.hasAttribute('tokenKeyOff')){
          delete loaded_form_params._token
        }

        loaded_form_params = JSON.stringify(Object.entries(loaded_form_params).sort(([,a],[,b]) => a-b).reduce((r, [k, v]) => ({ ...r, [k]: v }), {}));
        
        if(formInputs.hasAttribute('data-match')) {
          $(form).find('[type=submit]').attr('disabled', true);
          event.preventDefault();
          event.stopPropagation();
        } else {
          $(form).find('[type=submit]').attr('disabled', false);
          event.preventDefault();
          event.stopPropagation();
        } 

        return loaded_form_params;
      }

    }

    event.preventDefault();
    event.stopPropagation();
  }
}


// ? @@@@@@@@@@@@@@@@@@@@@@[  Valid Form  ]@@@@@@@@@@@@@@@@@@@@@@
let after_input_params = {};
export function valid(event,form,formInputs) {

  after_input_params = {};
  for (let i = 0; i < formInputs.length; i++) {
    if(formInputs[i].hasAttribute('name')){
      after_input_params[formInputs[i].name] = formInputs[i].value;
    }
    if(i === formInputs.length-1){

      if(formInputs.hasAttribute('tokenKeyOff')){
        delete after_input_params._token
      }

      after_input_params = JSON.stringify(Object.entries(after_input_params).sort(([,a],[,b]) => a-b).reduce((r, [k, v]) => ({ ...r, [k]: v }), {}));
      
      if(formInputs.hasAttribute('data-match')) {
        if(loaded_form_params===after_input_params){
          $(form).find('[type=submit]').attr('disabled', true);
          event.preventDefault();
          event.stopPropagation();
        } else {
          $(form).find('[type=submit]').attr('disabled', false);
          event.preventDefault();
          event.stopPropagation();
        }   
      } else {
        $(form).find('[type=submit]').attr('disabled', false);
      } 

      return after_input_params;
    }
  }
}


// ? @@@@@@@@@@@@@@@@@@@@@@[  Submit With Invalid Form  ]@@@@@@@@@@@@@@@@@@@@@@
export function submitWithInvalid(event) {
  $(event.target).find('[type=submit]').attr('disabled', true);
  $(event.target).removeClass('submited');
  event.preventDefault();
  event.stopPropagation();
}


// ? @@@@@@@@@@@@@@@@@@@@@@[  Submit With Valid Form  ]@@@@@@@@@@@@@@@@@@@@@@
export function submitWithValid(event) {
  $(event.currentTarget).find('[type=submit]').attr('disabled', false);
  $(event.currentTarget).addClass('submited');
  return after_input_params;
}





// ? @@@@@@@@@@@@@@@@@@@@@@[  Show Password  ]@@@@@@@@@@@@@@@@@@@@@@
export function showPassword(event) {
  let showPass = $($(event.currentTarget).attr("data-input"));
  if (event.currentTarget.checked == true) {
    showPass.attr("type", "text");
  } else {
    showPass.attr("type", "password");
  }
}


// ? @@@@@@@@@@@@@@@@@@@@@@[  Sweet alert  ]@@@@@@@@@@@@@@@@@@@@@@
