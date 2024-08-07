function enviarFormulario() {
  // Obtener los datos del formulario
  const formData = new FormData(document.getElementById('miFormulario'));

  // Convertir FormData a un objeto JSON
  const jsonData = {};
  formData.forEach((value, key) => {
      jsonData[key] = value;
  });

  // Obtener la URL de la API ingresada por el usuario
  let apiUrl = jsonData['api_url'];
  
  // Reemplazar los valores de PUBLISHER_ID y CALLER_NUMBER en la URL
  apiUrl = apiUrl.replace('PUBLISHER_ID', jsonData['publisher_id']);
  apiUrl = apiUrl.replace('CALLER_NUMBER', jsonData['caller_number']);
  
  // Eliminar los campos innecesarios del jsonData
  delete jsonData['api_url'];
  delete jsonData['publisher_id'];
  delete jsonData['caller_number'];

  // Realizar la solicitud a la API con la URL actualizada
  fetch(apiUrl, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonData)
  })
  .then(response => response.json())
  .then(data => {
      console.log('Success:', data);
      alert('Formulario enviado con éxito');
  })
  .catch((error) => {
      console.error('Error:', error);
      alert('Hubo un error al enviar el formulario');
  });
}

