const garage = 'le-garage';
const url = `https://wagon-garage-api.herokuapp.com/${garage}/cars`;

const carList = document.querySelector('.cars-list')
const populateCarList = (car) => {

  const newCar = `<div class="car">
          <div class="car-image">
            <img src="http://loremflickr.com/280/280/${car.brand} ${car.model}" />
          </div>
          <div class="car-info">
            <h4>${car.brand} ${car.model}</h4>
            <p><strong>Owner:</strong> ${car.owner}</p>
            <p><strong>Plate:</strong> ${car.plate}</p>
            <p><button class='btn btn-danger delete' data-car-id=${car.id}>Remove</button></p>
          </div>`;
  carList.insertAdjacentHTML('afterbegin',newCar);
}

const form = document.querySelector('.car-form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const brand = document.getElementById('brand').value;
  const model = document.getElementById('model').value;
  const plate = document.getElementById('plate').value;
  const owner = document.getElementById('owner').value;

  const car = {
    "brand": brand,
    "model": model,
    "owner": owner,
    "plate": plate
  };
console.log(car);
  fetch(url, {
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(car),
    method: 'POST'
  })
  .then(loadCars());

});


const loadCars = () => {
  fetch(url)
  .then(response => response.json())
  .then((data) => {
    carList.innerHTML = "";
    data.forEach((car) => {
      populateCarList(car)
    });
    bindDeleteClick();
  });
};

const bindDeleteClick = () => {
  document.querySelectorAll('.delete').forEach((btn)=>{
    btn.addEventListener('click', (event) => {
      const id = event.currentTarget.dataset.carId;
      console.log(`destroy car id = ${id}`);
      destroyURL = `https://wagon-garage-api.herokuapp.com/cars/${id}`;
      fetch(destroyURL, {method: 'DELETE'})
      .then(() => {loadCars();});
    })
  });
}






loadCars();